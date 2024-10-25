import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Sale } from '@entities/Sale';
import { CreateSaleDTO } from '@modules/sale/domain/dto/create-sale.dto';
import { FindAllSalesDTO } from '@modules/sale/domain/dto/find-all-sales.dto';
import { UpdateSaleDTO } from '@modules/sale/domain/dto/update-sale.dto';

export abstract class ISaleRepository {
  abstract create(data: CreateSaleDTO): Promise<Sale>;
  abstract update(id: string, data: UpdateSaleDTO): Promise<Sale>;
  abstract delete(id: string, company_id: string): Promise<void>;
  abstract findOneByPk(id: string, company_id?: string): Promise<Sale>;
  abstract findAll(filters: FindAllSalesDTO): Promise<PaginatedResult<Sale>>;
}
