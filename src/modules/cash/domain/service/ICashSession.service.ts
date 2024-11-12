import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { CashSession } from '@entities/CashSession';

import { CloseCashSessionDTO } from '../dto/session/close-cash.dto';
import { FindAllCashSessionsDTO } from '../dto/session/find-all-cash-sessions.dto';
import { OpenCashSessionDTO } from '../dto/session/open-cash.dto';

export abstract class ICashSessionService {
  abstract open(
    cash_id: string,
    data: OpenCashSessionDTO,
  ): Promise<CashSession>;
  abstract close(id: string, data: CloseCashSessionDTO): Promise<CashSession>;
  abstract findOne(id: string): Promise<CashSession>;
  abstract findAll(
    filters: FindAllCashSessionsDTO,
  ): Promise<PaginatedResult<CashSession>>;
}
