import { truncateTables } from '@root/jest.setup';
import prismaClient from '@common/database/prisma';
import {
  saveMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from '@domain/members/repository/members.repository';
import { Program, Role } from '@domain/members/members.enum';

describe('members repository', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['members']);
  });

  it('should return a new member', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    };
    const memberId = 1;

    await saveMember({ ...dto });

    const res = await getMemberById(memberId);

    expect(res).not.toBeNull();
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
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
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

    const memberId = 1;

    await saveMember({ ...dto });

    const res = await updateMember(memberId, { ...expected });

    expect(res).not.toBeNull();

    expect(res.id).toEqual(memberId);

    expect(res.score).toEqual(10);
    expect(res.numAttend).toEqual(1);
    expect(res.name).toEqual('testName2');
    expect(res.username).toEqual('test2');
    expect(res.program).toEqual('Mathematics');
    expect(res.role).toEqual('Admin');
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
    const memberId = 1;

    await saveMember({ ...dto });
    await deleteMember(memberId);

    const res = await getMemberById(memberId);

    expect(res).toBeNull();
  });
});
