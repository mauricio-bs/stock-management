import { Injectable, NotFoundException } from '@nestjs/common';

import { prismaErrorHandler } from '@common/utils/error/prisma-error-handler';
import { CashTransaction } from '@entities/CashTransaction';
import { ICashTransactionRepository } from '@repositories/ICashTransaction.repository';

import { CreateCashTransactionDTO } from '../domain/dto/transaction/create-cash-transaction.dto';
import { ICashTransactionService } from '../domain/service/ICashTransaction.service';
import { UpdateCashTransactionDTO } from '../domain/dto/transaction/update-cash-transaction.dto';

@Injectable()
export class CashTransactionService implements ICashTransactionService {
  constructor(private readonly repository: ICashTransactionRepository) {}

  async create(data: CreateCashTransactionDTO): Promise<CashTransaction> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    data: UpdateCashTransactionDTO,
  ): Promise<CashTransaction> {
    try {
      return await this.repository.update(id, data);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async findOneById(id: string): Promise<CashTransaction> {
    const transaction = await this.repository.findOneByPk(id);
    if (!transaction) throw new NotFoundException('Cash transaction not found');

    return transaction;
  }
}
