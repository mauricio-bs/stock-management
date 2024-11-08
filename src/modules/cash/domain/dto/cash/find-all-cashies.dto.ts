import {
  IsDateString,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';

import { PaginationDTO } from '@common/dto/Pagination.dto';
import { ECashStatus } from '@common/enum/ECashStatus';

export class FindAllCashesDTO extends PaginationDTO {
  // Open date range filter
  @IsOptional()
  @IsDateString()
  start_date_open?: Date;

  @IsOptional()
  @IsDateString()
  end_date_open?: Date;

  // Close date range filter
  @IsOptional()
  @IsDateString()
  start_date_close?: Date;

  @IsOptional()
  @IsDateString()
  end_date_close?: Date;

  @IsOptional()
  @IsEnum(ECashStatus)
  status?: ECashStatus;

  @IsOptional()
  @IsUUID(4)
  opened_by_user_id?: string;

  @IsOptional()
  @IsUUID(4)
  closed_by_user_id?: string;

  // Load from authorization
  @IsEmpty()
  company_id: string;
}
