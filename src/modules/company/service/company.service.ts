import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { prismaErrorHandler } from '@common/utils/error/prisma-error-handler';
import { Company } from '@entities/Company';
import { ICompanyRepository } from '@repositories/ICompany.repository';

import { CreateCompanyDTO } from '../domain/dto/create-company.dto';
import { FindAllCompaniesDTO } from '../domain/dto/find-all-companies.dto';
import { UpdateCompanyDTO } from '../domain/dto/update-company.dto';
import { ICompanyService } from '../domain/service/ICompany.service';

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(private readonly repository: ICompanyRepository) {}

  async create(data: CreateCompanyDTO): Promise<Company> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async update(id: string, data: UpdateCompanyDTO): Promise<Company> {
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

  async findOneById(id: string): Promise<Company> {
    const company = await this.repository.findOneByPk(id);
    if (!company) throw new NotFoundException('Company not found');

    return company;
  }

  async findAll(
    filters: FindAllCompaniesDTO,
  ): Promise<PaginatedResult<Company>> {
    return await this.repository.findAll(filters);
  }
}
