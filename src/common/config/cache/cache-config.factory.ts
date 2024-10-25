import { type CacheModuleOptions } from '@nestjs/cache-manager';
import { type ConfigService } from '@nestjs/config';
import { ioRedisStore } from '@tirke/node-cache-manager-ioredis';

import { Env } from '../env/validation-env';

export function cacheConfigFactory(
  configService: ConfigService<Env>,
): CacheModuleOptions {
  const url = new URL(configService.get('CACHE_REDIS_URL'));

  return {
    store: ioRedisStore,
    host: url.hostname,
    port: Number(url.port),
    password: url.password,
    db: Number(url.pathname.split('/')[1]),
    ttl: configService.get('CACHE_TTL'),
  };
}
