import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import * as executivesService from '@domain/executives/service/executives.service';
import { ExecutivesController } from '@domain/executives/controller/executives.controller';
import { ExecutiveRecord } from '@domain/executives/repository/executives.repository';

describe('executives controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = (await appModuleFixture(
      [ExecutivesController],
      [],
    )) as TestingModule;
    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    jest.resetAllMocks();
  });

  describe('/v1/executives', () => {
    it('should return an empty array when there are no executives', async () => {
      jest.spyOn(executivesService, 'getExecutives').mockResolvedValueOnce([]);

      const res = await request(app.getHttpServer()).get('/v1/executives');

      assertStatusCode(res, 200);
      expect(res.body.data).toEqual([]);
    });

    it('should return the executives from the service', async () => {
      const executives: ExecutiveRecord[] = [
        {
          id: 1,
          name: 'test-name',
          position: 'test-position',
          imageUrl: '',
          createdAt: new Date('2500-01-01'),
          updatedAt: new Date('2500-01-01'),
        },
      ];
      jest
        .spyOn(executivesService, 'getExecutives')
        .mockResolvedValueOnce(executives);

      const res = await request(app.getHttpServer()).get('/v1/executives');

      assertStatusCode(res, 200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0]).toHaveProperty('name', 'test-name');
    });

    it('should call the service exactly once', async () => {
      const spy = jest
        .spyOn(executivesService, 'getExecutives')
        .mockResolvedValueOnce([]);

      await request(app.getHttpServer()).get('/v1/executives');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
