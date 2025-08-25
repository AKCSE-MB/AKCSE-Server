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
  return records.map((record) => transformRecordToModel(record));
}

export async function getEventById(id: number) {
  const record = await prismaClient.events.findUnique({
    where: {
      id: id,
    },
  });

  if (!record) return null;

  return transformRecordToModel(record);
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
}) {
  return saveEvents([param]);
}

export async function updateEvent(
  id: number,
  param: {
    title?: string;
    description?: string;
    fee?: number;
    startDateTime?: Date;
    endDateTime?: Date;
    location?: string;
    signUpDeadline?: Date;
    rsvpLin?: string;
    imageUrl?: string;
  },
) {
  await prismaClient.events.update({
    where: {
      id: id,
    },
    data: {
      ...param,
      updatedAt: new Date(),
    },
  });
}

export async function deleteEvent(id: number) {
  await prismaClient.events.delete({
    where: {
      id: id,
    },
  });
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
