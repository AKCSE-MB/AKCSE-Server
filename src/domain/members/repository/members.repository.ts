import prismaClient from '@common/database/prisma';

export async function saveMember(param: { score: number; name: string }) {
  await prismaClient.members.create({ data: param });
}

export async function getMembers() {
  const res = await prismaClient.members.findMany();

  return res;
}

export async function getMemberById(id: number) {
  const res = await prismaClient.members.findFirst({
    where: {
      id: id,
    },
  });

  if (!res) return null;

  return res;
}

export async function updateMember(
  id: number,
  param: {
    score?: number;
    numAttend?: number;
    name?: string;
  },
) {
  await prismaClient.members.update({
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
  await prismaClient.members.delete({
    where: {
      id: id,
    },
  });
}
