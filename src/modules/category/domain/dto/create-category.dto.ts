import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

import { Category } from '@entities/Category';

export class CreateCategoryDTO
  implements Omit<Category, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
{
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean = true;

  @IsOptional()
  @IsUUID(4)
  company_id: string;
}
