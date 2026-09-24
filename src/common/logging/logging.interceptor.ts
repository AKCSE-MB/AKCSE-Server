import { randomUUID } from 'node:crypto';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { maskIp } from '@src/common/logging/mask-ip';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private requestLogger = new Logger('HTTP_REQUEST');
  private responseLogger = new Logger('HTTP_RESPONSE');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const executionId = randomUUID();
    const startedAt = Date.now();
    this.logRequest(context, executionId);

    return next.handle().pipe(
      catchError((error: any) => {
        this.logResponse(context, executionId, startedAt, error);
        throw error;
      }),
      tap((data) => {
        this.logResponse(context, executionId, startedAt, data);
      }),
    );
  }

  private logResponse(
    context: ExecutionContext,
    executionId: string,
    startedAt: number,
    data: Record<string, unknown>,
  ) {
    const response = context.switchToHttp().getResponse<Response>();
    const loggingParams: Record<string, unknown> = {
      message: 'response',
      executionId,
      statusCode: response.statusCode,
      durationMs: Date.now() - startedAt,
    };
    if (data instanceof Error) {
      loggingParams.statusCode =
        data instanceof HttpException ? data.getStatus() : 500;
      loggingParams.error = { message: data.message };
    }

    if ((loggingParams.statusCode as number) >= 500) {
      this.responseLogger.error(
        loggingParams,
        data instanceof Error ? data.stack : undefined,
      );
    } else {
      this.responseLogger.log(loggingParams);
    }
  }

  private logRequest(context: ExecutionContext, executionId: string) {
    const request = context.switchToHttp().getRequest<Request>();
    this.requestLogger.log({
      message: 'request',
      executionId,
      path: request.path,
      method: request.method,
      ip: maskIp(this.getClientIp(request)),
      userAgent: request.headers['user-agent'],
    });
  }

  private getClientIp(request: Request) {
    const realIp = request.headers['x-real-ip'];
    if (typeof realIp === 'string') {
      return realIp;
    }
    return request.ip;
  }
}
