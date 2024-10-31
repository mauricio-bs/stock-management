import { Module } from '@nestjs/common';

import { PrismaService } from '@common/database/service/prisma.service';
import { PostgresUserRepository } from '@repositories/implementation/postgres/PostgresUser.repository';
import { IUserRepository } from '@repositories/IUser.repository';

import { IUserService } from './domain/service/IUser.service';
import { UserController } from './infra/http/controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    { provide: IUserService, useClass: UserService },
    { provide: IUserRepository, useClass: PostgresUserRepository },
  ],
})
export class UserModule {}
