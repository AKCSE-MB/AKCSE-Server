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

export async function getEvents() {
  const records = await prismaClient.events.findMany();
  return transformRecordToModel(records);
}

export async function saveEvents(
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
  }[],
) {
  return prismaClient.events.createMany({ data: param });
}

export async function saveEvent(param: {
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
  return saveEvents([param]);
}

export function transformRecordToModel(
  records: {
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
  }[],
): EventRecord[] {
  return records.map((record) => {
    const { rsvpLink, imageUrl, ...rest } = record;
    return {
      ...rest,
      rsvpLink: rsvpLink || '',
      imageUrl: imageUrl || '',
    };
  });
}
