import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@common/database/service/prisma.service';
import { ETransactionType } from '@common/enum/ETransactionType';
import { CashTransaction } from '@entities/CashTransaction';
import { CreateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/create-cash-transaction.dto';
import { ICashTransactionRepository } from '@repositories/ICashTransaction.repository';
import { UpdateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/update-cash-transaction.dto';

@Injectable()
export class PostgresCashTransactionRepository
  implements ICashTransactionRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create({
    cash_id,
    user_id,
    ...data
  }: CreateCashTransactionDTO): Promise<CashTransaction> {
    return (await this.prisma.cashTransaction.create({
      data: {
        ...data,
        cash: { connect: { id: cash_id } },
        user: { connect: { id: user_id } },
        ...(data.type === ETransactionType.widhdrawal && {
          widhdrawal: {
            create: {
              amount: data.amount,
              reason: data.description,
              cash: { connect: { id: cash_id } },
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
}
