import {
  EventsRepository,
  EventRecord,
} from '@domain/events/repository/events.repository';

export interface IEventsService {
  getEvents(): Promise<EventRecord[]>;
}
export class EventsService implements IEventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async getEvents(): Promise<EventRecord[]> {
    return this.eventsRepository.getEvents();
  }
}
