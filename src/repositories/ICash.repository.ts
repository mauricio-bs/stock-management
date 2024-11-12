import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Cash } from '@entities/Cash';
import { CreateCashDTO } from '@modules/cash/domain/dto/cash/create-cash.dto';
import { FindAllCashiesDTO } from '@modules/cash/domain/dto/cash/find-all-cashies.dto';
import { UpdateCashDTO } from '@modules/cash/domain/dto/cash/update-cash.dto';

export abstract class ICashRepository {
  abstract create(data: CreateCashDTO): Promise<Cash>;
  abstract update(id: string, data: UpdateCashDTO): Promise<Cash>;
  abstract delete(id: string, company_id: string): Promise<void>;

  abstract findOneByPk(id: string, company_id: string): Promise<Cash>;
  abstract findAll(filters: FindAllCashiesDTO): Promise<PaginatedResult<Cash>>;
}
