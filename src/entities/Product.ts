import { randomUUID } from 'node:crypto';

import { EUnitMeasure } from '@common/enum/EUnitMeasure';

import { Category } from './Category';

export class Product {
  public readonly id?: string;
  public name: string;
  public is_active?: boolean = true;
  public quantity: number;
  public price: number;
  public cost_value: number;
  public profit_margin: number;
  public measure_unit: EUnitMeasure;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public category_id: string;
  public category?: Category;
  public company_id: string;

  constructor(props: Omit<Product, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
