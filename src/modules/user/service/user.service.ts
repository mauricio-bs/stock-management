import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { prismaErrorHandler } from '@common/utils/error/prisma-error-handler';
import { compareHash, createHash } from '@common/utils/hashUtils';
import { User } from '@entities/User';
import { IUserRepository } from '@repositories/IUser.repository';

import { CreateUserDTO } from '../domain/dto/create-user.dto';
import { FindAllUsersDTO } from '../domain/dto/find-all-users.dto';
import { UpdateUserPasswordDTO } from '../domain/dto/update-user-password.dto';
import { UpdateUserDTO } from '../domain/dto/update-user.dto';
import { IUserService } from '../domain/service/IUser.service';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly repository: IUserRepository) {}

  async create({
    confirm_password,
    ...data
  }: CreateUserDTO): Promise<Omit<User, 'password'>> {
    try {
      data.password = await createHash(data.password);

      return await this.repository.create(data);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    data: UpdateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    try {
      return await this.repository.update(id, data);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async updatePassword(id: string, data: UpdateUserPasswordDTO): Promise<void> {
    const user = await this.repository.validate(id, data.company_id);
    if (!user) throw new NotFoundException('User not found');

    if (!(await compareHash(data.old_password, user.password)))
      throw new BadRequestException('Wrong password!');

    data.new_password = await createHash(data.new_password);

    try {
      await this.repository.update(id, { password: data.new_password });
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async delete(id: string, company_id: string): Promise<void> {
    try {
      await this.repository.delete(id, company_id);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async findOneById(
    id: string,
    company_id?: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.repository.findOneByPk(id, company_id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findAll(
    filters: FindAllUsersDTO,
  ): Promise<PaginatedResult<Omit<User, 'password'>>> {
    return await this.repository.findAll(filters);
  }
}
