import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsUUID } from 'class-validator';

import { OpenCashDTO } from './open-cash.dto';

export class UpdateCashDTO extends PartialType(
  OmitType(OpenCashDTO, ['status']),
) {
  @IsOptional()
  @IsUUID(4)
  opened_by_user_id?: string;
}
