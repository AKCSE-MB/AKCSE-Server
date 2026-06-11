import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly masterToken = 'master-akcse';
  constructor(private configService: ConfigurationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (this.isMasterToken(request)) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        'no token in request, check Bearer header',
      );
    }

    request['user'] = { token };
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isMasterToken(request: Request) {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    if (!token) {
      return false;
    }

    return token.includes(this.masterToken);
  }
}
