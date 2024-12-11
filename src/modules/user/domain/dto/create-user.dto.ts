import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

import { Match } from '@common/decorator/match.decorator';
import { User } from '@entities/User';

export class CreateUserDTO
  implements Omit<User, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
{
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minSymbols: 1,
    minUppercase: 1,
    minNumbers: 1,
    minLowercase: 1,
  })
  password: string;

  @IsString()
  @Match('password', { message: 'passwords does not match' })
  confirm_password: string;

  @Transform(() => true)
  @IsBoolean()
  is_active: boolean = true;

  @Transform(({ value }) => value && String(value).replace(/[^a-zA-Z0-9]/g, '')) // remove symbols
  @IsOptional()
  @IsString()
  document?: string;

  @IsUUID(4)
  company_id: string;
}
