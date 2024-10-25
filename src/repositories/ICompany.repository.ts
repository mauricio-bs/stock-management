import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Company } from '@entities/Company';
import { CreateCompanyDTO } from '@modules/company/domain/dto/create-company.dto';
import { FindAllCompaniesDTO } from '@modules/company/domain/dto/find-all-companies.dto';
import { UpdateCompanyDTO } from '@modules/company/domain/dto/update-company.dto';

export abstract class ICompanyRepository {
  abstract create(data: CreateCompanyDTO): Promise<Company>;
  abstract update(id: string, data: UpdateCompanyDTO): Promise<Company>;
  abstract delete(id: string): Promise<void>;
  abstract findOneByPk(id: string): Promise<Company>;
  abstract findAll(
    filters: FindAllCompaniesDTO,
  ): Promise<PaginatedResult<Company>>;
}
