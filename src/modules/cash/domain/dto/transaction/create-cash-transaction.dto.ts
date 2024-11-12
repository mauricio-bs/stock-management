import {
  IsDate,
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

import { ETransactionType } from '@common/enum/ETransactionType';
import { CashTransaction } from '@entities/CashTransaction';

export class CreateCashTransactionDTO
  implements
    Omit<
      CashTransaction,
      | 'id'
      | 'cash_session_id'
      | 'created_at'
      | 'updated_at'
      | 'deleted_at'
      | 'sale_id'
      | 'sale'
      | 'user'
    >
{
  @IsOptional()
  @IsDate()
  transaction_date: Date = new Date();

  @IsEnum([
    ETransactionType.adjustment_in,
    ETransactionType.adjustment_out,
    ETransactionType.receipt,
    ETransactionType.supply,
    ETransactionType.widhdrawal,
  ])
  type:
    | ETransactionType.adjustment_in
    | ETransactionType.adjustment_out
    | ETransactionType.receipt
    | ETransactionType.supply
    | ETransactionType.widhdrawal;

  @ValidateIf((data) => data.type === ETransactionType.widhdrawal)
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsEmpty()
  user_id?: string;
}
