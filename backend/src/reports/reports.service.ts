import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStatus, ReservationStatus, Role } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getExecutiveDashboard() {
    const totalClients = await this.prisma.user.count({ where: { role: Role.CLIENT } });
    const totalCounselors = await this.prisma.user.count({
      where: { role: { in: [Role.PSIKOLOG, Role.TEMAN_CERITA] } },
    });

    const reservationsByStatus = await this.prisma.reservation.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    const revenueResult = await this.prisma.payment.aggregate({
      where: { status: PaymentStatus.PAID },
      _sum: { amount: true },
      _count: { id: true },
    });

    const totalRevenue = revenueResult._sum.amount || 0;
    const paidTransactions = revenueResult._count.id || 0;

    const totalAssessments = await this.prisma.assessment.count();
    const crisisAssessments = await this.prisma.assessment.count({
      where: { crisisFlag: true },
    });

    const recentSessions = await this.prisma.counselingSession.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        counselor: { include: { profile: true } },
        client: { include: { profile: true } },
        reservation: true,
      },
    });

    return {
      kpis: {
        totalRevenue,
        paidTransactions,
        totalClients,
        totalCounselors,
        totalAssessments,
        crisisAlerts: crisisAssessments,
      },
      reservationsSummary: reservationsByStatus.reduce((acc, curr) => {
        acc[curr.status] = curr._count.id;
        return acc;
      }, {} as Record<string, number>),
      recentSessions,
    };
  }

  async getCounselorPerformance() {
    return this.prisma.user.findMany({
      where: { role: { in: [Role.PSIKOLOG, Role.TEMAN_CERITA] } },
      select: {
        id: true,
        email: true,
        role: true,
        profile: true,
        counselorReservations: {
          select: {
            id: true,
            status: true,
            totalPrice: true,
            serviceType: true,
          },
        },
      },
    });
  }
}
