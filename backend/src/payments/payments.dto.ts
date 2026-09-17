import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentWebhookDto {
  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @IsNotEmpty()
  @IsString()
  transactionStatus: string; // "settlement" | "capture" | "pending" | "expire" | "cancel"

  @IsOptional()
  @IsString()
  paymentType?: string;

  @IsOptional()
  @IsNumber()
  grossAmount?: number;

  @IsOptional()
  @IsString()
  signatureKey?: string;
}

export class ConfirmManualPaymentDto {
  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @IsOptional()
  @IsString()
  adminNotes?: string;
}
