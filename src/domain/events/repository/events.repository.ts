import { Event as EventEntity } from '@prisma/client';
import prismaClient from '@common/database/prisma';

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
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export function sum(a, b) {
  const output = a + b;
  return output;
}

export async function getEvents(): Promise<EventRecord[]> {
  const records = await prismaClient.event.findMany({
    orderBy: { start_date_time: 'asc' },
  });

  return records.map(toEventRecord);
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
    imageUrl: record.image_url ?? '',
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}
