import { CallerWrongUsageException } from '@common/exception/internal.exception';
import { ErrorSubCategoryEnum } from '@common/exception/enum';
import {
  saveMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from '@domain/members/repository/members.repository';
import { Program, Role } from '@domain/members/members.enum';

export async function createMember(param: {
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: Program;
  role: Role;
}) {
  await saveMember({
    score: param.score,
    numAttend: param.numAttend,
    name: param.name,
    username: param.username,
    program: param.program,
    role: param.role,
  });
}

export async function getAllMembers() {
  return await getMembers();
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
  const member = await getMember(id);

  if (!member) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such member',
    );
  }

  return await updateMember(id, param);
}

export async function removeMember(id: number) {
  const member = await getMember(id);

  if (!member) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'invalid update data',
    );
  }

  return await deleteMember(id);
}

export async function getLeaderboard() {
  const members = await getAllMembers();
  const sortedMembers = members.sort((a, b) => b.score - a.score);
  const first = 0;
  const numMembers = 5;

  return sortedMembers.slice(first, numMembers);
}
