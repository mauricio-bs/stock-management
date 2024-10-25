import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { WinstonModule } from 'nest-winston';

import { LoggerInterceptor } from '@common/interceptors/logger.interceptor';

import { cacheConfigFactory } from './cache/cache-config.factory';
import { Env, validateEnv } from './env/validation-env';
import { loggerOptions } from './log/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    WinstonModule.forRoot(loggerOptions),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => [
        {
          ttl: configService.get('RATELIMIT_TTL'),
          limit: configService.get('RATELIMIT_LIMIT'),
        },
      ],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: cacheConfigFactory,
    }),
    PrometheusModule.register({
      defaultMetrics: { enabled: true },
      path: '/api/metrics',
    }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggerInterceptor }],
})
export class ConfigurationsModule {}
