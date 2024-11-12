import { randomUUID } from 'node:crypto';

import { CashSession } from './CashSession';

export class Cash {
  public readonly id?: string;
  public name: string;
  public location?: string;
  public is_active: boolean = true;
  public company_id: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public cash_sessions?: CashSession[];

  constructor(props: Omit<Cash, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
