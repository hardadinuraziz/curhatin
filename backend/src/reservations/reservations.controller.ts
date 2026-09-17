import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto, UpdateReservationStatusDto, RescheduleReservationDto } from './reservations.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post()
  async create(@CurrentUser() user: any, @Body() dto: CreateReservationDto) {
    return this.reservationsService.create(user.id, dto);
  }

  @Get()
  async findAll(@CurrentUser() user: any) {
    return this.reservationsService.findAll(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.reservationsService.findById(id, user);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN_OPERASIONAL)
  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateReservationStatusDto) {
    return this.reservationsService.updateStatus(id, dto);
  }

  @Put(':id/reschedule')
  async reschedule(
    @Param('id') id: string,
    @Body() dto: RescheduleReservationDto,
    @CurrentUser() user: any,
  ) {
    return this.reservationsService.reschedule(id, dto, user);
  }
}
