import { Module } from '@nestjs/common';

import { PrismaService } from '@common/database/service/prisma.service';
import { ICashRepository } from '@repositories/ICash.repository';
import { ICashTransactionRepository } from '@repositories/ICashTransaction.repository';
import { PostgresCashRepository } from '@repositories/implementation/postgres/PostgresCash.repository';
import { PostgresCashTransactionRepository } from '@repositories/implementation/postgres/PostgresCashTransaction.repository';

import { ICashService } from './domain/service/ICash.service';
import { ICashTransactionService } from './domain/service/ICashTransaction.service';
import { CashTransactionController } from './infra/http/controller/cash-transaction.controller';
import { CashController } from './infra/http/controller/cash.controller';
import { CashTransactionService } from './service/cash-transaction.service';
import { CashService } from './service/cash.service';

@Module({
  controllers: [CashController, CashTransactionController],
  providers: [
    PrismaService,
    // Cash
    { provide: ICashService, useClass: CashService },
    { provide: ICashRepository, useClass: PostgresCashRepository },
    // Transactions
    { provide: ICashTransactionService, useClass: CashTransactionService },
    {
      provide: ICashTransactionRepository,
      useClass: PostgresCashTransactionRepository,
    },
  ],
})
export class CashModule {}
