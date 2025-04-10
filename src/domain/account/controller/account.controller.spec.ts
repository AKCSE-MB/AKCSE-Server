import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import { AccountModule } from '@domain/account/account.module';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import * as accountService from '@domain/account/service/account.service';

describe('account controller', () => {
  let app: INestApplication;
  let configService: ConfigurationService;
  beforeAll(async () => {
    const module = (await appModuleFixture(
      [],
      [],
      [AccountModule],
    )) as TestingModule;
    app = module.createNestApplication();
    configService = module.get<ConfigurationService>(ConfigurationService);
    await app.init();
  });

  it('should return tokens', async () => {
    const data = {
      accessToken: '',
      refreshToken: '',
      accessTokenExpiredAt: new Date(),
      refreshTokenExpiredAt: new Date(),
    };

    jest.spyOn(accountService, 'createToken').mockResolvedValueOnce(data);

    const res = await request(app.getHttpServer())
      .post('/v1/account/tokens')
      .send({
        code: 'code',
      });

    assertStatusCode(res, 200);
  });

  it('invalid request, should return tokens', async () => {
    const res = await request(app.getHttpServer()).post('/v1/account/tokens');
    assertStatusCode(res, 400);
  });
});
