import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('audit-logs')
export class AuditLogController {
  constructor(private auditLogService: AuditLogService) {}

  @Roles(Role.SUPER_ADMIN)
  @Get()
  async getAuditLogs(@Query('limit') limit?: string) {
    const take = limit ? parseInt(limit, 10) : 100;
    return this.auditLogService.findAll(take);
  }
}
