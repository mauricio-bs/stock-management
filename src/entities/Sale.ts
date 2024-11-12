import { randomUUID } from 'node:crypto';

import { ESaleStatus } from '@common/enum/ESaleStatus';

import { Payment } from './Payment';
import { SaleItem } from './SaleItem';
import { User } from './User';

export class Sale {
  public readonly id?: string;
  public status: ESaleStatus = ESaleStatus.pending;
  public code: number;
  public total: number;
  public total_discount?: number;
  public company_id: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public sale_items?: SaleItem[];
  public user_id: string;
  public user?: User;
  public payments?: Payment[];

  constructor(props: Omit<Sale, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
