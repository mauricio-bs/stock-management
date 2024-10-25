import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compareHash } from '@common/utils/hashUtils';
import { IUserRepository } from '@repositories/IUser.repository';

import { SignInDTO } from '../domain/dto/signin.dto';
import { IAuthService } from '../domain/service/IAuth.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(data: SignInDTO): Promise<string> {
    const user = await this.repository.findOneByEmail(data.email);
    if (
      !user ||
      !user.is_active ||
      !(await compareHash(data.password, user.password))
    )
      throw new BadRequestException('Email or password does not match');

    return this.jwtService.sign(
      { company_id: user.company_id },
      { subject: user.id },
    );
  }
}
