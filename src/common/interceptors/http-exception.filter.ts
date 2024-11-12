import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse();

      response.status(status).json({
        statusCode: status,
        message: (errorResponse as any)?.message || errorResponse,
        path: request.url,
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
        path: request.url,
      });
    }
  }
}
