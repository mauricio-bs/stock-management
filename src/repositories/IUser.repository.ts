import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { User } from '@entities/User';
import { CreateUserDTO } from '@modules/user/domain/dto/create-user.dto';
import { FindAllUsersDTO } from '@modules/user/domain/dto/find-all-users.dto';

export abstract class IUserRepository {
  abstract create(
    data: Omit<CreateUserDTO, 'confirm_password'>,
  ): Promise<Omit<User, 'password'>>;
  abstract update(
    id: string,
    data: Partial<
      Omit<User, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
    >,
  ): Promise<Omit<User, 'password'>>;
  abstract delete(id: string, company_id: string): Promise<void>;
  abstract findOneByPk(
    id: string,
    company_id?: string,
  ): Promise<Omit<User, 'password'>>;
  abstract findOneByEmail(email: string): Promise<User>;
  abstract validate(id: string, company_id?: string): Promise<User>;
  abstract findAll(
    filters: FindAllUsersDTO,
  ): Promise<PaginatedResult<Omit<User, 'password'>>>;
}
