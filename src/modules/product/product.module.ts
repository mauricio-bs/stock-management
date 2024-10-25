import { Module } from '@nestjs/common';

import { PrismaService } from '@common/database/service/prisma.service';
import { PostgresProductRepository } from '@repositories/implementation/postgres/PostgresProduct.repository';
import { IProductRepository } from '@repositories/IProduct.repository';

import { IProductService } from './domain/service/IProduct.service';
import { ProductController } from './infra/http/controller/product.controller';
import { ProductService } from './service/product.service';

@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    { provide: IProductService, useClass: ProductService },
    { provide: IProductRepository, useClass: PostgresProductRepository },
  ],
})
export class ProductModule {}
