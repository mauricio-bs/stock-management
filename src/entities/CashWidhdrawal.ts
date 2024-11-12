import { randomUUID } from 'node:crypto';

import { User } from './User';

export class CashWidhdrawal {
  public readonly id?: string;
  public amount: number;
  public reason: string;
  public cash_session_id: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public user_id: string;
  public user?: User;

  constructor(props: Omit<CashWidhdrawal, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
