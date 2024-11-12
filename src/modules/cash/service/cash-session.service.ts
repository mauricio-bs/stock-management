import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ECashStatus } from '@common/enum/ECashStatus';
import { ETransactionType } from '@common/enum/ETransactionType';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { prismaErrorHandler } from '@common/utils/error/prisma-error-handler';
import { CashSession } from '@entities/CashSession';
import { ICashSessionRepository } from '@repositories/ICashSession.repository';

import { CloseCashSessionDTO } from '../domain/dto/session/close-cash.dto';
import { FindAllCashSessionsDTO } from '../domain/dto/session/find-all-cash-sessions.dto';
import { OpenCashSessionDTO } from '../domain/dto/session/open-cash.dto';
import { ICashSessionService } from '../domain/service/ICashSession.service';

@Injectable()
export class CashSessionService implements ICashSessionService {
  constructor(private readonly repository: ICashSessionRepository) {}

  async open(cash_id: string, data: OpenCashSessionDTO): Promise<CashSession> {
    const open_session = await this.repository.findOne(cash_id, {
      status: ECashStatus.open,
      opened_by_user_id: data.opened_by_user_id,
    });

    if (open_session)
      throw new ConflictException('You already have an open cash session');

    try {
      return await this.repository.create({ ...data, cash_id });
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async close(id: string, data: CloseCashSessionDTO): Promise<CashSession> {
    const session = await this.repository.findOneByPk(id, data.company_id);
    if (session?.status !== ECashStatus.open)
      throw new ConflictException('Cash session invalid or already closed');

    // Formatting data
    if (!data?.closing_date) data.closing_date = new Date();

    // Calculate balance
    data.total_income = session.transactions
      .filter(
        (t) =>
          t.type === ETransactionType.adjustment_in ||
          t.type === ETransactionType.opening ||
          t.type === ETransactionType.receipt ||
          t.type === ETransactionType.sale ||
          t.type === ETransactionType.supply,
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    data.total_expense = session.transactions
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

  async findOne(id: string): Promise<CashSession> {
    const session = await this.repository.findOneByPk(id);
    if (!session) throw new NotFoundException('Cash session not found');

    return session;
  }

  async findAll(
    filters: FindAllCashSessionsDTO,
  ): Promise<PaginatedResult<CashSession>> {
    return await this.repository.findAll(filters);
  }
}
