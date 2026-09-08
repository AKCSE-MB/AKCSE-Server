import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import * as eventsService from '@domain/events/service/events.service';
import { EventsController } from '@domain/events/controller/events.controller';
import { EventRecord } from '@domain/events/repository/events.repository';

describe('events controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = (await appModuleFixture(
      [EventsController],
      [],
    )) as TestingModule;
    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    jest.resetAllMocks();
  });

  describe('/v1/events', () => {
    it('should return an empty array when there are no events', async () => {
      jest.spyOn(eventsService, 'getEvents').mockResolvedValueOnce([]);

      const res = await request(app.getHttpServer()).get('/v1/events');

      assertStatusCode(res, 200);
      expect(res.body.data).toEqual([]);
    });

    it('should return the events from the service', async () => {
      const events: EventRecord[] = [
        {
          id: 1,
          title: 'test-title',
          description: 'test-description',
          fee: 100_000,
          startDateTime: new Date('2500-01-01'),
          endDateTime: new Date('2500-01-02'),
          location: 'test-location',
          signUpDeadline: new Date('2500-01-01'),
          rsvpLink: '',
          images: [],
          createdAt: new Date('2500-01-01'),
          updatedAt: new Date('2500-01-01'),
        },
      ];
      jest.spyOn(eventsService, 'getEvents').mockResolvedValueOnce(events);

      const res = await request(app.getHttpServer()).get('/v1/events');

      assertStatusCode(res, 200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0]).toHaveProperty('title', 'test-title');
    });

    it('should call the service exactly once', async () => {
      const spy = jest
        .spyOn(eventsService, 'getEvents')
        .mockResolvedValueOnce([]);

      await request(app.getHttpServer()).get('/v1/events');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
