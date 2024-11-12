import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { CashTransaction } from '@entities/CashTransaction';

import { CreateCashTransactionDTO } from '../dto/transaction/create-cash-transaction.dto';
import { FindAllCashTransactionsDTO } from '../dto/transaction/find-all-cash-transacitons.dto';
import { UpdateCashTransactionDTO } from '../dto/transaction/update-cash-transaction.dto';

export abstract class ICashTransactionService {
  abstract create(
    cash_session_id: string,
    data: CreateCashTransactionDTO,
  ): Promise<CashTransaction>;
  abstract update(
    id: string,
    data: UpdateCashTransactionDTO,
  ): Promise<CashTransaction>;
  abstract delete(id: string): Promise<void>;
  abstract findOneById(id: string): Promise<CashTransaction>;
  abstract findAll(
    cash_session_id: string,
    filters: FindAllCashTransactionsDTO,
  ): Promise<PaginatedResult<CashTransaction>>;
}
