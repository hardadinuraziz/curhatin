import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Roles(Role.SUPER_ADMIN, Role.ADMIN_OPERASIONAL, Role.OWNER)
  @Get('dashboard')
  async getDashboard() {
    return this.reportsService.getExecutiveDashboard();
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN_OPERASIONAL, Role.OWNER)
  @Get('counselors')
  async getCounselorStats() {
    return this.reportsService.getCounselorPerformance();
  }
}
