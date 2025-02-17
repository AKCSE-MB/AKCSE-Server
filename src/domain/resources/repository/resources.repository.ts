import prismaClient from '@common/database/prisma';

export async function saveResource(param: {
  title: string;
  description: string;
  academicCalendarUrl: string;
}) {
  await prismaClient.resources.create({ data: param });
}

export async function getResources() {
  return await prismaClient.resources.findMany();
}

export async function getResourceById(id: number) {
  return await prismaClient.resources.findFirst({
    where: {
      id: id,
    },
  });
}

export async function updateResource(
  id: number,
  param: {
    description?: string;
    academicCalendarUrl?: string;
  },
) {
  return await prismaClient.resources.update({
    where: {
      id: id,
    },
    data: {
      ...param,
    },
  });
}

export async function deleteResource(id: number) {
  return await prismaClient.resources.delete({
    where: {
      id: id,
    },
  });
}
