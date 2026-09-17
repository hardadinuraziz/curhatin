import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { CounselingService } from './counseling.service';
import { AddClinicalNotesDto, UpdateSessionStatusDto } from './counseling.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('counseling')
export class CounselingController {
  constructor(private counselingService: CounselingService) {}

  @Get('my-sessions')
  async getMySessions(@CurrentUser() user: any) {
    return this.counselingService.getMySessions(user);
  }

  @Get('sessions/:id')
  async getSessionById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.counselingService.getSessionById(id, user);
  }

  @Roles(Role.PSIKOLOG, Role.TEMAN_CERITA, Role.SUPER_ADMIN)
  @Put('sessions/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateSessionStatusDto,
  ) {
    return this.counselingService.updateStatus(id, dto, user);
  }

  @Roles(Role.PSIKOLOG, Role.TEMAN_CERITA, Role.SUPER_ADMIN)
  @Put('sessions/:id/clinical-notes')
  async saveClinicalNotes(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: AddClinicalNotesDto,
  ) {
    return this.counselingService.saveClinicalNotes(id, dto, user);
  }
}
