import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Product } from '@entities/Product';
import { CreateProductDTO } from '@modules/product/domain/dto/create-product.dto';
import { FindAllProductsDTO } from '@modules/product/domain/dto/find-all-products.dto';
import { UpdateProductDTO } from '@modules/product/domain/dto/update-product.dto';

export interface IFindOneProduct {
  company_id: string;
  code?: number;
  is_active?: boolean;
  category_id?: string;
}

export abstract class IProductRepository {
  abstract create(data: CreateProductDTO): Promise<Product>;
  abstract update(id: string, data: UpdateProductDTO): Promise<Product>;
  abstract delete(id: string, company_id: string): Promise<void>;
  abstract findOne(filters: IFindOneProduct): Promise<Product>;
  abstract findLastCode(company_id: string): Promise<number>;
  abstract findOneByPk(id: string, company_id?: string): Promise<Product>;
  abstract findAll(
    filters: FindAllProductsDTO,
  ): Promise<PaginatedResult<Product>>;
}
