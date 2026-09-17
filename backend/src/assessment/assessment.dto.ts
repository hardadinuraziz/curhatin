import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubmitAssessmentDto {
  @IsString()
  @IsNotEmpty()
  type: string; // e.g. "DASS-21" | "MENTAL_HEALTH_CHECK"

  @IsArray()
  answers: { questionIndex: number; score: number; text?: string }[];

  @IsOptional()
  @IsString()
  userNotes?: string;
}

export class ReviewAssessmentDto {
  @IsString()
  @IsNotEmpty()
  reviewNotes: string;

  @IsOptional()
  @IsString()
  serviceRecommendation?: string; // "PSIKOLOG" | "TEMAN_CERITA" | "SELF_CARE"
}
