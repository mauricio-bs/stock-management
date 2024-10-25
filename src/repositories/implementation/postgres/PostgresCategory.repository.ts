import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@common/database/service/prisma.service';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Category } from '@entities/Category';
import { CreateCategoryDTO } from '@modules/category/domain/dto/create-category.dto';
import { FindAllCategoriesDTO } from '@modules/category/domain/dto/find-all-categories.dto';
import { UpdateCategoryDTO } from '@modules/category/domain/dto/update-category.dto';
import { ICategoryRepository } from '@repositories/ICategory.repository';

@Injectable()
export class PostgresCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ company_id, ...data }: CreateCategoryDTO): Promise<Category> {
    return await this.prisma.category.create({
      data: { ...data, company: { connect: { id: company_id } } },
    });
  }

  async update(
    id: string,
    { company_id, ...data }: UpdateCategoryDTO,
  ): Promise<Category> {
    return await this.prisma.category.update({
      where: { id, company_id },
      data,
    });
  }

  async delete(id: string, company_id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id, company_id } });
  }

  async findOneByPk(id: string, company_id?: string): Promise<Category> {
    return await this.prisma.category.findUnique({ where: { id, company_id } });
  }

  async findAll({
    page,
    limit,
    ...filters
  }: FindAllCategoriesDTO): Promise<PaginatedResult<Category>> {
    const where: Prisma.CategoryWhereInput = { ...filters };

    if (filters.name)
      where.name = { contains: filters.name, mode: 'insensitive' };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.category.count({ where }),
      this.prisma.category.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { name: 'desc' },
      }),
    ]);

    return { page, total, data };
  }
}
