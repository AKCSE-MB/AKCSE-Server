import {
  Controller,
  HttpCode,
  Injectable,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from '@common/exception/exception.filter';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { BaseResponseDto } from '@common/dto/base.dto';
import {
  createEvent,
  editEvent,
  getAkcseEventById,
  getAkcseEvents,
  getPastEvents,
  removeEvent,
} from '@domain/event/service/event.service';
import {
  EventCreateRequestDTO,
  EventResponseDTO,
  EventUpdateRequestDTO,
  GetEventsOutput,
} from '@domain/event/dto/event.dto';
import { AuthGuard } from '@common/auth/auth.guard';

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
  async getPastEvents(): Promise<BaseResponseDto<EventResponseDTO[]>> {
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
  ): Promise<BaseResponseDto<EventResponseDTO>> {
    const res = await getAkcseEventById(id);
    return new BaseResponseDto(res);
  }

  /**
   * @tag event
   * @summary create a new event
   * @security bearer
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Post()
  @HttpCode(200)
  async addEvent(
    @TypedBody() eventData: EventCreateRequestDTO,
  ): Promise<BaseResponseDto<object>> {
    await createEvent(eventData);
    return new BaseResponseDto({ state: 'success' });
  }

  /**
   * @tag event
   * @summary update an existing event's details
   * @security bearer
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Put('/:id')
  @HttpCode(200)
  async updateEvent(
    @TypedParam('id') id: number,
    @TypedBody() eventData: EventUpdateRequestDTO,
  ): Promise<BaseResponseDto<object>> {
    await editEvent(id, eventData);
    return new BaseResponseDto({ state: 'success' });
  }

  /**
   * @tag event
   * @summary Delete an event
   * @security bearer
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Delete('/:id')
  @HttpCode(200)
  async deleteEvent(
    @TypedParam('id') id: number,
  ): Promise<BaseResponseDto<object>> {
    await removeEvent(id);
    return new BaseResponseDto({ state: 'success' });
  }
}
