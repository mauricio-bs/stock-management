import {
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function prismaErrorHandler(
  error: PrismaClientKnownRequestError,
  context?: string,
): HttpException {
  const errors = {
    P2025: () => {
      // Related record not found
      if (String(error.meta?.cause).includes('record(s)')) {
        const entity = String(error.meta?.cause)
          .match(/['"]?(\w+)['"]?(?=\s*record\(s\))/i)[0]
          .replace(/[^a-zA-Z0-9]/g, '');

        throw new NotFoundException(`${entity} not found`);
      } else {
        // Record not found
        throw new NotFoundException(
          `${error.meta?.modelName as string} not found`,
        );
      }
    },
    P2003: () => {
      const entity = String(error.meta?.field_name).split('_')[0];
      throw new ConflictException(`${entity} not found`);
    },
    default: () => {
      throw new InternalServerErrorException();
    },
  };

  const throwError = errors[error.code] || errors.default;

  return throwError();
}
