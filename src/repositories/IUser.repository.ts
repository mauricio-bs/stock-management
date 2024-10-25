import { User } from '@entities/User';

export abstract class IUserRepository {
  abstract findOneByEmail(email: string): Promise<User>;
}
