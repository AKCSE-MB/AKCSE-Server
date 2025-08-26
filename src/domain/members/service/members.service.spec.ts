import { CallerWrongUsageException } from '@common/exception/internal.exception';
import { truncateTables } from '@root/jest.setup';
import {
  getAllMembers,
  getMember,
  createMember,
  editMember,
  removeMember,
  getLeaderboard,
} from '@domain/members/service/members.service';
import prismaClient from '@common/database/prisma';
import { Role } from '@prisma/client';

describe('members service', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['members']);
  });

  it('should return the new member', async () => {
    const dto = {
      score: 0,
      name: 'testName1',
      role: Role.MEMBER,
    };
    const memberId = 1;

    await createMember({ ...dto });

    const res = await getMember(memberId);

    expect(res).not.toBeNull();
    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('score');
    expect(res).toHaveProperty('name');
    expect(res).toHaveProperty('createdAt');
    expect(res).toHaveProperty('updatedAt');
  });

  it('should return all members', async () => {
    const dto = {
      score: 0,
      name: 'testName',
      role: Role.MEMBER,
    };

    await createMember({ ...dto });
    await createMember({ ...dto });

    const res = await getAllMembers();
    const expectedNumMembers = 2;

    expect(res).not.toEqual([]);
    expect(res.length).toEqual(expectedNumMembers);
  });

  it('no members, should return an empty array', async () => {
    const res = await getAllMembers();
    expect(res).toEqual([]);
  });

  it('should return a member with the passed id', async () => {
    const dto = {
      score: 0,
      name: 'testName1',
      role: Role.MEMBER,
    };

    await createMember({ ...dto });
    const memberId = 1;
    const res = await getMember(memberId);

    expect(res).not.toBeNull();
  });

  it('should return up to 10 members with the highest scores', async () => {
    const dto1 = {
      score: 10,
      name: 'top member',
      role: Role.MEMBER,
    };

    const dto2 = {
      score: 0,
      name: 'non-top member',
      role: Role.MEMBER,
    };

    await createMember({ ...dto1 });
    await createMember({ ...dto1 });
    await createMember({ ...dto1 });
    await createMember({ ...dto1 });
    await createMember({ ...dto1 });
    await createMember({ ...dto1 });
    await createMember({ ...dto1 });
    await createMember({ ...dto1 });
    await createMember({ ...dto1 });
    await createMember({ ...dto1 });

    await createMember({ ...dto2 });

    const res = await getLeaderboard();
    const expectedNumMembers = 10;

    expect(res).not.toEqual([]);
    expect(res.length).toEqual(expectedNumMembers);

    res.forEach((topMember) => {
      expect(topMember.score).toEqual(10);
    });
  });

  it('no members, should return an empty array', async () => {
    const res = await getLeaderboard();

    expect(res).toEqual([]);
  });

  it('should return a member with an updated score, name, and role', async () => {
    const dto = {
      score: 0,
      name: 'testName1',
      role: Role.MEMBER,
    };

    const expected = {
      score: 10,
      name: 'testName2',
      role: Role.ADMIN,
    };

    await createMember({ ...dto });
    const memberId = 1;

    await editMember(memberId, { ...expected });
    const res = await getMember(memberId);

    expect(res).not.toBeNull();
    expect(res.id).toEqual(memberId);
    expect(res.score).toEqual(expected.score);
    expect(res.name).toEqual(expected.name);
    expect(res.role).toEqual(expected.role);
  });

  it('should throw an error with the message since the deleted member cannot be retreived', async () => {
    const dto = {
      score: 0,
      name: 'testName1',
      role: Role.MEMBER,
    };
    const memberId = 1;

    await createMember({ ...dto });
    await removeMember(memberId);

    await expect(getMember(memberId)).rejects.toThrowError(
      CallerWrongUsageException,
    );
  });
});
