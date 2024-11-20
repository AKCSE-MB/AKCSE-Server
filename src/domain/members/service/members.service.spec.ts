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

    const member = await createMember({ ...dto });

    expect(member).not.toBeNull();
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

    const members = await getAllMembers();

    expect(members).not.toEqual([]);
    expect(members.length).toEqual(2);

    members.forEach((member) => {
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
    const members = await getAllMembers();
    expect(members).toEqual([]);
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

    const member = await createMember({ ...dto });
    const testMember = await getMember(member.id);

    expect(testMember).not.toBeNull();
    expect(testMember.id).toEqual(member.id);
    expect(testMember.score).toEqual(member.score);
    expect(testMember.numAttend).toEqual(member.numAttend);
    expect(testMember.name).toEqual(member.name);
    expect(testMember.username).toEqual(member.username);
    expect(testMember.program).toEqual(member.program);
    expect(testMember.role).toEqual(member.role);
    expect(testMember.createdAt).toEqual(member.createdAt);
    expect(testMember.updatedAt).toEqual(member.updatedAt);
  });

  it('member does not exist, should be null', async () => {
    const member = await getMember(999);

    expect(member).toBeNull;
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
      score: 10,
      numAttend: 1,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    };

    await createMember({ ...dto });

    const members = await searchMember(param);

    expect(members).not.toEqual([]);
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

    const members = await searchMember(param);
    expect(members).not.toEqual([]);
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
      role: 'Mem',
    };

    await createMember({ ...dto });

    const members = await searchMember(param);
    expect(members).toEqual([]);
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

    const leaderboard = await createLeaderboard();

    expect(leaderboard).not.toEqual([]);

    leaderboard.forEach((topMember) => {
      expect(topMember.score).toEqual(10);
    });
  });

  it('no members, should return an empty array', async () => {
    const leaderboard = await createLeaderboard();

    expect(leaderboard).toEqual([]);
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

    const member = await createMember({ ...dto });

    const expected = {
      score: 10,
      numAttend: 1,
      name: 'testName2',
      username: 'test2',
      program: Program.MATHEMATICS,
      role: Role.ADMIN,
    };

    const updatedMember = await editMember(member.id, { ...expected });

    expect(updatedMember).not.toBeNull();

    expect(updatedMember.id).toEqual(member.id);
    expect(updatedMember.createdAt).toEqual(member.createdAt);

    expect(updatedMember.score).toEqual(10);
    expect(updatedMember.numAttend).toEqual(1);
    expect(updatedMember.name).toEqual('testName2');
    expect(updatedMember.username).toEqual('test2');
    expect(updatedMember.program).toEqual('Mathematics');
    expect(updatedMember.role).toEqual('Admin');

    expect(updatedMember.updatedAt).not.toEqual(member.updatedAt);
  });

  it('should not be able to return a member after deletion', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    };

    const member = await createMember({ ...dto });
    const deleted = await removeMember(member.id);
    const test = getMember(deleted.id);

    expect(test).toBeNull();
  });
});
