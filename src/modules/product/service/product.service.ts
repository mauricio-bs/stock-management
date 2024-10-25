import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { prismaErrorHandler } from '@common/utils/error/prisma-error-handler';
import { Product } from '@entities/Product';
import { IProductRepository } from '@repositories/IProduct.repository';

import { CreateProductDTO } from '../domain/dto/create-product.dto';
import { FindAllProductsDTO } from '../domain/dto/find-all-products.dto';
import { UpdateProductDTO } from '../domain/dto/update-product.dto';
import { IProductService } from '../domain/service/IProduct.service';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly repository: IProductRepository) {}

  async create(data: CreateProductDTO): Promise<Product> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw prismaErrorHandler(error);
    }
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product> {
    try {
      return await this.update(id, data);
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

  async findOneById(id: string, company_id: string): Promise<Product> {
    const product = await this.repository.findOneByPk(id, company_id);
    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async findAll(
    filters: FindAllProductsDTO,
  ): Promise<PaginatedResult<Product>> {
    return await this.repository.findAll(filters);
  }
}
