import { V1ConfigurationController } from '@domain/configuration/configuration.controller';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import request from 'supertest';

describe('configuration controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = (await appModuleFixture(
      [V1ConfigurationController],
      [ConfigurationService],
    )) as TestingModule;
    app = module.createNestApplication();
    await app.init();
  });

  describe('/v1/configuration', () => {
    it('should return env', async () => {
      const res = await request(app.getHttpServer()).get('/v1/configuration');
      assertStatusCode(res, 200);
      expect(res.body).toHaveProperty('env');
    });
  });

  describe('/v1/healthcheck', () => {
    it('Successfully return server health check', async () => {
      const res = await request(app.getHttpServer())
        .get('/v1/configuration/healthcheck')
        .send();

      assertStatusCode(res, 200);
      expect(res.body).toHaveProperty('serverTime');
      expect(res.body).toHaveProperty('version');
    });
  });
});
