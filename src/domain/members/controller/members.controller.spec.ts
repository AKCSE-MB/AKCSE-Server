import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import { MembersModule } from '@domain/members/members.module';
import * as membersService from '@domain/members/service/members.service';
import { Program } from '@domain/members/members.enum';
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

  beforeEach(async () => {
    jest.resetAllMocks();
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

  it('should return the top 10 (max) members based on their score', async () => {
    const data = [
      {
        id: 1,
        score: 10,
        numAttend: 0,
        name: 'testName1',
        username: 'test1',
        program: Program.COMPUTER_SCIENCE,
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        score: 5,
        numAttend: 0,
        name: 'testName6',
        username: 'test6',
        program: Program.COMPUTER_SCIENCE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        score: 4,
        numAttend: 1,
        name: 'testName7',
        username: 'test7',
        program: Program.COMPUTER_SCIENCE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        score: 3,
        numAttend: 0,
        name: 'testName8',
        username: 'test8',
        program: Program.STATISTICS,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        score: 2,
        numAttend: 0,
        name: 'testName9',
        username: 'test9',
        program: Program.STATISTICS,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        score: 1,
        numAttend: 0,
        name: 'testName10',
        username: 'test10',
        program: Program.STATISTICS,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const expectedNum = 10;

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

  it('update request should succeed with a status code 200', async () => {
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });

    jest.spyOn(membersService, 'editMember').mockImplementation();

    const res = await request(app.getHttpServer())
      .put(`/v1/members/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    assertStatusCode(res, 200);
    expect(res.body).not.toBeNull();
  });

  it('inavlid request, should return 400 bad request', async () => {
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });
    const memberId = 1000;

    const res = await request(app.getHttpServer())
      .put(`/v1/members/${memberId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        score: 100,
        numAttend: 2,
      });

    assertStatusCode(res, 400);
  });

  it('delete request should succeed with ca status code 200', async () => {
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });
    const memberId = 1;

    jest.spyOn(membersService, 'removeMember').mockImplementation();

    const res = await request(app.getHttpServer())
      .delete(`/v1/members/${memberId}`)
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
