import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Cash } from '@entities/Cash';

import { CreateCashDTO } from '../dto/cash/create-cash.dto';
import { FindAllCashiesDTO } from '../dto/cash/find-all-cashies.dto';
import { UpdateCashDTO } from '../dto/session/update-cash.dto';

export abstract class ICashService {
  abstract create(data: CreateCashDTO): Promise<Cash>;
  abstract update(id: string, data: UpdateCashDTO): Promise<Cash>;
  abstract delete(id: string, company_id: string): Promise<void>;
  abstract findOneById(id: string, company_id: string): Promise<Cash>;
  abstract findAll(filters: FindAllCashiesDTO): Promise<PaginatedResult<Cash>>;
}
