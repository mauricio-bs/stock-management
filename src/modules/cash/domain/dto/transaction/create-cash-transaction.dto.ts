import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

import { ETransactionType } from '@common/enum/ETransactionType';
import { CashTransaction } from '@entities/CashTransaction';

export class CreateCashTransactionDTO
  implements
    Omit<
      CashTransaction,
      'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'sale_id'
    >
{
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

  @IsUUID(4)
  cash_id: string;

  @IsEmpty()
  user_id?: string;
}
