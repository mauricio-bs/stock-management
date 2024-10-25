import { randomUUID } from 'node:crypto';

import { ESaleStatus } from '@common/enum/ESaleStatus';

import { SaleItem } from './SaleItem';

export class Sale {
  public readonly id?: string;
  public status: ESaleStatus = ESaleStatus.pending;
  public total: number;
  public total_discount?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public company_id: string;
  public sale_items?: SaleItem[];

  constructor(props: Omit<Sale, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
