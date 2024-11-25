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
  it('should create a new member', async () => {
    jest.spyOn(membersService, 'createMember');

    const res = await request(app.getHttpServer()).post('/v1/members').send({
      score: 0,
      numAttend: 0,
      name: 'testName1',
      username: 'test1',
      program: Program.COMPUTER_SCIENCE,
      role: Role.MEMBER,
    });

    assertStatusCode(res, 200);
  });

  /* get all members */
  // members exist
  it('should return all members', async () => {
    const mockMembers: MembersResponseDTO[] = [
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

    jest
      .spyOn(membersService, 'getAllMembers')
      .mockResolvedValueOnce(mockMembers);

    const expectedNum = 2;
    const res = await request(app.getHttpServer()).get('/v1/members');

    assertStatusCode(res, 200);
    expect(res.body.data.length).toEqual(expectedNum);
  });

  // no members exist
  it('should return an empty array if no members exist', async () => {
    jest.spyOn(membersService, 'getAllMembers').mockResolvedValueOnce([]);

    const res = await request(app.getHttpServer()).get('/v1/members');

    assertStatusCode(res, 200);
    expect(res.body.data).toEqual([]);
  });

  /* get a member by id */
  // valid id
  it('should return a member with the id of 1', async () => {
    const mockMember: MembersResponseDTO = {
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

    const res = await request(app.getHttpServer()).get(
      `/v1/members/${mockMember.id}`,
    );

    assertStatusCode(res, 200);
    expect(res.body.data).toEqual(mockMember);
  });

  // invalid id
  it('invalid request, should return 400 bad request', async () => {
    const memberId = 100;
    const res = await request(app.getHttpServer()).get(
      `/v1/members/${memberId}`,
    );

    assertStatusCode(res, 400);
  });

  /* leaderboard */
  // members exist
  it('should return the top 5 (max) members based on their score', async () => {
    const mockMembers: MembersResponseDTO[] = [
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
    jest.spyOn(membersService, 'getAllMembers').mockResolvedValueOnce([]);

    const res = await request(app.getHttpServer()).get(
      '/v1/members/leaderboard/top5',
    );
    assertStatusCode(res, 200);
    expect(res.body.data).toEqual([]);
  });

  /* update a member */
  // valid id
  it('should return the updated member', async () => {
    const mockMemberPre: MembersResponseDTO = {
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

    const mockMemberPost: MembersResponseDTO = {
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

    jest
      .spyOn(membersService, 'editMember')
      .mockResolvedValueOnce(mockMemberPost);

    const res = await request(app.getHttpServer())
      .put(`/v1/members/${mockMemberPost.id}`)
      .send({
        score: mockMemberPost.score,
        numAttend: mockMemberPost.numAttend,
      });

    assertStatusCode(res, 200);
    expect(res.body.data).not.toBeNull();
  });

  // invalid id
  it('inavlid request, should return 400 bad request', async () => {
    const memberId = 100;
    const res = await request(app.getHttpServer())
      .put(`/v1/members/${memberId}`)
      .send({
        score: 100,
        numAttend: 2,
      });

    assertStatusCode(res, 400);
  });

  /* delete a member */
  // valid id
  it('should return the deleted member', async () => {
    const mockMember: MembersResponseDTO = {
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

    jest
      .spyOn(membersService, 'removeMember')
      .mockResolvedValueOnce(mockMember);

    const res = await request(app.getHttpServer()).delete(
      `/v1/members/${mockMember.id}`,
    );

    assertStatusCode(res, 200);
    expect(res.body.data.data).toEqual(mockMember);
  });

  //invalid id
  it('invalid request, should return 400 bad request', async () => {
    const memberId = 100;
    const res = await request(app.getHttpServer()).delete(
      `/v1/members/${memberId}`,
    );

    assertStatusCode(res, 400);
  });
});
