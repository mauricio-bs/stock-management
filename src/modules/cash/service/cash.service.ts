import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { prismaErrorHandler } from '@common/utils/error/prisma-error-handler';
import { Cash } from '@entities/Cash';
import { ICashRepository } from '@repositories/ICash.repository';

import { CreateCashDTO } from '../domain/dto/cash/create-cash.dto';
import { UpdateCashDTO } from '../domain/dto/cash/update-cash.dto';
import { FindAllCashSessionsDTO } from '../domain/dto/session/find-all-cash-sessions.dto';
import { ICashService } from '../domain/service/ICash.service';

@Injectable()
export class CashService implements ICashService {
  constructor(private readonly repository: ICashRepository) {}

  async create(data: CreateCashDTO): Promise<Cash> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async update(id: string, data: UpdateCashDTO): Promise<Cash> {
    try {
      return await this.repository.update(id, data);
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

  async findOneById(id: string, company_id: string): Promise<Cash> {
    const cash = await this.repository.findOneByPk(id, company_id);
    if (!cash) throw new NotFoundException('Cash not found');

    return cash;
  }

  async findAll(
    filters: FindAllCashSessionsDTO,
  ): Promise<PaginatedResult<Cash>> {
    return await this.repository.findAll(filters);
  }
}
