import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@common/database/service/prisma.service';
import { ETransactionType } from '@common/enum/ETransactionType';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Cash } from '@entities/Cash';
import { FindAllCashesDTO } from '@modules/cash/domain/dto/cash/find-all-cashies.dto';
import { OpenCashDTO } from '@modules/cash/domain/dto/cash/open-cash.dto';
import { CloseCashDTO } from '@modules/cash/domain/dto/closure/close-cash.dto';
import { ICashFields, ICashRepository } from '@repositories/ICash.repository';

@Injectable()
export class PostgresCashRepository implements ICashRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    company_id,
    opened_by_user_id,
    ...data
  }: OpenCashDTO): Promise<Cash> {
    return (await this.prisma.cash.create({
      data: {
        ...data,
        company: { connect: { id: company_id } },
        oppened_by: { connect: { id: opened_by_user_id } },
        transactions: {
          create: {
            type: ETransactionType.opening,
            amount: data.opening_balance,
            user_id: opened_by_user_id,
            description: 'Entrada',
          },
        },
      },
    })) as unknown as Cash;
  }

  async close(
    id: string,
    { user_id, company_id, ...data }: CloseCashDTO,
  ): Promise<Cash> {
    const [_closure, cash] = await this.prisma.$transaction([
      this.prisma.cashClosing.create({
        data: {
          ...data,
          cash: { connect: { id } },
          user: { connect: { id: user_id } },
        },
      }),
      this.prisma.cash.update({
        where: { id, company_id },
        data: {
          status: 'closed',
          closing_at: data.closing_date,
          closing_balance: data.final_balance,
          closed_by: { connect: { id: user_id } },
        },
        include: { transactions: true, withdrawals: true, closures: true },
      }),
    ]);

    return cash as unknown as Cash;
  }

  async update(
    id: string,
    {
      company_id,
      opened_by_user_id,
      closed_by_user_id,
      ...data
    }: Partial<
      Omit<
        Cash,
        | 'id'
        | 'created_at'
        | 'updated_at'
        | 'deleted_at'
        | 'withdrawals'
        | 'closures'
        | 'transactions'
        | 'oppened_by'
        | 'closed_by'
      >
    >,
  ): Promise<Cash> {
    return (await this.prisma.cash.update({
      where: { id, company_id },
      data: {
        ...data,
        ...(opened_by_user_id && {
          oppened_by: { connect: { id: opened_by_user_id } },
        }),
        ...(closed_by_user_id && {
          closed_by: { connect: { id: closed_by_user_id } },
        }),
      },
    })) as unknown as Cash;
  }

  async findOneByPk(id: string, company_id: string): Promise<Cash> {
    return (await this.prisma.cash.findUnique({
      where: { id, company_id },
      include: { transactions: true, withdrawals: true },
    })) as unknown as Cash;
  }

  async findOne(filters: ICashFields): Promise<Cash> {
    const where: Prisma.CashWhereInput = { ...filters };

    return (await this.prisma.cash.findFirst({
      where,
      include: { transactions: true, withdrawals: true },
    })) as unknown as Cash;
  }

  async findAll({
    page,
    limit,
    start_date_open,
    end_date_open,
    start_date_close,
    end_date_close,
    ...filters
  }: FindAllCashesDTO): Promise<PaginatedResult<Cash>> {
    const where: Prisma.CashWhereInput = { ...filters };

    if (start_date_open && end_date_open) {
      where.opening_at = { gte: start_date_open, lte: end_date_open };
    } else if (start_date_open) {
      where.opening_at = { gte: start_date_open };
    } else if (end_date_open) {
      where.opening_at = { lte: end_date_open };
    }

    if (start_date_close && end_date_close) {
      where.closing_at = { gte: start_date_close, lte: end_date_close };
    } else if (start_date_close) {
      where.closing_at = { gte: start_date_close };
    } else if (end_date_close) {
      where.closing_at = { lte: end_date_close };
    }

    const [total, cashes] = await this.prisma.$transaction([
      this.prisma.cash.count({ where }),
      this.prisma.cash.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { opening_at: 'desc' },
        include: {
          oppened_by: { select: { id: true, name: true } },
          closed_by: { select: { id: true, name: true } },
        },
      }),
    ]);

    return { total, page, data: cashes as unknown as Cash[] };
  }
}
