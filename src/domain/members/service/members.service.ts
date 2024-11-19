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

export async function createMember(param: {
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: string;
  role: string;
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
    score: number;
    numAttend: number;
    name: string;
    username: string;
    program: string;
    role: string;
  },
) {
  const member = await getMemberById(id);

  if (!member) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such member',
    );
  }

  return await updateMember(id, {
    score: param.score,
    numAttend: param.numAttend,
    name: param.name,
    username: param.username,
    program: param.program,
    role: param.role,
  });
}

export async function removeMember(id: number) {
  const member = await getMember(id);

  if (!member) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such member',
    );
  }

  await deleteMember(id);

  return member;
}

export async function createLeaderboard() {
  return await getTopMembers();
}
