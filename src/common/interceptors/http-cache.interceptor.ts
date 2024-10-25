import { CACHE_KEY_METADATA, CacheInterceptor } from '@nestjs/cache-manager';
import { type ExecutionContext, Injectable } from '@nestjs/common';
import { type RedisCache } from '@tirke/node-cache-manager-ioredis';
import { type Request } from 'express';

import { IUserInfo } from '@common/interfaces/IUserInfo';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  protected cacheManager: RedisCache;

  protected trackBy(context: ExecutionContext): string {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
    let cacheMetadata = this.reflector.getAllAndOverride(CACHE_KEY_METADATA, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!isHttpApp) return cacheMetadata;

    if (!this.isRequestCacheable(context)) return undefined;

    cacheMetadata = cacheMetadata?.concat(':') ?? '';

    const request = context.switchToHttp().getRequest<Request>();

    const pathname = httpAdapter.getRequestUrl(request);
    const { user, method } = request;

    return `${this.getUserKey(user)}:${cacheMetadata}${pathname}:${method}`;
  }

  public getUserKey(user: IUserInfo) {
    if (!user) return 'users:anonymous';

    return `users:${user.id}:${user.company_id}`;
  }
}
