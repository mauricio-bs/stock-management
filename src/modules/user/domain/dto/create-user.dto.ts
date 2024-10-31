import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEmpty,
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
  @IsStrongPassword({ minLength: 6 })
  password: string;

  @IsString()
  @Match('password', { message: 'passwords does not match' })
  confirm_password: string;

  @IsEmpty()
  is_active: boolean = true;

  @Transform(({ value }) => value && String(value).replace(/[^a-zA-Z0-9]/g, '')) // remove symbols
  @IsString()
  document?: string;

  @IsUUID(4)
  company_id: string;
}
