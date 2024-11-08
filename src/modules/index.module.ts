import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { UserModule } from './user/user.module';
import { CashModule } from './cash/cash.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    CategoryModule,
    SaleModule,
    CompanyModule,
    UserModule,
    CashModule,
  ],
})
export class IndexModule {}
