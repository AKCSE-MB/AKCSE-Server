import { Controller, HttpCode, Injectable, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/exception/exception.filter';
import { TypedParam, TypedRoute } from '@nestia/core';
import { BaseResponseDto } from '@common/dto/base.dto';
import {
  getAkcseEventById,
  getAkcseEvents,
  getPastEvents,
} from '@domain/event/service/event.service';
import { EventDetails, GetEventsOutput } from '@domain/event/dto/event.dto';

@Controller('v1/event')
@UseFilters(new HttpExceptionFilter())
@Injectable()
export class EventController {
  /**
   * @tag event
   * @summary get events
   */
  @TypedRoute.Get()
  @HttpCode(200)
  async getEvents(): Promise<BaseResponseDto<GetEventsOutput>> {
    const res = await getAkcseEvents();
    return new BaseResponseDto(res);
  }

  /**
   * @tag event
   * @summary get past events
   */
  @TypedRoute.Get('/past')
  @HttpCode(200)
  async getPastEvents(): Promise<BaseResponseDto<EventDetails[]>> {
    const res = await getPastEvents();
    return new BaseResponseDto(res);
  }

  /**
   * @tag event
   * @summary get an event with matching ID
   */
  @TypedRoute.Get('/:id')
  @HttpCode(200)
  async getEventById(
    @TypedParam('id') id: number,
  ): Promise<BaseResponseDto<EventDetails>> {
    const res = await getAkcseEventById(id);
    return new BaseResponseDto(res);
  }
}
