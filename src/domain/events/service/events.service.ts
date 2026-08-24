import {
  getEvents as getEventRecords,
  EventRecord,
} from '@domain/events/repository/events.repository';

export async function getEvents(): Promise<EventRecord[]> {
  return getEventRecords();
}
