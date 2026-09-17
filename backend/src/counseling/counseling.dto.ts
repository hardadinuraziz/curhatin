import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSessionStatusDto {
  @IsEnum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export class AddClinicalNotesDto {
  @IsNotEmpty()
  @IsString()
  clinicalNotes: string; // STRICTLY PRIVATE: Psikolog & Super Admin only

  @IsOptional()
  @IsString()
  clientSummary?: string; // Visible to Client as actionable takeaway
}
