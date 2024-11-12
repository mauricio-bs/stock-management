import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';

import { CreateCashDTO } from './create-cash.dto';

export class UpdateCashDTO extends PartialType(CreateCashDTO) {
  // Filled by auth
  @IsEmpty()
  company_id: string;
}
