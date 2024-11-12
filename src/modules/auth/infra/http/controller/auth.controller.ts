import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { LogActions } from '@common/enum/LogActions';
import { SignInDTO } from '@modules/auth/domain/dto/signin.dto';
import { IAuthService } from '@modules/auth/domain/service/IAuth.service';

@Controller()
export class AuthController {
  constructor(private readonly service: IAuthService) {}

  @LogAction(LogActions.SIGNIN)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() data: SignInDTO): Promise<string> {
    return await this.service.signin(data);
  }
}
