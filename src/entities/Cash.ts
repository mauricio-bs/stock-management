import { randomUUID } from 'node:crypto';

import { ECashStatus } from '@common/enum/ECashStatus';

import { CashClosing } from './CashClosing';
import { CashTransaction } from './CashTransaction';
import { CashWidhdrawal } from './CashWidhdrawal';
import { User } from './User';

export class Cash {
  public readonly id?: string;
  public opening_at: Date;
  public closing_at?: Date;
  public opening_balance: number;
  public closing_balance?: number;
  public status: ECashStatus;
  public company_id: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public opened_by_user_id: string;
  public oppened_by?: User;
  public closed_by_user_id?: string;
  public closed_by?: User;
  public transactions?: CashTransaction[];
  public withdrawals?: CashWidhdrawal[];
  public closures?: CashClosing;

  constructor(props: Omit<Cash, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
