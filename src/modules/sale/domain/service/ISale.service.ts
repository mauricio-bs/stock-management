import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Sale } from '@entities/Sale';

import { CreateSaleDTO } from '../dto/create-sale.dto';
import { FindAllSalesDTO } from '../dto/find-all-sales.dto';
import { UpdateSaleDTO } from '../dto/update-sale.dto';

export abstract class ISaleService {
  abstract create(data: CreateSaleDTO): Promise<Sale>;
  abstract update(id: string, data: UpdateSaleDTO): Promise<Sale>;
  abstract delete(id: string, company_id: string): Promise<void>;
  abstract findOneById(id: string, company_id: string): Promise<Sale>;
  abstract findAll(filters: FindAllSalesDTO): Promise<PaginatedResult<Sale>>;
}
