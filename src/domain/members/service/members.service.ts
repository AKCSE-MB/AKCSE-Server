import { ErrorSubCategoryEnum } from '@common/exception/enum';
import { CallerWrongUsageException } from '@common/exception/internal.exception';
import {
  deleteMember,
  getMemberById,
  getMembers,
  saveMember,
  updateMember,
} from '@domain/members/repository/members.repository';

export async function createMember(param: { score: number; name: string }) {
  await saveMember({
    score: param.score,
    name: param.name,
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
    name?: string;
  },
) {
  const member = await getMember(id);

  if (!member) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such member',
    );
  }

  await updateMember(id, param);
}

export async function removeMember(id: number) {
  const member = await getMember(id);

  if (!member) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'invalid update data',
    );
  }

  await deleteMember(id);
}

export async function getLeaderboard() {
  const data = await getAllMembers();
  const members = data.map((m) => {
    const { accountId, ...rest } = m;
    return rest;
  });

  const sortedMembers = members.sort((a, b) => b.score - a.score);
  const first = 0;
  const numMembers = 10;

  return sortedMembers.slice(first, numMembers);
}
