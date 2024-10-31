import { randomUUID } from 'node:crypto';

import { User } from './User';

export class CashClosing {
  public readonly id?: string;
  public total_income: number;
  public total_expense: number;
  public difference?: number;
  public notes?: string;
  public closing_date: Date;
  public cash_id: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public user_id: string;
  public user?: User;

  constructor(props: Omit<CashClosing, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
