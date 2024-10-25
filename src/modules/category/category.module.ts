import { Module } from '@nestjs/common';

import { PrismaService } from '@common/database/service/prisma.service';
import { ICategoryRepository } from '@repositories/ICategory.repository';
import { PostgresCategoryRepository } from '@repositories/implementation/postgres/PostgresCategory.repository';

import { ICategoryService } from './domain/service/ICategory.service';
import { CategoryController } from './infra/http/controller/category.controller';
import { CategoryService } from './service/category.service';

@Module({
  controllers: [CategoryController],
  providers: [
    PrismaService,
    { provide: ICategoryService, useClass: CategoryService },
    { provide: ICategoryRepository, useClass: PostgresCategoryRepository },
  ],
})
export class CategoryModule {}
