import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentWebhookDto } from './payments.dto';
import { PaymentStatus, ReservationStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async handleWebhook(dto: PaymentWebhookDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { orderNumber: dto.orderNumber },
      include: { reservation: true },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with order ${dto.orderNumber} not found`);
    }

    let targetPaymentStatus: PaymentStatus = PaymentStatus.PENDING;
    let targetReservationStatus: ReservationStatus = payment.reservation.status;

    const status = dto.transactionStatus.toLowerCase();

    if (['settlement', 'capture', 'paid', 'success'].includes(status)) {
      targetPaymentStatus = PaymentStatus.PAID;
      targetReservationStatus = ReservationStatus.CONFIRMED;
    } else if (['expire', 'expired'].includes(status)) {
      targetPaymentStatus = PaymentStatus.EXPIRED;
      targetReservationStatus = ReservationStatus.CANCELLED;
    } else if (['cancel', 'cancelled', 'deny', 'failed'].includes(status)) {
      targetPaymentStatus = PaymentStatus.FAILED;
      targetReservationStatus = ReservationStatus.CANCELLED;
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: targetPaymentStatus,
          paidAt: targetPaymentStatus === PaymentStatus.PAID ? new Date() : undefined,
          payload: dto as any,
        },
      });

      const updatedReservation = await tx.reservation.update({
        where: { id: payment.reservationId },
        data: { status: targetReservationStatus },
      });

      // If paid and confirmed, initialize counseling session
      if (targetReservationStatus === ReservationStatus.CONFIRMED) {
        await tx.counselingSession.upsert({
          where: { reservationId: payment.reservationId },
          create: {
            reservationId: payment.reservationId,
            counselorId: payment.reservation.counselorId,
            clientId: payment.reservation.clientId,
            status: 'SCHEDULED',
          },
          update: {},
        });
      }

      return {
        success: true,
        orderNumber: dto.orderNumber,
        paymentStatus: updatedPayment.status,
        reservationStatus: updatedReservation.status,
      };
    });
  }

  async manualConfirm(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { reservation: true },
    });

    if (!payment) throw new NotFoundException('Payment not found');

    return this.prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.update({
        where: { id: paymentId },
        data: {
          status: PaymentStatus.PAID,
          paidAt: new Date(),
        },
      });

      await tx.reservation.update({
        where: { id: payment.reservationId },
        data: { status: ReservationStatus.CONFIRMED },
      });

      await tx.counselingSession.upsert({
        where: { reservationId: payment.reservationId },
        create: {
          reservationId: payment.reservationId,
          counselorId: payment.reservation.counselorId,
          clientId: payment.reservation.clientId,
          status: 'SCHEDULED',
        },
        update: {},
      });

      return updatedPayment;
    });
  }

  async findAll() {
    return this.prisma.payment.findMany({
      include: {
        reservation: {
          include: {
            client: { include: { profile: true } },
            counselor: { include: { profile: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
