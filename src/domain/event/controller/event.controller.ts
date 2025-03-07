import {
  Controller,
  HttpCode,
  Injectable,
  UseFilters,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from '@common/exception/exception.filter';
import { TypedBody, TypedRoute, TypedParam } from '@nestia/core';
import { BaseResponseDto } from '@common/dto/base.dto';
import {
  saveAkcseEvent,
  getAkcseEvents,
  getAkcseEventById,
  updateAkcseEvent,
  deleteAkcseEvent,
} from '@domain/event/service/event.service';
import {
  EventsCreateDTO,
  EventsResponseDTO,
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
  @UseInterceptors(FileInterceptor('image'))
  async addEvents(
    @TypedBody() eventData: EventsCreateDTO,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<BaseResponseDto<object>> {
    await saveAkcseEvent(eventData, image);
    return new BaseResponseDto({ state: 'success' });
  }

  /**
   * @tag event
   * @summary get events
   */
  @TypedRoute.Get('/')
  @HttpCode(200)
  async getEvents(): Promise<BaseResponseDto<EventsResponseDTO[]>> {
    const res = await getAkcseEvents();
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
  ): Promise<BaseResponseDto<EventsResponseDTO>> {
    const res = await getAkcseEventById(id);
    return new BaseResponseDto(res);
  }

  /**
   * @tag event
   * @summary update events
   */
  @TypedRoute.Put('/:id')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image'))
  async updeateEvent(
    @TypedParam('id') id: number,
    @TypedBody() eventData: EventsUpdateDTO,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<BaseResponseDto<object>> {
    await updateAkcseEvent(id, eventData, image);
    return new BaseResponseDto({ state: 'success' });
  }

  /**
   * @tag event
   * @summary delete events
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
