import { Injectable } from '@nestjs/common';
import {
  EventsRepository,
  EventRecord,
} from '@domain/events/repository/events.repository';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async getEvents(): Promise<EventRecord[]> {
    return this.eventsRepository.getEvents();
  }
}
