import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import { ResourcesModule } from '@domain/resources/resources.module';
import * as resourcesService from '@domain/resources/service/resources.service';
import { createUserToken } from '@root/jest.setup';
import { ConfigurationService } from '@domain/configuration/configuration.service';

describe('resources controller', () => {
  let app: INestApplication;
  let configService: ConfigurationService;

  beforeAll(async () => {
    const module = (await appModuleFixture(
      [],
      [],
      [ResourcesModule],
    )) as TestingModule;

    configService = module.get<ConfigurationService>(ConfigurationService);
    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should create a new resource', async () => {
    jest.spyOn(resourcesService, 'createResource').mockImplementation();

    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });

    const res = await request(app.getHttpServer())
      .post('/v1/resources')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 1,
        title: 'Computer Science',
        description: 'Description',
        academicCalendarUrl:
          'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
      });

    assertStatusCode(res, 200);
  });

  it('should return all resources', async () => {
    const data = [
      {
        id: 1,
        title: 'Computer Science',
        description: 'Description',
        academicCalendarUrl:
          'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
      },
      {
        id: 2,
        title: 'Computer Science2',
        description: 'Description2',
        academicCalendarUrl:
          'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
      },
    ];

    jest.spyOn(resourcesService, 'getAllResources').mockResolvedValueOnce(data);

    const expectedNum = 2;
    const res = await request(app.getHttpServer()).get('/v1/resources');

    assertStatusCode(res, 200);
    expect(res.body.data.length).toEqual(expectedNum);
  });

  it('should return an empty array if no resources exist', async () => {
    jest.spyOn(resourcesService, 'getAllResources').mockResolvedValueOnce([]);

    const res = await request(app.getHttpServer()).get('/v1/resources');

    assertStatusCode(res, 200);
    expect(res.body.data).toEqual([]);
  });

  it('should return a resource with the id of 1', async () => {
    const data = {
      id: 1,
      title: 'Computer Science',
      description: 'Description',
      academicCalendarUrl:
        'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
    };

    jest.spyOn(resourcesService, 'getResource').mockResolvedValueOnce(data);

    const res = await request(app.getHttpServer()).get(
      `/v1/resources/${data.id}`,
    );

    assertStatusCode(res, 200);
    expect(res.body.data).not.toBeNull();
  });

  it('invalid request, should return 400 bad request', async () => {
    const resourceId = 100;
    const res = await request(app.getHttpServer()).get(
      `/v1/resources/${resourceId}`,
    );

    assertStatusCode(res, 400);
  });

  it('should return the updated resource', async () => {
    const userId = 1;
    const resourceId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });

    jest.spyOn(resourcesService, 'editResource').mockImplementation();

    const res = await request(app.getHttpServer())
      .put(`/v1/resources/${resourceId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Computer Science2',
        description: 'Description2',
      });

    assertStatusCode(res, 200);
  });

  it('should return the deleted resource', async () => {
    const userId = 1;
    const resourceId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });

    jest.spyOn(resourcesService, 'removeResource').mockImplementation();

    const res = await request(app.getHttpServer())
      .delete(`/v1/resources/${resourceId}`)
      .set('Authorization', `Bearer ${token}`);

    assertStatusCode(res, 200);
  });
});
