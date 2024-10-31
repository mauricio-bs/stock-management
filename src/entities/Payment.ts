import { randomUUID } from 'node:crypto';

import { EPaymentForms } from '@common/enum/EPaymentForm';

import { Installment } from './Installment';

export class Payment {
  public readonly id?: string;
  public payment_form: EPaymentForms;
  public total_value: number;
  public installments_quantity: number = 1;
  public taxes_per_installment: number = 0;
  public company_id: string;
  public sale_id: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;
  // relations
  public installments?: Installment[];

  constructor(props: Omit<Payment, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
