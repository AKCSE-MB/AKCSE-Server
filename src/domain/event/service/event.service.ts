import {
  getEventById,
  getEvents,
  saveEvent,
  updateEvent,
  deleteEvent,
} from '@domain/event/repository/event.repository';
import { ErrorSubCategoryEnum } from '@root/src/common/exception/enum';
import { CallerWrongUsageException } from '@root/src/common/exception/internal.exception';
import { groupBy } from 'fxjs/Strict';
import { GetEventsOutput } from '@domain/event/dto/event.dto';

export async function getAkcseEvents() {
  const data = await getEvents();
  const currDate = new Date();

  const res = groupBy(
    ({ endDateTime }) => (endDateTime >= currDate ? 'upcoming' : 'past'),
    data,
  );

  return {
    upcoming: res.upcoming || [],
    past: res.past || [],
  } as GetEventsOutput;
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

export async function createEvent(param: {
  title: string;
  description: string;
  fee: number;
  startDateTime: string;
  endDateTime: string;
  location: string;
  signUpDeadline: string;
  rsvpLink?: string;
  imageUrl?: string;
}) {
  await saveEvent({
    title: param.title,
    description: param.description,
    fee: param.fee,
    startDateTime: new Date(param.startDateTime),
    endDateTime: new Date(param.endDateTime),
    location: param.location,
    signUpDeadline: new Date(param.signUpDeadline),
    ...(param.rsvpLink && { rsvpLink: param.rsvpLink }),
    ...(param.imageUrl && { imageUrl: param.imageUrl }),
  });
}

export async function editEvent(
  id: number,
  param: {
    title?: string;
    description?: string;
    fee?: number;
    startDateTime?: string;
    endDateTime?: string;
    location?: string;
    signUpDeadline?: string;
    rsvpLink?: string;
    imageUrl?: string;
  },
) {
  const event = await getEventById(id);

  if (!event) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such event',
    );
  }

  await updateEvent(id, {
    title: param.title,
    description: param.description,
    fee: param.fee,
    ...(param.startDateTime && {
      startDateTime: new Date(param.startDateTime),
    }),
    ...(param.endDateTime && { endDateTime: new Date(param.endDateTime) }),
    location: param.location,
    ...(param.signUpDeadline && {
      signUpDeadline: new Date(param.signUpDeadline),
    }),
    ...(param.rsvpLink && { rsvpLink: param.rsvpLink }),
    ...(param.imageUrl && { imageUrl: param.imageUrl }),
  });
}

export async function removeEvent(id: number) {
  const event = await getEventById(id);

  if (!event) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such event',
    );
  }

  await deleteEvent(id);
}
