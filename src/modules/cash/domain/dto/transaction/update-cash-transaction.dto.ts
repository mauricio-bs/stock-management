import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCashTransactionDTO } from './create-cash-transaction.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ETransactionType } from '@common/enum/ETransactionType';

export class UpdateCashTransactionDTO extends PartialType(
  OmitType(CreateCashTransactionDTO, ['cash_id', 'user_id', 'type']),
) {}
