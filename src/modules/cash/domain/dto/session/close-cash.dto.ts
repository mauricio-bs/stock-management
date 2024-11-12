import {
  IsDate,
  IsEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import { CashClosing } from '@entities/CashClosing';

export class CloseCashSessionDTO
  implements
    Omit<
      CashClosing,
      | 'id'
      | 'created_at'
      | 'updated_at'
      | 'deleted_at'
      | 'user'
      | 'cash_session_id'
    >
{
  @IsOptional()
  @IsDate()
  closing_date: Date;

  @IsNumber()
  final_balance: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  difference?: number;

  // Calculated internally
  @IsEmpty()
  total_income: number;

  @IsEmpty()
  total_expense: number;

  // Load from authorization
  @IsEmpty()
  user_id: string;

  @IsEmpty()
  company_id: string;
}
