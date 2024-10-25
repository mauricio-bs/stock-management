import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { prismaErrorHandler } from '@common/utils/error/prisma-error-handler';
import { Category } from '@entities/Category';
import { ICategoryRepository } from '@repositories/ICategory.repository';

import { CreateCategoryDTO } from '../domain/dto/create-category.dto';
import { FindAllCategoriesDTO } from '../domain/dto/find-all-categories.dto';
import { UpdateCategoryDTO } from '../domain/dto/update-category.dto';
import { ICategoryService } from '../domain/service/ICategory.service';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private readonly repository: ICategoryRepository) {}

  async create(data: CreateCategoryDTO): Promise<Category> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category> {
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

  async findOneById(id: string, company_id: string): Promise<Category> {
    const category = await this.repository.findOneByPk(id, company_id);
    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async findAll(
    filters: FindAllCategoriesDTO,
  ): Promise<PaginatedResult<Category>> {
    return await this.repository.findAll(filters);
  }
}
