import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { catchError, Observable, tap } from 'rxjs';
import { Logger } from 'winston';

import { LOG_ACTION_KEY } from '@common/constants/log.constants';
import { LogActions } from '@common/enum/LogActions';
import { Log } from '@common/interfaces/ILog';

import { IUserInfo } from '../interfaces/IUserInfo';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logAction = this.getLogAction(context) || LogActions.UNKNOWN;

    const extraInfo = this.extractExtraInfo(context);
    const userInfo = this.extractUserInfo(context);

    const handleResult = (error?: Log['error']) => {
      const log: Log = {
        action: logAction,
        extra: extraInfo,
        ...userInfo,
      };

      if (error) log.error = error;

      const req = context.switchToHttp().getRequest<Request>();

      const formatedLog = {
        message: `${error?.message ?? error?.code ?? 'success'}`,
        context: log.action,
        method: req.method,
        url: req.url,
        class: {
          name: context.getClass().name,
          method: context.getHandler().name,
        },
        user_agent: req.headers?.['user-agent'] || undefined,
        channel: process.env.NODE_ENV || 'local',
        from: req.ip,
      };

      if (error?.code >= 400) return this.logger.error(formatedLog);

      this.logger.info(formatedLog);
    };

    return next.handle().pipe(
      tap(() => handleResult()),
      catchError((error: HttpException | Error) => {
        if (error instanceof HttpException) {
          handleResult({ message: error.message, code: error.getStatus() });
        } else {
          handleResult({ message: error.message, code: 500 });
        }
        throw error;
      }),
    );
  }

  public getLogAction(context: ExecutionContext): LogActions | null {
    const logAction = this.reflector.getAllAndOverride<LogActions>(
      LOG_ACTION_KEY,
      [context.getClass(), context.getHandler()],
    );

    return logAction;
  }

  public extractExtraInfo(context: ExecutionContext): Record<string, unknown> {
    const request = context.switchToHttp().getRequest<Request>();

    return {
      query: request.query,
      ip: request.ip,
      userAgent: request.headers['user-agent'],
    };
  }

  public extractUserInfo(context: ExecutionContext): IUserInfo {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.user) return;

    return request.user;
  }
}
