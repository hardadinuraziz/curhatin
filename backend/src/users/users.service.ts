import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateProfileDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(role?: Role) {
    return this.prisma.user.findMany({
      where: role ? { role } : undefined,
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        profile: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }

  async findCounselors() {
    return this.prisma.user.findMany({
      where: {
        role: { in: [Role.PSIKOLOG, Role.TEMAN_CERITA] },
        isActive: true,
      },
      include: { profile: true },
    });
  }

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        role: dto.role,
        profile: {
          create: {
            fullName: dto.fullName,
            phone: dto.phone,
          },
        },
      },
      select: {
        id: true,
        email: true,
        role: true,
        profile: true,
        createdAt: true,
      },
    });
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.userProfile.upsert({
      where: { userId },
      create: {
        userId,
        fullName: dto.fullName || 'Anonymous',
        phone: dto.phone,
        avatarUrl: dto.avatarUrl,
        bio: dto.bio,
        specialization: dto.specialization,
        sippNumber: dto.sippNumber,
      },
      update: {
        ...dto,
      },
    });
  }

  async setStatus(id: string, isActive: boolean) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive },
      select: { id: true, email: true, isActive: true },
    });
  }
}
