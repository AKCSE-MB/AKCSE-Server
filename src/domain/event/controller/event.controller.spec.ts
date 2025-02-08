import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import * as eventService from '@domain/event/service/event.service';
import { EventModule } from '@domain/event/event.module';
import { createUserToken } from '@root/jest.setup';

describe('event controller', () => {
  let app: INestApplication;
  let configService: ConfigurationService;
  beforeAll(async () => {
    const module = (await appModuleFixture(
      [],
      [],
      [EventModule],
    )) as TestingModule;
    app = module.createNestApplication();
    configService = module.get<ConfigurationService>(ConfigurationService);
    await app.init();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should save events', async () => {
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });

    jest.spyOn(eventService, 'saveAkcseEvent').mockImplementation();

    const res = await request(app.getHttpServer())
      .post('/v1/event')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test-title',
        description: 'test-description',
        fee: 100_000,
        startDateTime: new Date(),
        endDateTime: new Date(),
        location: 'test-location',
        signUpDeadline: new Date(),
        updatedAt: new Date(),
      });

    assertStatusCode(res, 200);
  });

  it('should return events', async () => {
    jest.spyOn(eventService, 'getAkcseEvents').mockImplementation(async () => {
      return [];
    });

    const res = await request(app.getHttpServer()).get('/v1/event');

    expect(res.statusCode).toEqual(200);
  });

  it('should update events', async () => {
    const userId = 1;
    const eventId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });

    jest.spyOn(eventService, 'updateAkcseEvent').mockImplementation();

    const res = await request(app.getHttpServer())
      .put(`/v1/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'new-test-description',
        fee: 222_777,
        location: 'new-test-location',
      });

    assertStatusCode(res, 200);
  });

  it('should delete events', async () => {
    const userId = 1;
    const eventId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });

    jest.spyOn(eventService, 'deleteAkcseEvent').mockImplementation();

    const res = await request(app.getHttpServer())
      .delete(`/v1/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`);

    assertStatusCode(res, 200);
  });
});
