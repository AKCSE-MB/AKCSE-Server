import {
  Controller,
  HttpCode,
  Injectable,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from '@common/exception/exception.filter';
import { TypedBody, TypedRoute, TypedParam } from '@nestia/core';
import { BaseResponseDto } from '@common/dto/base.dto';
import {
  saveAkcseEvent,
  getAkcseEvents,
  updateAkcseEvent,
  deleteAkcseEvent,
} from '@domain/event/service/event.service';
import {
  EventsCreateDTO,
  EventsResponstDTO,
  EventsUpdateDTO,
} from '@domain/event/dto/event.dto';

@Controller('v1/event')
@UseFilters(new HttpExceptionFilter())
@Injectable()
export class EventController {
  /**
   * @tag event
   * @summary save events
   */
  @TypedRoute.Post('/')
  @HttpCode(200)
  async addEvents(
    @TypedBody() eventData: EventsCreateDTO,
  ): Promise<BaseResponseDto<object>> {
    await saveAkcseEvent(eventData);
    return new BaseResponseDto({ state: 'success' });
  }

  /**
   * @tag event
   * @summary get events
   */
  @TypedRoute.Get('/')
  @HttpCode(200)
  async getEvents(): Promise<BaseResponseDto<EventsResponstDTO[]>> {
    const res = await getAkcseEvents();
    return new BaseResponseDto(res);
  }

  /**
   * @tag event
   * @summary get events
   */
  @TypedRoute.Put('/:id')
  @HttpCode(200)
  async updeateEvent(
    @TypedParam('id') id: number,
    @TypedBody() eventData: EventsUpdateDTO,
  ): Promise<BaseResponseDto<object>> {
    await updateAkcseEvent(id, eventData);
    return new BaseResponseDto({ state: 'success' });
  }

  /**
   * @tag event
   * @summary get events
   */
  @TypedRoute.Delete('/:id')
  @HttpCode(200)
  async deleteEvent(
    @TypedParam('id') id: number,
  ): Promise<BaseResponseDto<object>> {
    await deleteAkcseEvent(id);
    return new BaseResponseDto({ state: 'success' });
  }
}
