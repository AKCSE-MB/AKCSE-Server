import {
  getEvents,
  getEventById,
  saveEvent,
  updateEvent,
  deleteEvent,
} from '@domain/event/repository/event.repository';
import { uploadImageToS3 } from '@common/utils/s3.util';
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

export async function saveAkcseEvent(
  param: {
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
  },
  image?: Express.Multer.File,
) {
  if (image) {
    param.imageUrl = await uploadImageToS3(image);
  }
  await saveEvent(param);
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
  image?: Express.Multer.File,
) {
  if (image) {
    param.imageUrl = await uploadImageToS3(image);
  }
  return await updateEvent(id, param);
}

export async function deleteAkcseEvent(id: number) {
  return await deleteEvent(id);
}
