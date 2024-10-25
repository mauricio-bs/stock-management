import {
  WinstonModuleOptions,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';

export const loggerOptions: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: process.env.LOG_LEVEL || 'verbose',
  exitOnError: false,
  handleExceptions: true,
  handleRejections: true,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('stock-management', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
  ],
};
