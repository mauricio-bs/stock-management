import { SetMetadata } from '@nestjs/common';

import { LOG_ACTION_KEY } from '@common/constants/log.constants';
import { LogActions } from '@common/enum/LogActions';

export const LogAction = (action: LogActions) =>
  SetMetadata(LOG_ACTION_KEY, action);
