import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { PaginationDTO } from '@common/dto/Pagination.dto';
import { boolConverter } from '@common/utils/boolConverter';

export class FindAllCompaniesDTO extends PaginationDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @Transform(({ value }) => boolConverter(value))
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
