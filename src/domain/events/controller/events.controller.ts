import { Controller, HttpCode } from '@nestjs/common';
import { TypedRoute } from '@nestia/core';
import { EventsService } from '@domain/events/service/events.service';
import { BaseResponseDto } from '@common/dto/base.dto';
import { EventResponseDto } from '@domain/events/dto/events.dto';

@Controller('v1/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  /**
   * List every AKCSE event, ordered by start date ascending.
   *
   * @tag events
   * @summary get all events
   */
  @TypedRoute.Get('/')
  @HttpCode(200)
  async getEvents(): Promise<BaseResponseDto<EventResponseDto[]>> {
    const events = await this.eventsService.getEvents();
    return new BaseResponseDto(events);
  }
}
