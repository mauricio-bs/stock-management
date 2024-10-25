import { Module } from '@nestjs/common';

import { PrismaService } from '@common/database/service/prisma.service';
import { PostgresSaleRepository } from '@repositories/implementation/postgres/PostgresSale.repository';
import { ISaleRepository } from '@repositories/ISale.repository';

import { ISaleService } from './domain/service/ISale.service';
import { SaleController } from './infra/http/controller/sale.controller';
import { SaleService } from './service/sale.service';

@Module({
  controllers: [SaleController],
  providers: [
    PrismaService,
    { provide: ISaleService, useClass: SaleService },
    { provide: ISaleRepository, useClass: PostgresSaleRepository },
  ],
})
export class SaleModule {}
