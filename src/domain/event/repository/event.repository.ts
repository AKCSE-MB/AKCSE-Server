import prismaClient from '@common/database/prisma';

export async function getEvents() {
  return await prismaClient.events.findMany();
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
