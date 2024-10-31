import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';

import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO extends PartialType(
  OmitType(CreateUserDTO, ['email', 'password', 'confirm_password']),
) {
  @IsEmpty()
  company_id?: string;
}
