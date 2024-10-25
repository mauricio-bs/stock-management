import { Module } from '@nestjs/common';

import { PrismaService } from '@common/database/service/prisma.service';
import { ICompanyRepository } from '@repositories/ICompany.repository';
import { PostgresCompanyRepository } from '@repositories/implementation/postgres/PostgresCompany.repository';

import { ICompanyService } from './domain/service/ICompany.service';
import { CompanyController } from './infra/http/controller/company.controller';
import { CompanyService } from './service/company.service';

@Module({
  controllers: [CompanyController],
  providers: [
    PrismaService,
    { provide: ICompanyService, useClass: CompanyService },
    { provide: ICompanyRepository, useClass: PostgresCompanyRepository },
  ],
})
export class CompanyModule {}
