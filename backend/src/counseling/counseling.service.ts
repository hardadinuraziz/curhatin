import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddClinicalNotesDto, UpdateSessionStatusDto } from './counseling.dto';
import { Role } from '@prisma/client';

@Injectable()
export class CounselingService {
  constructor(private prisma: PrismaService) {}

  async getSessionById(id: string, user: { id: string; role: Role }) {
    const session = await this.prisma.counselingSession.findUnique({
      where: { id },
      include: {
        client: { include: { profile: true } },
        counselor: { include: { profile: true } },
        reservation: true,
      },
    });

    if (!session) throw new NotFoundException('Counseling session not found');

    // Confidentiality Check:
    // Only Counselor, Super Admin, or Client may access
    const isAssignedCounselor = session.counselorId === user.id;
    const isSuperAdmin = user.role === Role.SUPER_ADMIN;
    const isClient = session.clientId === user.id;

    if (!isAssignedCounselor && !isSuperAdmin && !isClient) {
      throw new ForbiddenException('You do not have access to this counseling session');
    }

    // LEAST-PRIVILEGE CLINICAL DATA PROTECTION:
    // Strip clinicalNotes for Client & Owner roles
    if (user.role === Role.CLIENT || user.role === Role.OWNER) {
      const { clinicalNotes, ...safeSession } = session;
      return safeSession;
    }

    return session;
  }

  async getMySessions(user: { id: string; role: Role }) {
    if (user.role === Role.PSIKOLOG || user.role === Role.TEMAN_CERITA) {
      return this.prisma.counselingSession.findMany({
        where: { counselorId: user.id },
        include: {
          client: { include: { profile: true } },
          reservation: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    // For clients: strictly omit clinicalNotes
    const sessions = await this.prisma.counselingSession.findMany({
      where: { clientId: user.id },
      include: {
        counselor: { include: { profile: true } },
        reservation: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return sessions.map(({ clinicalNotes, ...safe }) => safe);
  }

  async updateStatus(id: string, dto: UpdateSessionStatusDto, user: { id: string; role: Role }) {
    const session = await this.prisma.counselingSession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException('Session not found');

    if (session.counselorId !== user.id && user.role !== Role.SUPER_ADMIN) {
      throw new ForbiddenException('Only assigned counselor or admin can update session status');
    }

    const data: any = { status: dto.status };
    if (dto.status === 'IN_PROGRESS' && !session.startedAt) {
      data.startedAt = new Date();
    }
    if (dto.status === 'COMPLETED' && !session.endedAt) {
      data.endedAt = new Date();
    }

    return this.prisma.counselingSession.update({
      where: { id },
      data,
    });
  }

  async saveClinicalNotes(id: string, dto: AddClinicalNotesDto, user: { id: string; role: Role }) {
    const session = await this.prisma.counselingSession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException('Session not found');

    // Only assigned counselor can write clinical notes
    if (session.counselorId !== user.id && user.role !== Role.SUPER_ADMIN) {
      throw new ForbiddenException('Only the designated counselor can record clinical notes');
    }

    return this.prisma.counselingSession.update({
      where: { id },
      data: {
        clinicalNotes: dto.clinicalNotes,
        clientSummary: dto.clientSummary,
      },
    });
  }
}
