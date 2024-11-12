import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@common/database/service/prisma.service';
import { ETransactionType } from '@common/enum/ETransactionType';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { CashSession } from '@entities/CashSession';
import { CloseCashSessionDTO } from '@modules/cash/domain/dto/session/close-cash.dto';
import { FindAllCashSessionsDTO } from '@modules/cash/domain/dto/session/find-all-cash-sessions.dto';
import { OpenCashSessionDTO } from '@modules/cash/domain/dto/session/open-cash.dto';
import {
  ICashSessionFields,
  ICashSessionRepository,
} from '@repositories/ICashSession.repository';

@Injectable()
export class PostgresCashSessionRepository implements ICashSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    cash_id,
    company_id,
    opened_by_user_id,
    ...data
  }: OpenCashSessionDTO & { cash_id: string }): Promise<CashSession> {
    return (await this.prisma.cashSession.create({
      data: {
        ...data,
        company: { connect: { id: company_id } },
        cash: { connect: { id: cash_id } },
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
    })) as unknown as CashSession;
  }

  async close(
    id: string,
    { company_id, user_id, ...data }: CloseCashSessionDTO,
  ): Promise<CashSession> {
    const [_closure, session] = await this.prisma.$transaction([
      this.prisma.cashClosing.create({
        data: {
          ...data,
          cash_session: { connect: { id } },
          user: { connect: { id: user_id } },
        },
      }),
      this.prisma.cashSession.update({
        where: { id, company_id },
        data: {
          status: 'closed',
          closing_at: data.closing_date,
          closing_balance: data.final_balance,
          closed_by: { connect: { id: user_id } },
        },
        include: { transactions: true, widhdrawals: true, closures: true },
      }),
    ]);

    return session as unknown as CashSession;
  }

  async findOne(
    cash_id: string,
    filters: ICashSessionFields,
  ): Promise<CashSession> {
    const where: Prisma.CashSessionWhereInput = { ...filters, cash_id };

    return (await this.prisma.cashSession.findFirst({
      where,
      include: { transactions: true, widhdrawals: true },
    })) as unknown as CashSession;
  }

  async findOneByPk(id: string, company_id?: string): Promise<CashSession> {
    return (await this.prisma.cashSession.findFirst({
      where: { id, company_id },
      include: { transactions: true, widhdrawals: true },
    })) as unknown as CashSession;
  }

  async findAll({
    page,
    limit,
    start_date_open,
    end_date_open,
    start_date_close,
    end_date_close,
    ...filters
  }: FindAllCashSessionsDTO): Promise<PaginatedResult<CashSession>> {
    const where: Prisma.CashSessionWhereInput = { ...filters };

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

    const [total, sessions] = await this.prisma.$transaction([
      this.prisma.cashSession.count({ where }),
      this.prisma.cashSession.findMany({
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

    return { total, page, data: sessions as unknown as CashSession[] };
  }
}
