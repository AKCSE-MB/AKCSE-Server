import {
  getEventById,
  getEvents,
} from '@domain/event/repository/event.repository';
import { ErrorSubCategoryEnum } from '@root/src/common/exception/enum';
import { CallerWrongUsageException } from '@root/src/common/exception/internal.exception';

interface EventRecord {
  id: number;
  title: string;
  description: string;
  fee: number;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  signUpDeadline: Date;
  rsvpLink: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getAkcseEvents() {
  const records = await getEvents();
  return records.map((record) => transformRecordToModel(record));
}

export async function getAkcseEventById(id: number) {
  const record = await getEventById(id);

  if (!record) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such member',
    );
  }

  return transformRecordToModel(record);
}

function transformRecordToModel(record: {
  id: number;
  title: string;
  description: string;
  fee: number;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  signUpDeadline: Date;
  rsvpLink: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}): EventRecord {
  const { rsvpLink, imageUrl, ...rest } = record;
  return {
    ...rest,
    rsvpLink: rsvpLink || '',
    imageUrl: imageUrl || '',
  };
}
