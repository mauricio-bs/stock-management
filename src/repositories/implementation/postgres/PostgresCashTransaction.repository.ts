import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@common/database/service/prisma.service';
import { ETransactionType } from '@common/enum/ETransactionType';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { CashTransaction } from '@entities/CashTransaction';
import { CreateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/create-cash-transaction.dto';
import { FindAllCashTransactionsDTO } from '@modules/cash/domain/dto/transaction/find-all-cash-transacitons.dto';
import { UpdateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/update-cash-transaction.dto';
import { ICashTransactionRepository } from '@repositories/ICashTransaction.repository';

@Injectable()
export class PostgresCashTransactionRepository
  implements ICashTransactionRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create({
    cash_session_id,
    user_id,
    ...data
  }: CreateCashTransactionDTO & {
    cash_session_id: string;
  }): Promise<CashTransaction> {
    return (await this.prisma.cashTransaction.create({
      data: {
        ...data,
        cash_session: { connect: { id: cash_session_id } },
        user: { connect: { id: user_id } },
        ...(data.type === ETransactionType.widhdrawal && {
          widhdrawal: {
            create: {
              amount: data.amount,
              reason: data.description,
              cash_session: { connect: { id: cash_session_id } },
              user: { connect: { id: user_id } },
            },
          },
        }),
      },
    })) as unknown as CashTransaction;
  }

  async update(
    id: string,
    data: UpdateCashTransactionDTO,
  ): Promise<CashTransaction> {
    return await this.prisma.$transaction(async (t) => {
      const transaction = await t.cashTransaction.findUnique({ where: { id } });

      return (await t.cashTransaction.update({
        where: { id },
        data: {
          ...data,
          ...(transaction.type === ETransactionType.widhdrawal && {
            widhdrawal: {
              update: { amount: data.amount, reason: data.description },
            },
          }),
        },
      })) as unknown as CashTransaction;
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cashTransaction.delete({ where: { id } });
  }

  async findOneByPk(id: string): Promise<CashTransaction> {
    return (await this.prisma.cashTransaction.findUnique({
      where: { id },
    })) as unknown as CashTransaction;
  }

  async findAll({
    page,
    limit,
    start_date,
    end_date,
    ...filters
  }: FindAllCashTransactionsDTO & { cash_session_id: string }): Promise<
    PaginatedResult<CashTransaction>
  > {
    const where: Prisma.CashTransactionWhereInput = { ...filters };

    if (start_date && end_date) {
      where.transaction_date = { gte: start_date, lte: end_date };
    } else if (start_date) {
      where.transaction_date = { gte: start_date };
    } else if (end_date) {
      where.transaction_date = { lte: end_date };
    }

    const [total, transactions] = await this.prisma.$transaction([
      this.prisma.cashTransaction.count({ where }),
      this.prisma.cashTransaction.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { transaction_date: 'desc' },
      }),
    ]);

    return { page, total, data: transactions as unknown as CashTransaction[] };
  }
}
