import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { globalHttpErrorHandler } from '@common/utils/error/global-error-handler';
import { SignInDTO } from '@modules/auth/domain/dto/signin.dto';
import { IAuthService } from '@modules/auth/domain/service/IAuth.service';

@Controller()
export class AuthController {
  constructor(private readonly service: IAuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async signin(@Body() data: SignInDTO): Promise<string> {
    try {
      return await this.service.signin(data);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }
}
