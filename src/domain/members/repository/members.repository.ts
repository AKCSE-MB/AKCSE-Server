import prismaClient from '@common/database/prisma';

export async function saveMember(param: {
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: string;
  role: string;
}) {
  await prismaClient.members.createMany({ data: param });
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
        { name: { contains: key } },
        { username: { contains: key } },
        { role: { contains: key } },
        { program: { contains: key } },
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
    score: number;
    numAttend: number;
    name: string;
    username: string;
    program: string;
    role: string;
  },
) {
  await prismaClient.members.update({
    where: {
      id: id,
    },
    data: {
      score: param.score,
      numAttend: param.numAttend,
      name: param.name,
      username: param.username,
      program: param.program,
      role: param.role,
    },
  });

  return await getMemberById(id);
}

export async function deleteMember(id: number) {
  await prismaClient.members.delete({
    where: {
      id: id,
    },
  });
}
