import { randomUUID } from 'node:crypto';

import { ETransactionType } from '@common/enum/ETransactionType';

export class CashTransaction {
  public readonly id?: string;
  public type: ETransactionType;
  public description?: string;
  public amount: number;
  public cash_id: string;
  public sale_id?: string;
  public user_id?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;

  constructor(props: Omit<CashTransaction, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
