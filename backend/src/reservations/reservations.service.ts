import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto, UpdateReservationStatusDto, RescheduleReservationDto } from './reservations.dto';
import { ReservationStatus, Role } from '@prisma/client';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(clientId: string, dto: CreateReservationDto) {
    const reservationDate = new Date(dto.date);

    // Verify counselor exists and has valid role
    const counselor = await this.prisma.user.findUnique({
      where: { id: dto.counselorId },
    });
    if (!counselor || ![Role.PSIKOLOG, Role.TEMAN_CERITA].includes(counselor.role)) {
      throw new BadRequestException('Invalid counselor selected');
    }

    // Atomic transaction to prevent double booking race conditions
    return this.prisma.$transaction(async (tx) => {
      // Check existing active slot
      const existing = await tx.reservation.findFirst({
        where: {
          counselorId: dto.counselorId,
          date: reservationDate,
          timeSlot: dto.timeSlot,
          status: { notIn: [ReservationStatus.CANCELLED] },
        },
      });

      if (existing) {
        throw new ConflictException('Selected time slot is already booked for this counselor');
      }

      // Generate transaction/order reference
      const orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const reservation = await tx.reservation.create({
        data: {
          clientId,
          counselorId: dto.counselorId,
          serviceType: dto.serviceType,
          date: reservationDate,
          timeSlot: dto.timeSlot,
          status: ReservationStatus.PENDING_PAYMENT,
          totalPrice: dto.totalPrice,
          clientNotes: dto.clientNotes,
          payment: {
            create: {
              orderNumber,
              amount: dto.totalPrice,
              status: 'PENDING',
              paymentMethod: 'GATEWAY',
            },
          },
        },
        include: {
          counselor: { select: { id: true, email: true, profile: true } },
          client: { select: { id: true, email: true, profile: true } },
          payment: true,
        },
      });

      return reservation;
    });
  }

  async findAll(user: { id: string; role: Role }) {
    if (user.role === Role.SUPER_ADMIN || user.role === Role.ADMIN_OPERASIONAL || user.role === Role.OWNER) {
      return this.prisma.reservation.findMany({
        include: {
          client: { include: { profile: true } },
          counselor: { include: { profile: true } },
          payment: true,
        },
        orderBy: { date: 'desc' },
      });
    }

    if (user.role === Role.PSIKOLOG || user.role === Role.TEMAN_CERITA) {
      return this.prisma.reservation.findMany({
        where: { counselorId: user.id },
        include: {
          client: { include: { profile: true } },
          payment: true,
          counselingSession: true,
        },
        orderBy: { date: 'desc' },
      });
    }

    // Default: CLIENT
    return this.prisma.reservation.findMany({
      where: { clientId: user.id },
      include: {
        counselor: { include: { profile: true } },
        payment: true,
        counselingSession: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  async findById(id: string, user: { id: string; role: Role }) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        client: { include: { profile: true } },
        counselor: { include: { profile: true } },
        payment: true,
        counselingSession: true,
      },
    });

    if (!reservation) throw new NotFoundException('Reservation not found');

    const isAuthorized =
      [Role.SUPER_ADMIN, Role.ADMIN_OPERASIONAL, Role.OWNER].includes(user.role) ||
      reservation.clientId === user.id ||
      reservation.counselorId === user.id;

    if (!isAuthorized) {
      throw new BadRequestException('Access denied to this reservation');
    }

    return reservation;
  }

  async updateStatus(id: string, dto: UpdateReservationStatusDto) {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) throw new NotFoundException('Reservation not found');

    const updated = await this.prisma.reservation.update({
      where: { id },
      data: { status: dto.status },
      include: { payment: true },
    });

    // When status becomes CONFIRMED, ensure CounselingSession record exists
    if (dto.status === ReservationStatus.CONFIRMED) {
      await this.prisma.counselingSession.upsert({
        where: { reservationId: id },
        create: {
          reservationId: id,
          counselorId: reservation.counselorId,
          clientId: reservation.clientId,
          status: 'SCHEDULED',
        },
        update: {},
      });
    }

    return updated;
  }

  async reschedule(id: string, dto: RescheduleReservationDto, user: { id: string; role: Role }) {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) throw new NotFoundException('Reservation not found');

    if (user.role === Role.CLIENT && reservation.clientId !== user.id) {
      throw new BadRequestException('Unauthorized to reschedule this reservation');
    }

    const newDate = new Date(dto.newDate);

    return this.prisma.$transaction(async (tx) => {
      // Check collision on new slot
      const collision = await tx.reservation.findFirst({
        where: {
          counselorId: reservation.counselorId,
          date: newDate,
          timeSlot: dto.newTimeSlot,
          status: { notIn: [ReservationStatus.CANCELLED] },
          id: { not: id },
        },
      });

      if (collision) {
        throw new ConflictException('New selected slot is already booked');
      }

      return tx.reservation.update({
        where: { id },
        data: {
          date: newDate,
          timeSlot: dto.newTimeSlot,
          status: ReservationStatus.RESCHEDULED,
        },
      });
    });
  }
}
