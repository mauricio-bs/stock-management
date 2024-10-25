import { Injectable } from '@nestjs/common';

import { PrismaService } from '@common/database/service/prisma.service';
import { User } from '@entities/User';
import { IUserRepository } from '@repositories/IUser.repository';

@Injectable()
export class PostgresUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
