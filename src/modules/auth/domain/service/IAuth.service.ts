import { SignInDTO } from '../dto/signin.dto';

export abstract class IAuthService {
  abstract signin(data: SignInDTO): Promise<string>;
}
