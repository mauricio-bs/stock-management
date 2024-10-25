import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

import { PaginationDTO } from '@common/dto/Pagination.dto';
import { boolConverter } from '@common/utils/boolConverter';

export class FindAllProductsDTO extends PaginationDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @Transform(({ value }) => boolConverter(value))
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsUUID(4)
  category_id?: string;

  @IsOptional()
  company_id: string;
}
