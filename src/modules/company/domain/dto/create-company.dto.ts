import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Validate,
} from 'class-validator';

import { ValidateDocument } from '@common/utils/validateDocument';
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

  @Transform(({ value }) => String(value).replace(/\D/g, ''))
  @IsString()
  @Length(14, 14)
  @Validate(ValidateDocument)
  cnpj: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean = true;

  @IsOptional()
  @IsPhoneNumber('BR')
  phone?: string;
}
