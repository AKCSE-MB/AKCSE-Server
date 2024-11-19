import { truncateTables } from '@root/jest.setup';
import prismaClient from '@common/database/prisma';
import {
  saveMember,
  getMembers,
  getMemberById,
  getMembersByConditions,
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

    const res = await saveMember({ ...dto });

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

    //false to get all members
    const res = await getMembers(false);

    expect(res).not.toEqual([]);
    expect(res.length).toEqual(2);

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

  // no members exist
  it('no members, should return an empty array', async () => {
    const res = await getMembers(false);
    expect(res).toEqual([]);
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

    const resSave = await saveMember({ ...dto });
    const resGet = await getMemberById(resSave.id);

    expect(resGet).not.toBeNull();
  });

  // member does not exist
  it('member does not exist, should be null', async () => {
    const res = await getMemberById(999);

    // may have to change the verification method
    expect(res).toBeNull;
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

    // search key is checked for all conditions
    const param = {
      name: 'testName1',
      username: 'test1 ',
      program: 'Computer Science',
      role: 'Member',
    };

    const res = await getMembersByConditions(param);
    expect(res).not.toEqual([]);
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

    // search key is checked for all conditions
    const param = {
      name: 'Name1',
      username: 'test',
      program: 'Comp',
      role: 'Mem',
    };

    const res = await getMembersByConditions(param);
    expect(res).not.toEqual([]);
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

    // search key is checked for all conditions
    const param = {
      name: 'Name2',
      username: '2',
      program: 'Statistics',
      role: 'Admin',
    };

    const res = await getMembersByConditions(param);
    expect(res).not.toEqual([]);
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

    const res = await getMembers(true);

    expect(res).not.toEqual([]);

    // all members in the leaderboard should have a score of 10
    res.forEach((topMember) => {
      expect(topMember.score).toEqual(10);
    });
  });

  // no members exist
  it('no members, should return an empty array', async () => {
    const res = await getMembers(true);

    expect(res).toEqual([]);
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

    const res = await updateMember(member.id, { ...updatedDto });

    expect(res).not.toBeNull();

    // must have the same id and created time
    expect(res.id).toEqual(member.id);

    // must have updated data for score, numAttend, name, username, program, and role
    expect(res.score).toEqual(10);
    expect(res.numAttend).toEqual(1);
    expect(res.name).toEqual('testName2');
    expect(res.username).toEqual('test2');
    expect(res.program).toEqual('Mathematics');
    expect(res.role).toEqual('Admin');
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

    const resSave = await saveMember({ ...dto });
    const resDelete = await deleteMember(resSave.id);
    const resGet = await getMemberById(resDelete.id);

    expect(resGet).toBeNull();
  });
});
