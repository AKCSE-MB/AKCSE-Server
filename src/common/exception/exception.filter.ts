import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  UnauthorizedException,
  BaseException,
  CallerWrongUsageException,
} from '@common/exception/internal.exception';
import * as Sentry from '@sentry/nestjs';

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

      if (!(exception instanceof CallerWrongUsageException)) {
        Sentry.captureException(exception, { extra: detailResponse });
      }

      response.status(status).json(detailResponse);
      return;
    }

    if (exception instanceof UnauthorizedException) {
      const status = exception.getStatus();

      const detailResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        originMessage: exception.message,
        input: request.body,
      };

      response.status(status).json(detailResponse);
      return;
    }

    console.error(exception);
    Sentry.captureException(exception, { extra: request.body });

    response.status(400).json({
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: request.url,
      originMessage: exception.message,
      input: request.body,
    });
  }
}
