import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@common/database/service/prisma.service';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { User } from '@entities/User';
import { CreateUserDTO } from '@modules/user/domain/dto/create-user.dto';
import { FindAllUsersDTO } from '@modules/user/domain/dto/find-all-users.dto';
import { IUserRepository } from '@repositories/IUser.repository';

const baseUserFields = {
  id: true,
  name: true,
  email: true,
  is_active: true,
  document: true,
  company_id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
};

@Injectable()
export class PostgresUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    company_id,
    ...data
  }: Omit<CreateUserDTO, 'confirm_password'>): Promise<Omit<User, 'password'>> {
    return await this.prisma.user.create({
      data: { ...data, company: { connect: { id: company_id } } },
      select: baseUserFields,
    });
  }

  async update(
    id: string,
    {
      company_id,
      ...data
    }: Partial<Omit<User, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>>,
  ): Promise<Omit<User, 'password'>> {
    return await this.prisma.user.update({
      where: { id, company_id },
      data,
      select: baseUserFields,
    });
  }

  async delete(id: string, company_id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id, company_id } });
  }

  async findOneByPk(
    id: string,
    company_id?: string,
  ): Promise<Omit<User, 'password'>> {
    return await this.prisma.user.findUnique({
      where: { id, company_id },
      select: baseUserFields,
    });
  }

  async validate(id: string, company_id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id, company_id } });
  }

  async findAll({
    page,
    limit,
    ...filters
  }: FindAllUsersDTO): Promise<PaginatedResult<Omit<User, 'password'>>> {
    const where: Prisma.UserWhereInput = { ...filters };

    if (filters.name)
      where.name = { contains: filters.name, mode: 'insensitive' };

    if (filters.document)
      where.document = { contains: filters.document, mode: 'insensitive' };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        select: baseUserFields,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { name: 'asc' },
      }),
    ]);

    return { total, page, data };
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
