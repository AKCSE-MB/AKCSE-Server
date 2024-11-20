import { truncateTables } from '@root/jest.setup';
import {
  getAllMembers,
  getMember,
  createMember,
  searchMember,
  editMember,
  removeMember,
  createLeaderboard,
} from '@domain/members/service/members.service';
import prismaClient from '@common/database/prisma';
import { Program, Role } from '@domain/members/members.enum';
import { CallerWrongUsageException } from '@root/src/common/exception/internal.exception';
import { ErrorSubCategoryEnum } from '@root/src/common/exception/enum';

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
      role: Role.MEMBER,
    };

    const res = await createMember({ ...dto });

    expect(res).not.toBeNull();
    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('score');
    expect(res).toHaveProperty('numAttend');
    expect(res).toHaveProperty('name');
    expect(res).toHaveProperty('username');
    expect(res).toHaveProperty('program');
    expect(res).toHaveProperty('role');
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
      role: Role.MEMBER,
    };

    await createMember({ ...dto });
    await createMember({ ...dto });

    const res = await getAllMembers();
    const expectedNumMembers = 2;

    expect(res).not.toEqual([]);
    expect(res.length).toEqual(expectedNumMembers);

    res.forEach((member) => {
      expect(member).toHaveProperty('id');
      expect(member).toHaveProperty('score');
      expect(member).toHaveProperty('numAttend');
      expect(member).toHaveProperty('name');
      expect(member).toHaveProperty('username');
      expect(member).toHaveProperty('program');
      expect(member).toHaveProperty('role');
      expect(member).toHaveProperty('createdAt');
      expect(member).toHaveProperty('updatedAt');
    });
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
      role: Role.MEMBER,
    };

    const resNew = await createMember({ ...dto });
    const res = await getMember(resNew.id);

    expect(res).not.toBeNull();
    expect(res.id).toEqual(resNew.id);
    expect(res.score).toEqual(resNew.score);
    expect(res.numAttend).toEqual(resNew.numAttend);
    expect(res.name).toEqual(resNew.name);
    expect(res.username).toEqual(resNew.username);
    expect(res.program).toEqual(resNew.program);
    expect(res.role).toEqual(resNew.role);
    expect(res.createdAt).toEqual(resNew.createdAt);
    expect(res.updatedAt).toEqual(resNew.updatedAt);
  });

  it('should return a member since at least one search key is valid', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    };

    const param = {
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    };

    await createMember({ ...dto });

    const res = await searchMember(param);
    const expectedNumMembers = 1;

    expect(res).not.toEqual([]);
    expect(res.length).toEqual(expectedNumMembers);
  });

  it('should return a member', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    };

    const param = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: 'Comp',
      role: 'Mem',
    };

    await createMember({ ...dto });

    const res = await searchMember(param);
    const expectedNumMembers = 1;

    expect(res).not.toEqual([]);
    expect(res.length).toEqual(expectedNumMembers);
  });

  it('should return an empty array', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    };

    const param = {
      score: 0,
      numAttend: 0,
      name: 'Name2',
      username: '2',
      program: 'Stat',
      role: 'Adm',
    };

    await createMember({ ...dto });

    const res = await searchMember(param);
    expect(res).toEqual([]);
  });

  it('should return up to 5 members with the highest scores', async () => {
    const dto1 = {
      score: 10,
      numAttend: 2,
      name: 'top member',
      username: 'topMember',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    };

    const dto2 = {
      score: 0,
      numAttend: 0,
      name: 'non-top member',
      username: 'nonTopMember',
      program: Program.MATHEMATICS,
      role: Role.MEMBER,
    };

    await createMember({ ...dto1 });
    await createMember({ ...dto1 });
    await createMember({ ...dto1 });
    await createMember({ ...dto1 });
    await createMember({ ...dto1 });

    await createMember({ ...dto2 });

    const res = await createLeaderboard();
    const expectedNumMembers = 5;

    expect(res).not.toEqual([]);
    expect(res.length).toEqual(expectedNumMembers);

    res.forEach((topMember) => {
      expect(topMember.score).toEqual(10);
    });
  });

  it('no members, should return an empty array', async () => {
    const res = await createLeaderboard();

    expect(res).toEqual([]);
  });

  it('should return a member with an updated score, numAttend, name, username, program, and role', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    };

    const expected = {
      score: 10,
      numAttend: 1,
      name: 'testName2',
      username: 'test2',
      program: Program.MATHEMATICS,
      role: Role.ADMIN,
    };

    const resNew = await createMember({ ...dto });
    const res = await editMember(resNew.id, { ...expected });

    expect(res).not.toBeNull();

    expect(res.id).toEqual(resNew.id);

    expect(res.score).toEqual(expected.score);
    expect(res.numAttend).toEqual(expected.numAttend);
    expect(res.name).toEqual(expected.name);
    expect(res.username).toEqual(expected.username);
    expect(res.program).toEqual(expected.program);
    expect(res.role).toEqual(expected.role);
  });

  it('should throw an error with the message since the deleted member cannot be retreived', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    };

    const memberId = (await createMember({ ...dto })).id;
    await removeMember(memberId);

    try {
      const res = await getMember(memberId);
    } catch (error) {
      expect(error).toBeInstanceOf(CallerWrongUsageException);
      expect(error.message).toBe('no such member');
      expect(error.name).toBe(ErrorSubCategoryEnum.INVALID_INPUT);
    }
  });
});
