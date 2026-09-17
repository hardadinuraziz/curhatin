import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ReservationStatus, ServiceType } from '@prisma/client';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  counselorId: string;

  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @IsDateString()
  date: string; // YYYY-MM-DD

  @IsNotEmpty()
  @IsString()
  timeSlot: string; // e.g. "10:00"

  @IsInt()
  @Min(1000)
  totalPrice: number;

  @IsOptional()
  @IsString()
  clientNotes?: string;
}

export class UpdateReservationStatusDto {
  @IsEnum(ReservationStatus)
  status: ReservationStatus;

  @IsOptional()
  @IsString()
  adminNotes?: string;
}

export class RescheduleReservationDto {
  @IsDateString()
  newDate: string;

  @IsNotEmpty()
  @IsString()
  newTimeSlot: string;
}
