import prismaClient from '@common/database/prisma';
import { Program } from '@domain/members/members.enum';

export async function saveMember(param: {
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: Program;
}) {
  await prismaClient.members.create({ data: param });
}

export async function getMembers() {
  return await prismaClient.members.findMany();
}

export async function getMemberById(id: number) {
  return await prismaClient.members.findFirst({
    where: {
      id: id,
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
    program?: Program;
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
