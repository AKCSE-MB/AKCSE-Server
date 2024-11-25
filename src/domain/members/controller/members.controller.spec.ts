import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { appModuleFixture, assertStatusCode } from '@root/jest.setup';
import { MembersModule } from '@domain/members/members.module';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import * as membersService from '@domain/members/service/members.service';

describe('account controller', () => {
  let app: INestApplication;
  let configService: ConfigurationService;
  beforeAll(async () => {
    const module = (await appModuleFixture(
      [],
      [],
      [MembersModule],
    )) as TestingModule;
    app = module.createNestApplication();
    configService = module.get<ConfigurationService>(ConfigurationService);
    await app.init();
  });

  it('should create a new member', async () => {
    jest.spyOn(membersService, 'createMember').mockImplementation();

    const res = await request(app.getHttpServer())
      .post('/v1/account/tokens')
      .send({
        identification: 'test',
        password: 'pwd',
      });

    assertStatusCode(res, 200);
  });
});
