import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

import { EUnitMeasure } from '@common/enum/EUnitMeasure';
import { Product } from '@entities/Product';

export class CreateProductDTO
  implements
    Omit<
      Product,
      'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'category'
    >
{
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  code: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  min_stock_quantity?: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean = true;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  cost_value: number;

  @IsNumber()
  @IsPositive()
  profit_margin: number;

  @IsEnum(EUnitMeasure)
  measure_unit: EUnitMeasure;

  @IsOptional()
  @IsUUID(4)
  category_id: string;

  @IsOptional()
  company_id: string;
}
