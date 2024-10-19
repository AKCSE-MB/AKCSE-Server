import { truncateTables } from '@root/jest.setup';
import prismaClient from '@root/src/common/database/prisma';
import {
  getTokenByAccountId,
  saveToken,
} from '@domain/account/repository/token.repository';

describe('user-token repository', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['tokens']);
  });

  it('should return token', async () => {
    const data = {
      accountId: 1,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      accessTokenExpiredAt: new Date(),
      refreshTokenExpiredAt: new Date(),
    };
    await saveToken(data);

    const res = await getTokenByAccountId(data.accountId);
    expect(res).not.toBeNull();
  });

  it('should save token', async () => {
    const data = {
      accountId: 1,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      accessTokenExpiredAt: new Date(),
      refreshTokenExpiredAt: new Date(),
    };
    const res = await saveToken(data);

    expect(res).not.toBeNull();
  });
});
