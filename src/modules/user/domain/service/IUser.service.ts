import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { User } from '@entities/User';

import { CreateUserDTO } from '../dto/create-user.dto';
import { FindAllUsersDTO } from '../dto/find-all-users.dto';
import { UpdateUserPasswordDTO } from '../dto/update-user-password.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';

export abstract class IUserService {
  abstract create(data: CreateUserDTO): Promise<Omit<User, 'password'>>;
  abstract update(
    id: string,
    data: UpdateUserDTO,
  ): Promise<Omit<User, 'password'>>;
  abstract updatePassword(
    id: string,
    data: UpdateUserPasswordDTO,
  ): Promise<void>;
  abstract delete(id: string, company_id: string): Promise<void>;
  abstract findOneById(
    id: string,
    company_id?: string,
  ): Promise<Omit<User, 'password'>>;
  abstract findAll(
    filters: FindAllUsersDTO,
  ): Promise<PaginatedResult<Omit<User, 'password'>>>;
}
