import { CashTransaction } from '@entities/CashTransaction';

import { CreateCashTransactionDTO } from '../dto/transaction/create-cash-transaction.dto';
import { UpdateCashTransactionDTO } from '../dto/transaction/update-cash-transaction.dto';

export abstract class ICashTransactionService {
  abstract create(data: CreateCashTransactionDTO): Promise<CashTransaction>;
  abstract update(
    id: string,
    data: UpdateCashTransactionDTO,
  ): Promise<CashTransaction>;
  abstract delete(id: string): Promise<void>;
  abstract findOneById(id: string): Promise<CashTransaction>;
}
