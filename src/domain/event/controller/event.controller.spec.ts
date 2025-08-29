import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import {
  appModuleFixture,
  assertStatusCode,
  createUserToken,
} from '@root/jest.setup';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import * as eventService from '@domain/event/service/event.service';
import { EventModule } from '@domain/event/event.module';

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
    jest.resetAllMocks();
  });

  it('should return events', async () => {
    jest
      .spyOn(eventService, 'getAkcseEvents')
      .mockResolvedValueOnce({ upcoming: [], past: [] });

    const res = await request(app.getHttpServer()).get('/v1/event');

    assertStatusCode(res, 200);
  });

  it('should return past events', async () => {
    jest.spyOn(eventService, 'getPastEvents').mockImplementation(async () => {
      return [];
    });

    const res = await request(app.getHttpServer()).get('/v1/event/past');

    assertStatusCode(res, 200);
  });

  it('should return an event with the passed id', async () => {
    const data = {
      id: 1,
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: new Date(),
      endDateTime: new Date(),
      location: 'test-location',
      signUpDeadline: new Date(),
      rsvpLink: '',
      imageUrl: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(eventService, 'getAkcseEventById')
      .mockImplementation(async () => {
        return data;
      });

    const res = await request(app.getHttpServer()).get(`/v1/event/${data.id}`);

    assertStatusCode(res, 200);
    expect(res.body.data).not.toBeNull();
  });

  it('should create a new event', async () => {
    jest.spyOn(eventService, 'createEvent').mockImplementation();

    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });

    const res = await request(app.getHttpServer())
      .post('/v1/event')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test-title',
        description: 'test-description',
        fee: 100_000,
        startDateTime: '2000-01-01',
        endDateTime: '2000-01-01',
        location: 'test-location',
        signUpDeadline: '2000-01-01',
        rsvpLink: 'test-rsvpLink',
        imageUrl: 'test-imageUrl',
      });

    assertStatusCode(res, 200);
  });

  it('update request should succeed with a status code 200', async () => {
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });
    const eventId = 1;

    jest.spyOn(eventService, 'editEvent').mockImplementation();

    const res = await request(app.getHttpServer())
      .put(`/v1/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    assertStatusCode(res, 200);
    expect(res.body).not.toBeNull();
  });

  it('inavlid request, should return 400 bad request', async () => {
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });
    const eventId = 100;

    const res = await request(app.getHttpServer())
      .put(`/v1/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    assertStatusCode(res, 400);
  });

  it('delete request should succeed with a status code 200', async () => {
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });
    const eventId = 1;

    jest.spyOn(eventService, 'removeEvent').mockImplementation();

    const res = await request(app.getHttpServer())
      .delete(`/v1/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`);

    assertStatusCode(res, 200);
    expect(res.body.data).not.toBeNull();
  });

  it('invalid request, should return 400 bad request', async () => {
    const userId = 1;
    const key = configService.getTokenData().accessTokenSecret;
    const token = createUserToken(userId, key, { expiresIn: '1h' });
    const eventId = 100;

    const res = await request(app.getHttpServer())
      .delete(`/v1/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`);

    assertStatusCode(res, 400);
  });
});
