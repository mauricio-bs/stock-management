import { randomUUID } from 'node:crypto';

import { Category } from './Category';
import { Product } from './Product';
import { Sale } from './Sale';
import { User } from './User';

export class Company {
  public readonly id?: string;
  public name: string;
  public cnpj: string;
  public is_active: boolean;
  public phone?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public products?: Product[];
  public users?: User[];
  public categories?: Category[];
  public sales?: Sale[];

  constructor(props: Omit<Company, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
