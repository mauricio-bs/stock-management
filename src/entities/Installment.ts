import { randomUUID } from 'node:crypto';

export class Installment {
  public readonly id?: string;
  public installment_number: number = 1;
  public amount: number;
  public tax_value?: number;
  public payment_id: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;

  constructor(props: Omit<Installment, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
