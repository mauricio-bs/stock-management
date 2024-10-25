import { randomUUID } from 'node:crypto';

import { Product } from './Product';

export class SaleItem {
  public readonly id?: string;
  public quantity: number;
  public total_value: number;
  public unit_value: number;
  public total_discount?: number;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public sale_id: string;
  public product_id: string;
  public product?: Product;

  constructor(props: Omit<SaleItem, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
