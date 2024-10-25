import { LogActions } from '@common/enum/log-actions';

export interface Log<Extra = any> {
  action: LogActions;
  extra: Extra;
  error?: {
    message: string;
    code: number;
  };
  user_id?: string;
  company_id?: string;
}
