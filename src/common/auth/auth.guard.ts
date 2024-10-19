import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import { Request } from 'express';
import { findAccessToken } from '@domain/account/service/account.service';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { EnvironmentEnum } from '@root/src/env.validation';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigurationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = await this.validateTokenOnEnv(request);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getTokenData().accessTokenSecret,
      });

      request['user'] = payload;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException(
        'not verified token, maybe expired or invalid or not proper created',
      );
    }
    return true;
  }

  private async validateTokenOnEnv(request: any) {
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        'no token in request, check Bearer header',
      );
    }

    if (process.env.ENV == EnvironmentEnum.TEST) {
      return token;
    }

    await pipe(
      token,
      findAccessToken,
      TE.mapError((error) => {
        throw new UnauthorizedException(error.message);
      }),
    )();

    return token;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
