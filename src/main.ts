import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';

import { loggerOptions } from '@common/config/log/logger.config';
import { HttpExceptionFilter } from '@common/interceptors/http-exception.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = WinstonModule.createLogger(loggerOptions);

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger,
    bufferLogs: true,
  });

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
