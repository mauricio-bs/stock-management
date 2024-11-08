import { ECashStatus } from '@common/enum/ECashStatus';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Cash } from '@entities/Cash';
import { FindAllCashesDTO } from '@modules/cash/domain/dto/cash/find-all-cashies.dto';
import { OpenCashDTO } from '@modules/cash/domain/dto/cash/open-cash.dto';
import { CloseCashDTO } from '@modules/cash/domain/dto/closure/close-cash.dto';

export interface ICashFields {
  company_id: string;
  status?: ECashStatus;
  opened_by_user_id?: string;
  closed_by_user_id?: string;
}

export abstract class ICashRepository {
  abstract create(data: OpenCashDTO): Promise<Cash>;
  abstract update(
    id: string,
    data: Partial<
      Omit<
        Cash,
        | 'id'
        | 'created_at'
        | 'updated_at'
        | 'deleted_at'
        | 'withdrawals'
        | 'closures'
        | 'transactions'
        | 'oppened_by'
        | 'closed_by'
      >
    >,
  ): Promise<Cash>;
  abstract close(id: string, data: CloseCashDTO): Promise<Cash>;
  abstract findOne(filters: ICashFields): Promise<Cash>;
  abstract findOneByPk(id: string, company_id: string): Promise<Cash>;
  abstract findAll(filters: FindAllCashesDTO): Promise<PaginatedResult<Cash>>;
}
