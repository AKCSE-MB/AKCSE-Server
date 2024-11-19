import { CallerWrongUsageException } from '@common/exception/internal.exception';
import { ErrorSubCategoryEnum } from '@root/src/common/exception/enum';
import {
  saveMember,
  getMembers,
  getMemberById,
  getMembersBySearch,
  getTopMembers,
  updateMember,
  deleteMember,
} from '../repository/members.repository';
import { Program, Role } from '@domain/members/members.enum';

export async function createMember(param: {
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: Program;
  role: Role;
}) {
  return await saveMember({
    score: param.score,
    numAttend: param.numAttend,
    name: param.name,
    username: param.username,
    program: param.program,
    role: param.role,
  });
}

export async function getAllMembers() {
  return getMembers();
}

export async function getMember(id: number) {
  const member = await getMemberById(id);

  if (!member) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such member',
    );
  }

  return member;
}

export async function searchMember(key: string) {
  const member = await getMembersBySearch(key);

  if (!member) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such member',
    );
  }

  return member;
}

export async function editMember(
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
  const member = await getMemberById(id);

  if (!member) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such member',
    );
  }

  const data: any = {};

  if (param.score !== undefined) data.score = param.score;
  if (param.numAttend !== undefined) data.numAttend = param.numAttend;
  if (param.name !== undefined) data.name = param.name;
  if (param.username !== undefined) data.username = param.username;
  if (param.program !== undefined) data.program = param.program;
  if (param.role !== undefined) data.role = param.role;

  return await updateMember(id, data);
}

export async function removeMember(id: number) {
  const member = await getMember(id);

  if (!member) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such member',
    );
  }

  return await deleteMember(id);
}

export async function createLeaderboard() {
  return await getTopMembers();
}
