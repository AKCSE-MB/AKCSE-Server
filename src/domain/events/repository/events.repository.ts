import { Event as EventEntity } from '@prisma/client';
import prismaClient from '@common/database/prisma';
import { ImagePayload, imagePayload } from '@common/cloudinary/cloudinary';

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
  image: ImagePayload | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventsRepository {
  getEvents(): Promise<EventRecord[]>;
}

export class EventsRepository implements IEventsRepository {
  async getEvents(): Promise<EventRecord[]> {
    const records = await prismaClient.event.findMany({
      orderBy: { start_date_time: 'asc' },
    });

    return records.map(toEventRecord);
  }
}

const eventsRepository = new EventsRepository();

export async function getEvents(): Promise<EventRecord[]> {
  return eventsRepository.getEvents();
}

function toEventRecord(record: EventEntity): EventRecord {
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
    image: imagePayload(record.image_public_id),
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}
