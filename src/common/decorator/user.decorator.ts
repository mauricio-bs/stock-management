import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const UserInfo = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;
    return field ? user?.[field] : user;
  },
);
