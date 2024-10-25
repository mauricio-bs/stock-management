import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { Env } from '@common/config/env/validation-env';
import { PrismaService } from '@common/database/service/prisma.service';
import { PostgresUserRepository } from '@repositories/implementation/postgres/PostgresUser.repository';
import { IUserRepository } from '@repositories/IUser.repository';

import { IAuthService } from './domain/service/IAuth.service';
import { JwtStrategy } from './domain/strategies/jwt.strategy';
import { AuthController } from './infra/http/controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    JwtStrategy,
    { provide: IAuthService, useClass: AuthService },
    { provide: IUserRepository, useClass: PostgresUserRepository },
  ],
  exports: [JwtStrategy, { provide: IAuthService, useClass: AuthService }],
})
export class AuthModule {}
