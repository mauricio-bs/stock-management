import { Transform } from 'class-transformer';
import { IsBoolean, IsEmpty, IsOptional, IsString } from 'class-validator';

import { PaginationDTO } from '@common/dto/Pagination.dto';
import { boolConverter } from '@common/utils/boolConverter';

export class FindAllCashiesDTO extends PaginationDTO {
  @IsString()
  @IsString()
  name?: string;

  @IsString()
  @IsString()
  location?: string;

  @Transform(({ value }) => boolConverter(value))
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  // Filled by auth
  @IsEmpty()
  company_id: string;
}
