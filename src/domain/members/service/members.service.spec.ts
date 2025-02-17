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
import { Program } from '@domain/members/members.enum';

describe('members service', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['members']);
  });

  it('should return the new member', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
    };
    const memberId = 1;

    await createMember({ ...dto });

    const res = await getMember(memberId);

    expect(res).not.toBeNull();
    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('score');
    expect(res).toHaveProperty('numAttend');
    expect(res).toHaveProperty('name');
    expect(res).toHaveProperty('username');
    expect(res).toHaveProperty('program');
    expect(res).toHaveProperty('createdAt');
    expect(res).toHaveProperty('updatedAt');
  });

  it('should return all members', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName',
      username: 'test',
      program: Program.COMPUTER_SCIENCE,
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
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
    };

    await createMember({ ...dto });
    const memberId = 1;
    const res = await getMember(memberId);

    expect(res).not.toBeNull();
  });

  it('should return up to 5 members with the highest scores', async () => {
    const dto1 = {
      score: 10,
      numAttend: 2,
      name: 'top member',
      username: 'topMember',
      program: Program.COMPUTER_SCIENCE,
    };

    const dto2 = {
      score: 0,
      numAttend: 0,
      name: 'non-top member',
      username: 'nonTopMember',
      program: Program.MATHEMATICS,
    };

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

  it('should return a member with an updated score, numAttend, name, username, program, and role', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
    };

    const expected = {
      score: 10,
      numAttend: 1,
      name: 'testName2',
      username: 'test2',
      program: Program.MATHEMATICS,
    };

    await createMember({ ...dto });
    const memberId = 1;

    await editMember(memberId, { ...expected });
    const res = await getMember(memberId);

    expect(res).not.toBeNull();
    expect(res.id).toEqual(memberId);
    expect(res.score).toEqual(expected.score);
    expect(res.numAttend).toEqual(expected.numAttend);
    expect(res.name).toEqual(expected.name);
    expect(res.username).toEqual(expected.username);
    expect(res.program).toEqual(expected.program);
  });

  it('should throw an error with the message since the deleted member cannot be retreived', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
    };
    const memberId = 1;

    await createMember({ ...dto });
    await removeMember(memberId);

    await expect(getMember(memberId)).rejects.toThrowError(
      CallerWrongUsageException,
    );
  });
});
