import {
  getEventById,
  getEvents,
} from '@domain/event/repository/event.repository';
import { ErrorSubCategoryEnum } from '@root/src/common/exception/enum';
import { CallerWrongUsageException } from '@root/src/common/exception/internal.exception';

export async function getAkcseEvents() {
  return await getEvents();
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
