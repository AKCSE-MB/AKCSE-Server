import {
  getEvents,
  getEventById,
  saveEvent,
  updateEvent,
  deleteEvent,
} from '@domain/event/repository/event.repository';
import { CallerWrongUsageException } from '@common/exception/internal.exception';
import { ErrorSubCategoryEnum } from '@common/exception/enum';

export async function getAkcseEvents() {
  return await getEvents();
}

export async function getAkcseEventById(id: number) {
  const event = await getEventById(id);

  if (!event) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such event',
    );
  }

  return event;
}

export async function saveAkcseEvent(param: {
  title: string;
  description: string;
  fee: number;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  signUpDeadline: Date;
  rsvpLink?: string;
  imageUrl?: string;
  updatedAt: Date;
}) {
  return await saveEvent(param);
}

export async function updateAkcseEvent(
  id: number,
  param: {
    title?: string;
    description?: string;
    fee?: number;
    startDateTime?: Date;
    endDateTime?: Date;
    location?: string;
    signUpDeadline?: Date;
    rsvpLink?: string;
    imageUrl?: string;
  },
) {
  return await updateEvent(id, param);
}

export async function deleteAkcseEvent(id: number) {
  return await deleteEvent(id);
}
