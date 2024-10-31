import { LogActions } from '@common/enum/LogActions';

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
