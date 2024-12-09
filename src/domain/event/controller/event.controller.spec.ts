import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import * as eventService from '@domain/event/service/event.service';
import { EventModule } from '@domain/event/event.module';

describe('account controller', () => {
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
    jest.spyOn(eventService, 'getAkcseEvents').mockImplementation(async () => {
      return [];
    });

    const res = await request(app.getHttpServer()).get('/v1/event');

    expect(res.statusCode).toEqual(200);
  });
});
