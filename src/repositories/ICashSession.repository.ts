import { ECashStatus } from '@common/enum/ECashStatus';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { CashSession } from '@entities/CashSession';
import { CloseCashSessionDTO } from '@modules/cash/domain/dto/session/close-cash.dto';
import { FindAllCashSessionsDTO } from '@modules/cash/domain/dto/session/find-all-cash-sessions.dto';
import { OpenCashSessionDTO } from '@modules/cash/domain/dto/session/open-cash.dto';

export interface ICashSessionFields {
  status?: ECashStatus;
  opened_by_user_id?: string;
  closed_by_user_id?: string;
}

export abstract class ICashSessionRepository {
  abstract create(
    data: OpenCashSessionDTO & { cash_id: string },
  ): Promise<CashSession>;
  abstract close(id: string, data: CloseCashSessionDTO): Promise<CashSession>;
  abstract findOne(
    cash_id: string,
    filters: ICashSessionFields,
  ): Promise<CashSession>;
  abstract findOneByPk(id: string, company_id?: string): Promise<CashSession>;
  abstract findAll(
    filters: FindAllCashSessionsDTO,
  ): Promise<PaginatedResult<CashSession>>;
}
