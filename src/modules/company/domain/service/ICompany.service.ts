import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Company } from '@entities/Company';

import { CreateCompanyDTO } from '../dto/create-company.dto';
import { FindAllCompaniesDTO } from '../dto/find-all-companies.dto';
import { UpdateCompanyDTO } from '../dto/update-company.dto';

export abstract class ICompanyService {
  abstract create(data: CreateCompanyDTO): Promise<Company>;
  abstract update(id: string, data: UpdateCompanyDTO): Promise<Company>;
  abstract delete(id: string): Promise<void>;
  abstract findOneById(id: string): Promise<Company>;
  abstract findAll(
    filters: FindAllCompaniesDTO,
  ): Promise<PaginatedResult<Company>>;
}
