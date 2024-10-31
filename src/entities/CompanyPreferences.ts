import { randomUUID } from 'node:crypto';

import { EPaymentForms } from '@common/enum/EPaymentForm';

export class CompanyPreferences {
  public readonly id?: string;
  public default_credit_tax?: number;
  public default_debit_tax?: number;
  public default_payment_form?: EPaymentForms;
  public company_id: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;

  constructor(props: Omit<CompanyPreferences, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
