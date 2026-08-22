import { Controller, HttpCode } from '@nestjs/common';
import { TypedRoute } from '@nestia/core';
import { getExecutives } from '@domain/executives/service/executives.service';
import { BaseResponseDto } from '@common/dto/base.dto';
import { ExecutiveResponseDto } from '@domain/executives/dto/executives.dto';

@Controller('v1/executives')
export class ExecutivesController {
  /**
   * List every AKCSE executive member.
   *
   * @tag executives
   * @summary get all executive members
   */
  @TypedRoute.Get('/')
  @HttpCode(200)
  async getExecutives(): Promise<BaseResponseDto<ExecutiveResponseDto[]>> {
    const executives = await getExecutives();
    return new BaseResponseDto(executives);
  }
}
