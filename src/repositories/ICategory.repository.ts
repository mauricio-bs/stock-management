import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Category } from '@entities/Category';
import { CreateCategoryDTO } from '@modules/category/domain/dto/create-category.dto';
import { FindAllCategoriesDTO } from '@modules/category/domain/dto/find-all-categories.dto';
import { UpdateCategoryDTO } from '@modules/category/domain/dto/update-category.dto';

export abstract class ICategoryRepository {
  abstract create(data: CreateCategoryDTO): Promise<Category>;
  abstract update(id: string, data: UpdateCategoryDTO): Promise<Category>;
  abstract delete(id: string, company_id: string): Promise<void>;
  abstract findOneByPk(id: string, company_id?: string): Promise<Category>;
  abstract findAll(
    filters: FindAllCategoriesDTO,
  ): Promise<PaginatedResult<Category>>;
}
