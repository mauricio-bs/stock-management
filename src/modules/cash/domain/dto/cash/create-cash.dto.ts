import { IsEmpty, IsOptional, IsString } from 'class-validator';

import { Cash } from '@entities/Cash';

export class CreateCashDTO
  implements
    Omit<
      Cash,
      'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'cash_sessions'
    >
{
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  is_active: boolean = true;

  // Filled by auth
  @IsEmpty()
  company_id: string;
}
