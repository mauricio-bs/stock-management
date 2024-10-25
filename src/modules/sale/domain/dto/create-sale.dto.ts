import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { ESaleStatus } from '@common/enum/ESaleStatus';
import { Sale } from '@entities/Sale';
import { SaleItem } from '@entities/SaleItem';

class CreateSaleItemsDTO
  implements
    Omit<
      SaleItem,
      'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'product' | 'sale_id'
    >
{
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  total_value: number;

  @IsNumber()
  @IsPositive()
  unit_value: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  total_discount?: number;

  @IsUUID(4)
  product_id: string;
}

export class CreateSaleDTO
  implements
    Omit<
      Sale,
      'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'sale_items'
    >
{
  @IsOptional()
  @IsEnum(ESaleStatus)
  status: ESaleStatus = ESaleStatus.pending;

  @IsNumber()
  @IsPositive()
  total: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  total_discount?: number;

  @IsEmpty()
  company_id: string;

  @Type(() => CreateSaleDTO)
  @IsArray()
  @ValidateNested({ each: true })
  sale_items: CreateSaleItemsDTO[];
}
