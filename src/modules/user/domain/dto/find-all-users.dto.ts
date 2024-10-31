import { Transform } from 'class-transformer';
import { IsBoolean, IsEmpty, IsOptional, IsString } from 'class-validator';

import { PaginationDTO } from '@common/dto/Pagination.dto';
import { boolConverter } from '@common/utils/boolConverter';

export class FindAllUsersDTO extends PaginationDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @Transform(({ value }) => boolConverter(value))
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  document?: string;

  @IsEmpty()
  company_id?: string;
}
