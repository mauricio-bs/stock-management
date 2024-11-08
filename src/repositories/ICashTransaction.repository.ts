import { CashTransaction } from '@entities/CashTransaction';
import { CreateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/create-cash-transaction.dto';
import { UpdateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/update-cash-transaction.dto';

export abstract class ICashTransactionRepository {
  abstract create(data: CreateCashTransactionDTO): Promise<CashTransaction>;
  abstract update(
    id: string,
    data: UpdateCashTransactionDTO,
  ): Promise<CashTransaction>;
  abstract delete(id: string): Promise<void>;
  abstract findOneByPk(id: string): Promise<CashTransaction>;
}
