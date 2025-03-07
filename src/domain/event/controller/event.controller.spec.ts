import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import * as eventService from '@domain/event/service/event.service';
import { EventModule } from '@domain/event/event.module';
import { GetEventsOutput } from '@domain/event/dto/event.dto';

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
});
