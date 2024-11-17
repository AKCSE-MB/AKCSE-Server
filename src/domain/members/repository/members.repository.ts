import prismaClient from '@common/database/prisma';

export async function saveMember(param: {
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: string;
  role: string;
}) {
  return await prismaClient.members.create({ data: param });
}

export async function getMembers() {
  const members = await prismaClient.members.findMany();

  return members;
}

export async function getMemberById(id: number) {
  return await prismaClient.members.findFirst({
    where: {
      id: id,
    },
  });
}

export async function getMembersBySearch(key: string) {
  return await prismaClient.members.findMany({
    where: {
      OR: [
        {
          name: {
            contains: key,
            mode: 'insensitive',
          },
        },
        {
          username: {
            contains: key,
            mode: 'insensitive',
          },
        },
        {
          role: {
            contains: key,
            mode: 'insensitive',
          },
        },
        {
          program: {
            contains: key,
            mode: 'insensitive',
          },
        },
      ],
    },
  });
}

export async function getTopMembers() {
  return await prismaClient.members.findMany({
    orderBy: { score: 'desc' },
    take: 5,
    select: {
      id: true,
      username: true,
      score: true,
      numAttend: true,
    },
  });
}

export async function updateMember(
  id: number,
  param: {
    score?: number;
    numAttend?: number;
    name?: string;
    username?: string;
    program?: string;
    role?: string;
  },
) {
  return await prismaClient.members.update({
    where: {
      id: id,
    },
    data: {
      ...param,
      updatedAt: new Date(),
    },
  });
}

export async function deleteMember(id: number) {
  return await prismaClient.members.delete({
    where: {
      id: id,
    },
  });
}
