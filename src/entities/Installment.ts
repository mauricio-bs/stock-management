import { randomUUID } from 'node:crypto';

import { EInstallmentStatus } from '@common/enum/EInstallmentStatus';

export class Installment {
  public readonly id?: string;
  public installment_number: number = 1;
  public status: EInstallmentStatus = EInstallmentStatus.pending;
  public amount: number;
  public tax_value?: number;
  public received_at: Date = new Date();
  public payment_id: string;
  public created_at?: Date = new Date();
  public updated_at?: Date = new Date();
  public deleted_at?: Date;

  constructor(props: Omit<Installment, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = randomUUID();
  }
}
