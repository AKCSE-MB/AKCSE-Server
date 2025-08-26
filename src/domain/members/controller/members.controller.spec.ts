import { ConfigurationService } from '@domain/configuration/configuration.service';
import { MembersModule } from '@domain/members/members.module';
import * as membersService from '@domain/members/service/members.service';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import {
  appModuleFixture,
  assertStatusCode,
  createUserToken,
} from '@root/jest.setup';
import request from 'supertest';
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
        name: 'testName1',
      });

    assertStatusCode(res, 200);
  });

  it('should return all members', async () => {
    const data = [
      {
        id: 1,
        score: 0,
        name: 'testName1',
        accountId: '1',
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        score: 10,
        name: 'testName2',
        accountId: '2',
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
      name: 'testName1',
      accountId: '1',
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

  it('should return the top 10 (max) members based on their score', async () => {
    const data = [
      {
        id: 1,
        score: 10,
        name: 'testName1',
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        score: 9,
        name: 'testName2',
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        score: 8,
        name: 'testName3',
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        score: 7,
        name: 'testName4',
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        score: 6,
        name: 'testName5',
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        score: 5,
        name: 'testName6',
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        score: 4,
        name: 'testName7',
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        score: 3,
        name: 'testName8',
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        score: 2,
        name: 'testName9',
        role: Role.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        score: 1,
        name: 'testName10',
        role: Role.MEMBER,
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
