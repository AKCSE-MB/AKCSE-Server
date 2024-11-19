import prismaClient from '@common/database/prisma';
import { Program, Role } from '@domain/members/members.enum';

export async function saveMember(param: {
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: Program;
  role: Role;
}) {
  return await prismaClient.members.create({ data: param });
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

export async function getMembersByConditions(param: {
  name?: string;
  username?: string;
  program?: string;
  role?: string;
}) {
  const conditions = {};
  if (param.name && param.name.length >= 1) {
    conditions['name'] = { contains: param.name };
  }

  if (param.username && param.username.length >= 1) {
    conditions['username'] = { contains: param.username };
  }

  if (param.program && param.program.length >= 1) {
    conditions['program'] = { contains: param.program };
  }

  if (param.role && param.role.length >= 1) {
    conditions['role'] = { contains: param.role };
  }

  return await prismaClient.members.findMany({
    where: {
      OR: Object.keys(conditions).map((key) => ({ [key]: conditions[key] })),
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
    role?: Role;
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
