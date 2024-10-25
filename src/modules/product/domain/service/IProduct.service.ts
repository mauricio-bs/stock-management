import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Product } from '@entities/Product';

import { CreateProductDTO } from '../dto/create-product.dto';
import { FindAllProductsDTO } from '../dto/find-all-products.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';

export abstract class IProductService {
  abstract create(data: CreateProductDTO): Promise<Product>;
  abstract update(id: string, data: UpdateProductDTO): Promise<Product>;
  abstract delete(id: string, company_id: string): Promise<void>;
  abstract findOneById(id: string, company_id: string): Promise<Product>;
  abstract findAll(
    filters: FindAllProductsDTO,
  ): Promise<PaginatedResult<Product>>;
}
