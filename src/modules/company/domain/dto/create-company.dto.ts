import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

import { Company } from '@entities/Company';

export class CreateCompanyDTO
  implements
    Omit<
      Company,
      | 'id'
      | 'created_at'
      | 'updated_at'
      | 'deleted_at'
      | 'products'
      | 'users'
      | 'categories'
      | 'sales'
    >
{
  @IsString()
  name: string;

  @Transform(({ value }) => String(value).replace(/^\d+/g, ''))
  @IsString()
  @Length(14, 14)
  cnpj: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean = true;

  @IsOptional()
  @IsPhoneNumber('BR')
  phone?: string;
}
