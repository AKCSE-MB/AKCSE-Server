import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '@common/exception/internal.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof BadRequestException) {
      response.status(400).json({
        statusCode: 400,
        timestamp: new Date().toISOString(),
        path: request.url,
        additionalData: exception.getResponse(),
        originMessage: exception.message,
        input: request.body,
      });
      return;
    }

    if (exception instanceof BaseException) {
      const status = exception.getStatus();

      const detailResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        category: exception.category,
        additionalData: exception.loggedData,
        originMessage: exception.message,
      };

      response.status(status).json(detailResponse);
      return;
    }

    console.error(exception);
    response.status(400).json({
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: request.url,
      originMessage: exception.message,
      input: request.body,
    });
  }
}
