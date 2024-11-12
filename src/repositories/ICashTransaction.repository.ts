import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { CashTransaction } from '@entities/CashTransaction';
import { CreateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/create-cash-transaction.dto';
import { FindAllCashTransactionsDTO } from '@modules/cash/domain/dto/transaction/find-all-cash-transacitons.dto';
import { UpdateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/update-cash-transaction.dto';

export abstract class ICashTransactionRepository {
  abstract create(
    data: CreateCashTransactionDTO & {
      cash_session_id: string;
    },
  ): Promise<CashTransaction>;
  abstract update(
    id: string,
    data: UpdateCashTransactionDTO,
  ): Promise<CashTransaction>;
  abstract delete(id: string): Promise<void>;
  abstract findOneByPk(id: string): Promise<CashTransaction>;
  abstract findAll(
    filters: FindAllCashTransactionsDTO & { cash_session_id: string },
  ): Promise<PaginatedResult<CashTransaction>>;
}
