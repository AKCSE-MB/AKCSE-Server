import {
  Event as EventEntity,
  EventImage as EventImageEntity,
} from '@prisma/client';
import prismaClient from '@common/database/prisma';
import { ImagePayload, imagePayloads } from '@common/cloudinary/cloudinary';

export interface EventRecord {
  id: number;
  title: string;
  description: string;
  fee: number;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  signUpDeadline: Date;
  rsvpLink: string;
  images: ImagePayload[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventsRepository {
  getEvents(): Promise<EventRecord[]>;
}

type EventEntityWithImages = EventEntity & { images: EventImageEntity[] };

export class EventsRepository implements IEventsRepository {
  async getEvents(): Promise<EventRecord[]> {
    const records = await prismaClient.event.findMany({
      orderBy: { start_date_time: 'asc' },
      include: {
        images: { orderBy: [{ position: 'asc' }, { id: 'asc' }] },
      },
    });

    return records.map(toEventRecord);
  }
}

const eventsRepository = new EventsRepository();

export async function getEvents(): Promise<EventRecord[]> {
  return eventsRepository.getEvents();
}

function toEventRecord(record: EventEntityWithImages): EventRecord {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    fee: record.fee,
    startDateTime: record.start_date_time,
    endDateTime: record.end_date_time,
    location: record.location,
    signUpDeadline: record.sign_up_deadline,
    rsvpLink: record.rsvp_link ?? '',
    images: imagePayloads(record.images.map((image) => image.public_id)),
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}
