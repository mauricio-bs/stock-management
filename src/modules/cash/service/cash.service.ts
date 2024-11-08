import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ECashStatus } from '@common/enum/ECashStatus';
import { ETransactionType } from '@common/enum/ETransactionType';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { prismaErrorHandler } from '@common/utils/error/prisma-error-handler';
import { Cash } from '@entities/Cash';
import { ICashRepository } from '@repositories/ICash.repository';

import { FindAllCashesDTO } from '../domain/dto/cash/find-all-cashies.dto';
import { OpenCashDTO } from '../domain/dto/cash/open-cash.dto';
import { CloseCashDTO } from '../domain/dto/closure/close-cash.dto';
import { ICashService } from '../domain/service/ICash.service';

@Injectable()
export class CashService implements ICashService {
  constructor(private readonly repository: ICashRepository) {}

  async open(data: OpenCashDTO): Promise<Cash> {
    const open_cash = await this.repository.findOne({
      company_id: data.company_id,
      status: ECashStatus.open,
      opened_by_user_id: data.opened_by_user_id,
    });
    if (open_cash)
      throw new ConflictException('You already have an open cash register');

    try {
      return await this.repository.create(data);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async close(id: string, data: CloseCashDTO): Promise<Cash> {
    const cash = await this.repository.findOneByPk(id, data.company_id);
    if (cash?.status !== ECashStatus.open)
      throw new ConflictException('Cash invalid or already closed');

    // Formatting data
    if (!data?.closing_date) data.closing_date = new Date();

    // Calculate balance
    data.total_income = cash.transactions
      .filter(
        (t) =>
          t.type === ETransactionType.adjustment_in ||
          t.type === ETransactionType.opening ||
          t.type === ETransactionType.receipt ||
          t.type === ETransactionType.sale ||
          t.type === ETransactionType.supply,
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    data.total_expense = cash.transactions
      .filter(
        (t) =>
          t.type === ETransactionType.adjustment_out ||
          t.type === ETransactionType.widhdrawal,
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const calculated_balance = data.total_income - data.total_expense;

    data.difference = calculated_balance - data.final_balance;

    try {
      return await this.repository.close(id, data);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async findOneById(id: string, company_id: string): Promise<Cash> {
    const cash = await this.repository.findOneByPk(id, company_id);
    if (!cash) throw new NotFoundException('Cash not found');

    return cash;
  }

  async findAll(filters: FindAllCashesDTO): Promise<PaginatedResult<Cash>> {
    return await this.repository.findAll(filters);
  }
}
