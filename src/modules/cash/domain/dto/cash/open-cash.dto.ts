import { IsDate, IsEmpty, IsNumber, Min } from 'class-validator';

import { ECashStatus } from '@common/enum/ECashStatus';
import { Cash } from '@entities/Cash';

export class OpenCashDTO
  implements
    Omit<
      Cash,
      | 'id'
      | 'created_at'
      | 'updated_at'
      | 'deleted_at'
      | 'closing_at'
      | 'closing_balance'
      | 'oppened_by'
      | 'closed_by_user_id'
      | 'closed_by'
      | 'transatcions'
      | 'withdrawals'
      | 'closures'
    >
{
  @IsDate()
  opening_at: Date;

  @IsNumber()
  @Min(0)
  opening_balance: number;

  @IsEmpty()
  status: ECashStatus = ECashStatus.open;

  // Load from authorization
  @IsEmpty()
  opened_by_user_id: string;

  @IsEmpty()
  company_id: string;
}
