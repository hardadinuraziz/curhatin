import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AssessmentModule } from './assessment/assessment.module';
import { CounselingModule } from './counseling/counseling.module';
import { PaymentsModule } from './payments/payments.module';
import { ChatModule } from './chat/chat.module';
import { ReportsModule } from './reports/reports.module';
import { AuditLogModule } from './audit-log/audit-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ReservationsModule,
    AssessmentModule,
    CounselingModule,
    PaymentsModule,
    ChatModule,
    ReportsModule,
    AuditLogModule,
  ],
})
export class AppModule {}
