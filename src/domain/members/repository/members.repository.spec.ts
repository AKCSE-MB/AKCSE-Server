import { truncateTables } from '@root/jest.setup';
import prismaClient from '@common/database/prisma';
import {
  saveMember,
  getMembers,
  getMemberById,
  getMembersBySearch,
  getTopMembers,
  updateMember,
  deleteMember,
} from '@domain/members/repository/members.repository';

describe('members repository', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['members']);
  });

  /* create a member */
  it('should return a new member', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: 'Computer Science',
      role: 'Member',
    };

    const member = await saveMember({ ...dto });

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

  /* get all members */
  it('should return all members', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName',
      username: 'test',
      program: 'Computer Science',
      role: 'Member',
    };

    await saveMember({ ...dto });
    await saveMember({ ...dto });

    const members = await getMembers();

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

  // no members exist
  it('no members, should return an empty array', async () => {
    const members = await getMembers();
    expect(members).toEqual([]);
  });

  /* get a member by id */
  // member exist
  it('should return a member with the passed id', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: 'Computer Science',
      role: 'Member',
    };

    const member = await saveMember({ ...dto });
    const testMember = await getMemberById(member.id);

    expect(testMember).not.toBeNull();
  });

  // member does not exist
  it('member does not exist, should be null', async () => {
    const member = await getMemberById(999);

    // may have to change the verification method
    expect(member).toBeNull;
  });

  /* get a member by a search key */
  // get a member with a full search key
  it('should return a member', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: 'Computer Science',
      role: 'Member',
    };

    // this member must have an id of 1
    await saveMember({ ...dto });

    // search key is checked for the name
    let members = await getMembersBySearch('testName1');
    expect(members).not.toEqual([]);

    // search key is checked for the username
    members = await getMembersBySearch('test1');
    expect(members).not.toEqual([]);

    // search key is checked for the program
    members = await getMembersBySearch('Computer Science');
    expect(members).not.toEqual([]);

    // search key is checked for the role
    members = await getMembersBySearch('Member');
    expect(members).not.toEqual([]);
  });

  // get a member with a partial search key
  it('should return a member', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: 'Computer Science',
      role: 'Member',
    };

    // this member must have an id of 1
    await saveMember({ ...dto });

    // search key is checked for the name
    let members = await getMembersBySearch('Name1');
    expect(members).not.toEqual([]);

    // search key is checked for the username
    members = await getMembersBySearch('test');
    expect(members).not.toEqual([]);

    // search key is checked for the program
    members = await getMembersBySearch('Computer');
    expect(members).not.toEqual([]);

    // search key is checked for the role
    members = await getMembersBySearch('Mem');
    expect(members).not.toEqual([]);
  });

  // no member contains the search key
  it('should return an empty array', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: 'Computer Science',
      role: 'Member',
    };

    // this member must have an id of 1
    await saveMember({ ...dto });

    // search key is checked for the name
    let members = await getMembersBySearch('Name2');
    expect(members).toEqual([]);

    // search key is checked for the username
    members = await getMembersBySearch('2');
    expect(members).toEqual([]);

    // search key is checked for the program
    members = await getMembersBySearch('Statistics');
    expect(members).toEqual([]);

    // search key is checked for the role
    members = await getMembersBySearch('Admin');
    expect(members).toEqual([]);
  });

  /* create a leaderboard */
  // members exist
  it('should return up to 5 members with the highest scores', async () => {
    // create 6 members
    const dto1 = {
      score: 10,
      numAttend: 2,
      name: 'top member',
      username: 'topMember',
      program: 'Computer Science',
      role: 'Member',
    };

    const dto2 = {
      score: 0,
      numAttend: 0,
      name: 'non-top member',
      username: 'nonTopMember',
      program: 'Mathematics',
      role: 'Member',
    };

    // 5 members with a score of 10
    await saveMember({ ...dto1 });
    await saveMember({ ...dto1 });
    await saveMember({ ...dto1 });
    await saveMember({ ...dto1 });
    await saveMember({ ...dto1 });

    // 1 member with a score of 0
    await saveMember({ ...dto2 });

    const leaderboard = await getTopMembers();

    expect(leaderboard).not.toEqual([]);

    // all members in the leaderboard should have a score of 10
    leaderboard.forEach((topMember) => {
      expect(topMember.score).toEqual(10);
    });
  });

  // no members exist
  it('no members, should return an empty array', async () => {
    const leaderboard = await getTopMembers();

    expect(leaderboard).toEqual([]);
  });

  /* edit a member */
  it('should return a member with an updated score, numAttend, name, username, program, and role', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: 'Computer Science',
      role: 'Member',
    };

    const member = await saveMember({ ...dto });

    const updatedDto = {
      score: 10,
      numAttend: 1,
      name: 'testName2',
      username: 'test2',
      program: 'Mathematics',
      role: 'Admin',
    };

    const updatedMember = await updateMember(member.id, { ...updatedDto });

    expect(updatedMember).not.toBeNull();

    // must have the same id and created time
    expect(updatedMember.id).toEqual(member.id);
    expect(updatedMember.createdAt).toEqual(member.createdAt);

    // must have updated data for score, numAttend, name, username, program, and role
    expect(updatedMember.score).toEqual(10);
    expect(updatedMember.numAttend).toEqual(1);
    expect(updatedMember.name).toEqual('testName2');
    expect(updatedMember.username).toEqual('test2');
    expect(updatedMember.program).toEqual('Mathematics');
    expect(updatedMember.role).toEqual('Admin');

    // updated time must be different
    expect(updatedMember.updatedAt).not.toEqual(member.updatedAt);
  });

  /* delete a member */
  it('should not be able to return a member after deletion', async () => {
    const dto = {
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: 'Computer Science',
      role: 'Member',
    };

    const member = await saveMember({ ...dto });
    const deleted = await deleteMember(member.id);
    const test = getMemberById(deleted.id);

    expect(test).toBeNull();
  });
});
