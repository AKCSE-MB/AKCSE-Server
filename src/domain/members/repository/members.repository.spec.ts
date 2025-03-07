import { truncateTables } from '@root/jest.setup';
import prismaClient from '@common/database/prisma';
import {
  saveMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from '@domain/members/repository/members.repository';
import { Program } from '@domain/members/members.enum';

describe('members repository', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['members']);
  });

  it('should return a new member', async () => {
    const dto = {
      score: 0,
      name: 'testName1',
    };
    const memberId = 1;

    await saveMember({ ...dto });

    const res = await getMemberById(memberId);

    expect(res).not.toBeNull();
  });

  it('should return all members', async () => {
    const dto = {
      score: 0,
      name: 'testName',
    };

    await saveMember({ ...dto });
    await saveMember({ ...dto });

    const res = await getMembers();

    expect(res).not.toEqual([]);
    expect(res.length).toEqual(2);
  });

  it('no members, should return an empty array', async () => {
    const res = await getMembers();
    expect(res).toEqual([]);
  });

  it('should return a member with the passed id', async () => {
    const dto = {
      score: 0,
      name: 'testName1',
    };
    const memberId = 1;

    await saveMember({ ...dto });

    const res = await getMemberById(memberId);

    expect(res).not.toBeNull();
  });

  it('member does not exist, should be null', async () => {
    const memberId = 100;
    const res = await getMemberById(memberId);

    expect(res).toBeNull;
  });

  it('should return a member with an updated score, numAttend, name, username, and program', async () => {
    const dto = {
      score: 0,
      name: 'testName1',
    };

    const expected = {
      score: 10,
      name: 'testName2',
    };
    const memberId = 1;

    await saveMember({ ...dto });
    await updateMember(memberId, { ...expected });
    const res = await getMemberById(memberId);

    expect(res).not.toBeNull();
  });

  it('should not be able to return a member after deletion', async () => {
    const dto = {
      score: 0,
      name: 'testName1',
    };
    const memberId = 1;

    await saveMember({ ...dto });
    await deleteMember(memberId);
    const res = await getMemberById(memberId);

    expect(res).toBeNull();
  });
});
