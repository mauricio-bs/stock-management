import { IsDate, IsEmpty, IsNumber, Min } from 'class-validator';

import { ECashStatus } from '@common/enum/ECashStatus';
import { CashSession } from '@entities/CashSession';

export class OpenCashSessionDTO
  implements
    Omit<
      CashSession,
      | 'id'
      | 'cash_id'
      | 'created_at'
      | 'updated_at'
      | 'deleted_at'
      | 'closing_at'
      | 'closing_balance'
      | 'oppened_by'
      | 'closed_by_user_id'
      | 'closed_by'
      | 'transactions'
      | 'widhdrawals'
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
