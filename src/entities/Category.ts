import { randomUUID } from 'node:crypto';

export class Category {
  public readonly id?: string;
  public name: string;
  public is_active: boolean = true;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public company_id: string;

  constructor(props: Omit<Category, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
