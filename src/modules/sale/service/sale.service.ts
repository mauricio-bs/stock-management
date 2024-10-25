import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { prismaErrorHandler } from '@common/utils/error/prisma-error-handler';
import { Sale } from '@entities/Sale';
import { ISaleRepository } from '@repositories/ISale.repository';

import { CreateSaleDTO } from '../domain/dto/create-sale.dto';
import { FindAllSalesDTO } from '../domain/dto/find-all-sales.dto';
import { UpdateSaleDTO } from '../domain/dto/update-sale.dto';
import { ISaleService } from '../domain/service/ISale.service';

@Injectable()
export class SaleService implements ISaleService {
  constructor(private readonly repository: ISaleRepository) {}

  async create(data: CreateSaleDTO): Promise<Sale> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async update(id: string, data: UpdateSaleDTO): Promise<Sale> {
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

  async findOneById(id: string, company_id: string): Promise<Sale> {
    const sale = await this.repository.findOneByPk(id, company_id);
    if (!sale) throw new NotFoundException('Sale not found');

    return sale;
  }

  async findAll(filters: FindAllSalesDTO): Promise<PaginatedResult<Sale>> {
    return await this.repository.findAll(filters);
  }
}
