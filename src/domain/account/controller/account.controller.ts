import {
  Controller,
  HttpCode,
  Injectable,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';
import { HttpExceptionFilter } from '@common/exception/exception.filter';
import { TypedBody, TypedRoute } from '@nestia/core';
import { BaseResponseDto } from '@common/dto/base.dto';
import { CreateTokenRequest, TokenDTO } from '@domain/account/dto/account.dto';
import { createToken } from '@domain/account/service/account.service';

@Controller('v1/account')
@UseFilters(new HttpExceptionFilter())
@Injectable()
export class AccountController {
  /**
   * @tag account
   * @summary create token for user
   */
  @TypedRoute.Post('/tokens')
  @HttpCode(200)
  async createToken(
    @TypedBody() dto: CreateTokenRequest,
  ): Promise<BaseResponseDto<TokenDTO>> {
    const token = await createToken(dto);
    return new BaseResponseDto({ ...token });
  }
}
