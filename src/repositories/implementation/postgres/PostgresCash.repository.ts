import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@common/database/service/prisma.service';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Cash } from '@entities/Cash';
import { CreateCashDTO } from '@modules/cash/domain/dto/cash/create-cash.dto';
import { FindAllCashiesDTO } from '@modules/cash/domain/dto/cash/find-all-cashies.dto';
import { UpdateCashDTO } from '@modules/cash/domain/dto/cash/update-cash.dto';
import { ICashRepository } from '@repositories/ICash.repository';

@Injectable()
export class PostgresCashRepository implements ICashRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ company_id, ...data }: CreateCashDTO): Promise<Cash> {
    return await this.prisma.cash.create({
      data: {
        ...data,
        company: { connect: { id: company_id } },
      },
    });
  }

  async update(
    id: string,
    { company_id, ...data }: UpdateCashDTO,
  ): Promise<Cash> {
    return await this.prisma.cash.update({
      where: { id, company_id },
      data,
    });
  }

  async delete(id: string, company_id: string): Promise<void> {
    await this.prisma.cash.delete({ where: { id, company_id } });
  }

  async findOneByPk(id: string, company_id: string): Promise<Cash> {
    return (await this.prisma.cash.findUnique({
      where: { id, company_id },
      include: { cash_sessions: true },
    })) as unknown as Cash;
  }

  async findAll({
    page,
    limit,
    ...filters
  }: FindAllCashiesDTO): Promise<PaginatedResult<Cash>> {
    const where: Prisma.CashWhereInput = { ...filters };

    if (filters.name)
      where.name = { contains: filters.name, mode: 'insensitive' };

    if (filters.location)
      where.location = { contains: filters.location, mode: 'insensitive' };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.cash.count({ where }),
      this.prisma.cash.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { created_at: 'desc' },
      }),
    ]);

    return { total, page, data };
  }
}
