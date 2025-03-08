import {
  getEventById,
  getEvents,
} from '@domain/event/repository/event.repository';
import { ErrorSubCategoryEnum } from '@root/src/common/exception/enum';
import { CallerWrongUsageException } from '@root/src/common/exception/internal.exception';
import { groupBy } from 'fxjs/Strict';

export async function getAkcseEvents() {
  const data = await getEvents();
  const currDate = new Date();

  const res = groupBy(
    ({ endDateTime }) => (endDateTime >= currDate ? 'upcoming' : 'past'),
    data,
  );

  return res;
}

export async function getPastEvents() {
  const events = await getEvents();
  const currDate = new Date();

  const res = events.filter((event) => {
    return currDate > event.endDateTime;
  });

  return res;
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
