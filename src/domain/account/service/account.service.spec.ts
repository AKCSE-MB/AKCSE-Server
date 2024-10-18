import { truncateTables } from '@root/jest.setup';
import {
    createAccount,
  createToken,
  getAccount,
} from '@domain/account/service/account.service';
import prismaClient from '@common/database/prisma';

describe('account service', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['accounts']);
  });

  it('should return auth entity', async () => {
    const dto = {
      identification: 'test',
      password: 'pwd',
    };
    await createAccount({ ...dto });

    const entity = await getAccount(dto.identification);
    expect(entity).not.toBeNull();
  });

  it('should create token', async () => {
    const dto = {
      identification: 'test',
      password: 'pwd',
    };
    await createAccount({ ...dto });

    const token = await createToken(dto);
    expect(token).not.toBeNull();
    expect(token).toHaveProperty('accessToken');
    expect(token).toHaveProperty('refreshToken');
  });
});
