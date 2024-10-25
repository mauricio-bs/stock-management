import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { ConfigurationsModule } from '@common/config/configurations.module';
import { DatabaseModule } from '@common/database/database.module';
import { HttpCacheInterceptor } from '@common/interceptors/http-cache.interceptor';

import { IndexModule } from './modules/index.module';

@Module({
  imports: [ConfigurationsModule, DatabaseModule, IndexModule],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_INTERCEPTOR, useClass: HttpCacheInterceptor },
  ],
})
export class AppModule {}
