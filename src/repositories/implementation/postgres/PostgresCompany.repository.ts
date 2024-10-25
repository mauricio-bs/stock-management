import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@common/database/service/prisma.service';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Company } from '@entities/Company';
import { CreateCompanyDTO } from '@modules/company/domain/dto/create-company.dto';
import { FindAllCompaniesDTO } from '@modules/company/domain/dto/find-all-companies.dto';
import { UpdateCompanyDTO } from '@modules/company/domain/dto/update-company.dto';
import { ICompanyRepository } from '@repositories/ICompany.repository';

@Injectable()
export class PostgresCompanyRepository implements ICompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCompanyDTO): Promise<Company> {
    return await this.prisma.company.create({ data });
  }

  async update(id: string, data: UpdateCompanyDTO): Promise<Company> {
    return await this.prisma.company.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.company.delete({ where: { id } });
  }

  async findOneByPk(id: string): Promise<Company> {
    return await this.prisma.company.findUnique({ where: { id } });
  }

  async findAll({
    page,
    limit,
    ...filters
  }: FindAllCompaniesDTO): Promise<PaginatedResult<Company>> {
    const where: Prisma.CompanyWhereInput = { ...filters };

    if (filters.name)
      where.name = { contains: filters.name, mode: 'insensitive' };

    if (filters.cnpj)
      where.cnpj = { contains: filters.cnpj, mode: 'insensitive' };

    if (filters.phone)
      where.phone = { contains: filters.phone, mode: 'insensitive' };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.company.count({ where }),
      this.prisma.company.findMany({ where }),
    ]);

    return { page, total, data };
  }
}
