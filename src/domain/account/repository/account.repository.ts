import prismaClient from '@common/database/prisma';
import { ErrorSubCategoryEnum } from '@root/src/common/exception/enum';
import { ErrorContents } from '@common/exception/internal.exception';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/lib/function';
import { Role } from '../account.enum';

type TokenRecord = {
  id: number;
  accountId: number;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt: Date;
  refreshTokenExpiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export async function saveAccount(param: {
  identification: string;
  role: Role;
}) {
  await saveAccounts([param]);
}

export async function saveAccounts(
  param: {
    identification: string;
    role: Role;
  }[],
) {
  return prismaClient.accounts.createMany({ data: param });
}

export async function getIdentification(identification: string) {
  return prismaClient.accounts.findFirst({
    where: {
      identification: identification,
    },
  });
}

export function findAccessToken(accessToken: string) {
  return pipe(accessToken, getToken);
}

export function getToken(
  accessToken: string,
): TE.TaskEither<ErrorContents, TokenRecord> {
  return pipe(
    TE.tryCatch(
      () =>
        prismaClient.tokens.findFirstOrThrow({
          where: { accessToken },
        }),
      E.toError,
    ),
    TE.mapError((_error) => {
      return {
        subCategory: ErrorSubCategoryEnum.INVALID_INPUT,
        message: 'no data, it is deleted so can not use',
      };
    }),
  );
}
