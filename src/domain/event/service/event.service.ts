import {
  getEventById,
  getEvents,
} from '@domain/event/repository/event.repository';
import { ErrorSubCategoryEnum } from '@root/src/common/exception/enum';
import { CallerWrongUsageException } from '@root/src/common/exception/internal.exception';

export async function getUpcomingEvents() {
  const events = await getEvents();
  const currDate = new Date();

  const newEvents = events.filter((event) => {
    return currDate <= event.endDateTime;
  });

  return newEvents;
}

export async function getPastEvents() {
  const events = await getEvents();
  const currDate = new Date();

  const pastEvents = events.filter((event) => {
    return currDate > event.endDateTime;
  });

  return pastEvents;
}

export async function getAkcseEventById(id: number) {
  const record = await getEventById(id);

  if (!record) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such event',
    );
  }

  return record;
}
