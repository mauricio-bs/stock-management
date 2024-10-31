import { randomUUID } from 'node:crypto';

import { Exclude } from 'class-transformer';

export class User {
  public readonly id?: string;
  public name: string;
  public email: string;
  @Exclude()
  public password: string;

  public is_active: boolean;
  public document?: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public company_id: string;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
