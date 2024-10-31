import { IsEmpty, IsString, IsStrongPassword } from 'class-validator';

import { Match } from '@common/decorator/match.decorator';

export class UpdateUserPasswordDTO {
  @IsString()
  old_password: string;

  @IsString()
  @IsStrongPassword({ minLength: 6 })
  new_password: string;

  @IsString()
  @Match('new_password', { message: 'passwords does not match' })
  confirm_new_password: string;

  @IsEmpty()
  company_id: string;
}
