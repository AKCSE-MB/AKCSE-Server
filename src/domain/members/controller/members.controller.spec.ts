import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import { MembersModule } from '@domain/members/members.module';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import * as membersService from '@domain/members/service/members.service';
import { Program, Role } from '@domain/members/members.enum';
import { MembersResponseDTO } from '@domain/members/dto/members.dto';

describe('members controller', () => {
  let app: INestApplication;
  let configService: ConfigurationService;
  beforeAll(async () => {
    const module = (await appModuleFixture(
      [],
      [],
      [MembersModule],
    )) as TestingModule;
    app = module.createNestApplication();
    configService = module.get<ConfigurationService>(ConfigurationService);
    await app.init();
  });

  /* create member */
  it('should return a new member', async () => {
    const mockMember = {
      id: 1,
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: 'Computer Science',
      role: 'Member',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(membersService, 'createMember').mockResolvedValue(mockMember);

    const res = await request(app.getHttpServer()).post('/v1/members').send({
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    });

    assertStatusCode(res, 200);
    expect(res).not.toBeNull();
    expect(res.body.data.score).toEqual(mockMember.score);
    expect(res.body.data.numAttend).toEqual(mockMember.numAttend);
    expect(res.body.data.name).toEqual(mockMember.name);
    expect(res.body.data.username).toEqual(mockMember.username);
    expect(res.body.data.program).toEqual(mockMember.program);
    expect(res.body.data.role).toEqual(mockMember.role);
  });

  /* get all members */
  // members exist
  it('should return all members', async () => {
    const mockMembers: MemberResponseDTO[] = [
      {
        id: 1,
        score: 0,
        numAttend: 0,
        name: 'testName1',
        username: 'test1',
        program: Program.COMPUTER_SCIENCE,
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        score: 10,
        numAttend: 1,
        name: 'testName2',
        username: 'test2',
        program: Program.COMPUTER_SCIENCE,
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(membersService, 'getAllMembers').mockResolvedValue(mockMembers);

    const res = await request(app.getHttpServer()).get('/v1/members');

    assertStatusCode(res, 200);

    // first member
    expect(res.body[0].data.score).toEqual(mockMembers[0].score);
    expect(res.body[0].data.numAttend).toEqual(mockMembers[0].numAttend);
    expect(res.body[0].data.name).toEqual(mockMembers[0].name);
    expect(res.body[0].data.username).toEqual(mockMembers[0].username);
    expect(res.body[0].data.program).toEqual(mockMembers[0].program);
    expect(res.body[0].data.role).toEqual(mockMembers[0].role);

    // second member
    expect(res.body[1].data.score).toEqual(mockMembers[1].score);
    expect(res.body[1].data.numAttend).toEqual(mockMembers[1].numAttend);
    expect(res.body[1].data.name).toEqual(mockMembers[1].name);
    expect(res.body[1].data.username).toEqual(mockMembers[1].username);
    expect(res.body[1].data.program).toEqual(mockMembers[1].program);
    expect(res.body[1].data.role).toEqual(mockMembers[1].role);
  });

  // no members exist
  it('should return an empty array if no members exist', async () => {
    jest.spyOn(membersService, 'getAllMembers').mockResolvedValue([]);

    const res = await request(app.getHttpServer()).get('/v1/members');
    assertStatusCode(res, 200);
    expect(res.body).toEqual([]);
  });

  /* get a member by id */
  // valid id
  it('should return a member with the id of 1', async () => {
    const mockMember: MemberResponseDTO = {
      id: 1,
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(membersService, 'getMember').mockResolvedValueOnce(mockMember);

    const res = await request(app.getHttpServer()).get('/v1/members/1');

    assertStatusCode(res, 200);
    expect(res.body.data.id).toEqual(mockMember.id);
    expect(res.body.data.score).toEqual(mockMember.score);
    expect(res.body.data.numAttend).toEqual(mockMember.numAttend);
    expect(res.body.data.name).toEqual(mockMember.name);
    expect(res.body.data.username).toEqual(mockMember.username);
    expect(res.body.data.program).toEqual(mockMember.program);
    expect(res.body.data.role).toEqual(mockMember.role);
  });

  // invalid id
  it('invalid request, should return 400 bad request', async () => {
    const memberId = 100;
    const res = await request(app.getHttpServer()).get(
      `/v1/members/${memberId}`,
    );
    expect(res.statusCode).toEqual(400);
  });

  /* get member(s) by search key */
  // valid search key
  it('should return a member who contains the search key in their name, username, role, or program', async () => {
    const mockMembers: MemberResponseDTO[] = [
      {
        id: 1,
        score: 0,
        numAttend: 0,
        name: 'testName1',
        username: 'test1',
        program: 'Computer Science',
        role: 'Member',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        score: 10,
        numAttend: 1,
        name: 'testName2',
        username: 'test2',
        program: 'Computer Science',
        role: 'Member',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        score: 0,
        numAttend: 0,
        name: 'testName3',
        username: 'test3',
        program: 'Statistics',
        role: 'Member',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest
      .spyOn(membersService, 'searchMember')
      .mockImplementation(async (searchKey: string) => {
        return mockMembers.filter(
          (member) =>
            member.name.includes(searchKey) ||
            member.username.includes(searchKey) ||
            member.role.includes(searchKey) ||
            member.program.includes(searchKey),
        );
      });

    const res = await request(app.getHttpServer()).get(
      'v1/members/search/Computer',
    );
    const searchKey = 'Computer';

    assertStatusCode(res, 200);
    expect(res.body.data).toEqual(
      mockMembers.filter(
        (member) =>
          member.name.includes(searchKey) ||
          member.username.includes(searchKey) ||
          member.role.includes(searchKey) ||
          member.program.includes(searchKey),
      ),
    );
  });

  // invalid search key
  it('should return an empty array since no members with the search key exist', async () => {
    const mockMembers: MemberResponseDTO[] = [
      {
        id: 1,
        score: 0,
        numAttend: 0,
        name: 'testName1',
        username: 'test1',
        program: 'Computer Science',
        role: 'Member',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        score: 10,
        numAttend: 1,
        name: 'testName2',
        username: 'test2',
        program: 'Computer Science',
        role: 'Member',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        score: 0,
        numAttend: 0,
        name: 'testName3',
        username: 'test3',
        program: 'Statistics',
        role: 'Member',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(membersService, 'getAllMembers').mockResolvedValue([]);

    const res = await request(app.getHttpServer()).get(
      '/v1/members/search/InvalidKey',
    );
    assertStatusCode(res, 200);
    expect(res.body.data).toEqual([]);
  });

  /* leaderboard */
  // members exist
  it('should return the top 5 (max) members based on their score', async () => {
    const mockMembers: MemberResponseDTO[] = [
      {
        id: 1,
        score: 10,
        numAttend: 0,
        name: 'testName1',
        username: 'test1',
        program: Program.COMPUTER_SCIENCE,
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        score: 9,
        numAttend: 1,
        name: 'testName2',
        username: 'test2',
        program: Program.COMPUTER_SCIENCE,
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        score: 8,
        numAttend: 0,
        name: 'testName3',
        username: 'test3',
        program: Program.STATISTICS,
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        score: 7,
        numAttend: 0,
        name: 'testName4',
        username: 'test4',
        program: Program.STATISTICS,
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        score: 6,
        numAttend: 0,
        name: 'testName5',
        username: 'test5',
        program: Program.STATISTICS,
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // only 5 members exist, should return those 5 in the order of descending scores
    jest
      .spyOn(membersService, 'createLeaderboard')
      .mockImplementation(async () => {
        return mockMembers.sort((a, b) => b.score - a.score).slice(0, 5);
      });

    const res = await request(app.getHttpServer()).get(
      '/v1/members/leaderboard/top5',
    );
    assertStatusCode(res, 200);
    expect(res.body.data).toEqual(
      mockMembers.sort((a, b) => b.score - a.score).slice(0, 5),
    );
  });

  // no members exist
  it('should return an empty array if no members exist', async () => {
    jest.spyOn(membersService, 'getAllMembers').mockResolvedValue([]);

    const res = await request(app.getHttpServer()).get(
      '/v1/members/leaderboard/top5',
    );
    assertStatusCode(res, 200);
    expect(res.body.data).toEqual([]);
  });

  /* update a member */
  // valid id
  it('should return the updated member', async () => {
    const mockMemberPre: MemberResponseDTO = {
      id: 1,
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockMemberPost: MemberResponseDTO = {
      id: 1,
      score: 100,
      numAttend: 2,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(membersService, 'editMember').mockResolvedValue(mockMemberPost);

    const res = await request(app.getHttpServer()).put('/v1/members/1').send({
      score: 100,
      numAttend: 2,
    });

    assertStatusCode(res, 200);
    expect(res.body.data).toEqual(mockMemberPost);
  });

  // invalid id
  it('inavlid request, should return 400 bad request', async () => {
    const res = await request(app.getHttpServer()).put('/v1/members/999').send({
      score: 100,
      numAttend: 2,
    });
    expect(res.statusCode).toEqual(400);
  });

  /* delete a member */
  // valid id
  it('should return the deleted member', async () => {
    const mockMember: MemberResponseDTO = {
      id: 1,
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(membersService, 'removeMember').mockResolvedValue(mockMember);

    const res = await request(app.getHttpServer()).delete('/v1/members/1');

    assertStatusCode(res, 200);
    expect(res.body.data).toEqual(mockMember);
  });

  //invalid id
  it('invalid request, should return 400 bad request', async () => {
    const res = await request(app.getHttpServer()).delete('/v1/members/1');
    expect(res.statusCode).toEqual(400);
  });
});
