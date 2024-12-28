import { getEvents } from '@domain/event/repository/event.repository';

export async function getAkcseEvents() {
  return await getEvents();
}
