import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@common/database/service/prisma.service';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Product } from '@entities/Product';
import { CreateProductDTO } from '@modules/product/domain/dto/create-product.dto';
import { FindAllProductsDTO } from '@modules/product/domain/dto/find-all-products.dto';
import { UpdateProductDTO } from '@modules/product/domain/dto/update-product.dto';
import {
  IFindOneProduct,
  IProductRepository,
} from '@repositories/IProduct.repository';

@Injectable()
export class PostgresProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    company_id,
    category_id,
    ...data
  }: CreateProductDTO): Promise<Product> {
    return (await this.prisma.product.create({
      data: {
        ...data,

        category: { connect: { id: category_id } },
        company: { connect: { id: company_id } },
      },
    })) as unknown as Product;
  }

  async update(
    id: string,
    { company_id, ...data }: UpdateProductDTO,
  ): Promise<Product> {
    return (await this.prisma.product.update({
      where: { id, company_id },
      data,
    })) as unknown as Product;
  }

  async delete(id: string, company_id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id, company_id } });
  }

  async findOneByPk(id: string, company_id?: string): Promise<Product> {
    return (await this.prisma.product.findUnique({
      where: { id, company_id },
    })) as unknown as Product;
  }

  async findOne(filters: IFindOneProduct): Promise<Product> {
    return (await this.prisma.product.findFirst({
      where: filters,
    })) as unknown as Product;
  }

  async findLastCode(company_id: string): Promise<number> {
    return (
      await this.prisma.product.findFirst({
        where: { company_id },
        orderBy: { code: 'desc' },
      })
    ).code;
  }

  async findAll({
    page,
    limit,
    ...filters
  }: FindAllProductsDTO): Promise<PaginatedResult<Product>> {
    const where: Prisma.ProductWhereInput = { ...filters };

    if (filters.name)
      where.name = { contains: filters.name, mode: 'insensitive' };

    const [total, products] = await this.prisma.$transaction([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { created_at: 'desc' },
        include: { category: { select: { id: true, name: true } } },
      }),
    ]);

    return { total, page, data: products as unknown as Product[] };
  }
}
