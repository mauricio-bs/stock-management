import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { PaginationDTO } from '@common/dto/Pagination.dto';
import { boolConverter } from '@common/utils/boolConverter';

export class FindAllCategoriesDTO extends PaginationDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @Transform(({ value }) => boolConverter(value))
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  company_id: string;
}
