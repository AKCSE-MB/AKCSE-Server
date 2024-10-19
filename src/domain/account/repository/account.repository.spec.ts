import { truncateTables } from '@root/jest.setup';
import prismaClient from '@common/database/prisma';
import {
  getIdentification,
  getToken,
  saveAccount,
  saveAccounts,
} from '@domain/account/repository/account.repository';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

describe('account repository', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['accounts']);
  });

  it('should return error with mesage', async () => {
    await pipe(
      getToken('some-token'),
      TE.mapError((error) => {
        console.log(error);
        expect(error).not.toBeNull();
      }),
    )();
  });

  it('should save account', async () => {
    const data = {
      identification: 'some@email.com',
      password: 'one-way-decoded-password',
    };
    await saveAccount(data);
    const account = await getIdentification(data.identification);
    expect(account).not.toBeNull();
  });

  it('should save accounts', async () => {
    const data = [
      {
        identification: 'some@email.com',
        password: 'one-way-decoded-password',
      },
    ];
    await saveAccounts(data);
    const account = await getIdentification(data[0].identification);
    expect(account).not.toBeNull();
  });
});
