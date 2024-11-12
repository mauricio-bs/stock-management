import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateCashTransactionDTO } from './create-cash-transaction.dto';

export class UpdateCashTransactionDTO extends PartialType(
  OmitType(CreateCashTransactionDTO, ['user_id', 'type']),
) {}
