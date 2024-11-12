import { randomUUID } from 'node:crypto';

import { ETransactionType } from '@common/enum/ETransactionType';

import { Sale } from './Sale';
import { User } from './User';

export class CashTransaction {
  public readonly id?: string;
  public type: ETransactionType;
  public description?: string;
  public amount: number;
  public transaction_date: Date = new Date();
  public cash_session_id: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // Relations
  public sale_id?: string;
  public sale?: Sale;
  public user_id?: string;
  public user?: User;

  constructor(props: Omit<CashTransaction, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
