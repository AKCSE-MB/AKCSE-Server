import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import { MembersModule } from '@domain/members/members.module';
import * as membersService from '@domain/members/service/members.service';
import { Program, Role } from '@domain/members/members.enum';
import { MembersResponseDTO } from '@domain/members/dto/members.dto';
import { createUserToken } from '@root/jest.setup';
import { ConfigurationService } from '@domain/configuration/configuration.service';
describe('members controller', () => {
  let app: INestApplication;
  let configService: ConfigurationService;

  beforeAll(async () => {
    const module = (await appModuleFixture(
      [],
      [],
      [MembersModule],
    )) as TestingModule;

    configService = module.get<ConfigurationService>(ConfigurationService);
    app = module.createNestApplication();
    await app.init();
  });

  it('should create a new member', async () => {
    jest.spyOn(membersService, 'createMember').mockImplementation();

    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });

    const res = await request(app.getHttpServer())
      .post('/v1/members')
      .set('Authorization', `Bearer ${token}`)
      .send({
        score: 0,
        numAttend: 0,
        name: 'testName1',
        username: 'test1',
        program: Program.COMPUTER_SCIENCE,
        role: Role.MEMBER,
      });

    assertStatusCode(res, 200);
  });

  it('should return all members', async () => {
    const data = [
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

    jest.spyOn(membersService, 'getAllMembers').mockResolvedValueOnce(data);

    const expectedNum = 2;
    const res = await request(app.getHttpServer()).get('/v1/members');

    assertStatusCode(res, 200);
    expect(res.body.data.length).toEqual(expectedNum);
  });

  it('should return an empty array if no members exist', async () => {
    jest.spyOn(membersService, 'getAllMembers').mockResolvedValueOnce([]);

    const res = await request(app.getHttpServer()).get('/v1/members');

    assertStatusCode(res, 200);
    expect(res.body.data).toEqual([]);
  });

  it('should return a member with the id of 1', async () => {
    const data = {
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

    jest.spyOn(membersService, 'getMember').mockResolvedValueOnce(data);

    const res = await request(app.getHttpServer()).get(
      `/v1/members/${data.id}`,
    );

    assertStatusCode(res, 200);
    expect(res.body.data).not.toBeNull();
  });

  it('invalid request, should return 400 bad request', async () => {
    const memberId = 100;
    const res = await request(app.getHttpServer()).get(
      `/v1/members/${memberId}`,
    );

    assertStatusCode(res, 400);
  });

  it('should return the top 5 (max) members based on their score', async () => {
    const data = [
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

    const expectedNum = 5;

    jest.spyOn(membersService, 'getLeaderboard').mockResolvedValueOnce(data);

    const res = await request(app.getHttpServer()).get(
      '/v1/members/leaderboard',
    );

    assertStatusCode(res, 200);
    expect(res.body.data.length).toEqual(expectedNum);
  });

  it('should return an empty array if no members exist', async () => {
    jest.spyOn(membersService, 'getLeaderboard').mockResolvedValueOnce([]);

    const res = await request(app.getHttpServer()).get(
      '/v1/members/leaderboard',
    );

    assertStatusCode(res, 200);
    expect(res.body.data).toEqual([]);
  });

  it('should return the updated member', async () => {
    const data = {
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
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });

    jest.spyOn(membersService, 'editMember').mockResolvedValueOnce(data);

    const res = await request(app.getHttpServer())
      .put(`/v1/members/${data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    assertStatusCode(res, 200);
    expect(res.body).not.toBeNull();
  });

  it('inavlid request, should return 400 bad request', async () => {
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });
    const memberId = 100;
    const res = await request(app.getHttpServer())
      .put(`/v1/members/${memberId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        score: 100,
        numAttend: 2,
      });

    assertStatusCode(res, 400);
  });

  it('should return the deleted member', async () => {
    const data = {
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
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });

    jest.spyOn(membersService, 'removeMember').mockResolvedValueOnce(data);

    const res = await request(app.getHttpServer())
      .delete(`/v1/members/${data.id}`)
      .set('Authorization', `Bearer ${token}`);

    assertStatusCode(res, 200);
    expect(res.body.data).not.toBeNull();
  });

  it('invalid request, should return 400 bad request', async () => {
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });
    const memberId = 100;
    const res = await request(app.getHttpServer())
      .delete(`/v1/members/${memberId}`)
      .set('Authorization', `Bearer ${token}`);

    assertStatusCode(res, 400);
  });
});
