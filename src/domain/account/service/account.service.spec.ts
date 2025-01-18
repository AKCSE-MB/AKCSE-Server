import { truncateTables } from '@root/jest.setup';
import * as accountService from '@domain/account/service/account.service';
import prismaClient from '@common/database/prisma';
import { Role } from '../account.enum';

describe('account service', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['accounts']);
  });

  it('should return auth entity', async () => {
    const dto = {
      identification: 'test',
      role: Role.MEMBER,
    };
    await accountService.createAccount({ ...dto });

    const entity = await accountService.getAccount(dto.identification);
    expect(entity).not.toBeNull();
  });

  it('should create token', async () => {
    const dto = {
      identification: 'test',
      role: Role.MEMBER,
    };

    await accountService.createAccount({ ...dto });

    const token = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      accessTokenExpiredAt: new Date(),
      refreshTokenExpiredAt: new Date(),
    };
    jest.spyOn(accountService, 'createToken').mockResolvedValueOnce(token);

    expect(token).not.toBeNull();
    expect(token).toHaveProperty('accessToken');
    expect(token).toHaveProperty('refreshToken');
  });
});
