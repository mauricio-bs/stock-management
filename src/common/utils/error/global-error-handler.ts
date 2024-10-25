import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function globalHttpErrorHandler(error: any): HttpException {
  if (error?.getStatus())
    throw new HttpException(error.response || error, error.getStatus());

  throw new InternalServerErrorException('Internal server error');
}
