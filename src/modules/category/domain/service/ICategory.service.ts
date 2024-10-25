import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Category } from '@entities/Category';

import { CreateCategoryDTO } from '../dto/create-category.dto';
import { FindAllCategoriesDTO } from '../dto/find-all-categories.dto';
import { UpdateCategoryDTO } from '../dto/update-category.dto';

export abstract class ICategoryService {
  abstract create(data: CreateCategoryDTO): Promise<Category>;
  abstract update(id: string, data: UpdateCategoryDTO): Promise<Category>;
  abstract delete(id: string, company_id: string): Promise<void>;
  abstract findOneById(id: string, company_id: string): Promise<Category>;
  abstract findAll(
    filters: FindAllCategoriesDTO,
  ): Promise<PaginatedResult<Category>>;
}
