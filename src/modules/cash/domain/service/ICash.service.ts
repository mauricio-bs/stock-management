import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Cash } from '@entities/Cash';

import { FindAllCashesDTO } from '../dto/cash/find-all-cashies.dto';
import { OpenCashDTO } from '../dto/cash/open-cash.dto';
import { CloseCashDTO } from '../dto/closure/close-cash.dto';

export abstract class ICashService {
  abstract open(data: OpenCashDTO): Promise<Cash>;
  abstract close(id: string, data: CloseCashDTO): Promise<Cash>;
  abstract findOneById(id: string, company_id: string): Promise<Cash>;
  abstract findAll(filters: FindAllCashesDTO): Promise<PaginatedResult<Cash>>;
}
