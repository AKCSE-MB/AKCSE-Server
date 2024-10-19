import { CallerWrongUsageException } from '@common/exception/internal.exception';
import {
  getIdentification,
  getToken,
  saveAccount,
} from '@domain/account/repository/account.repository';
import { ErrorSubCategoryEnum } from '@common/exception/enum';
import bcrypt from 'bcrypt';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { add } from 'date-fns';
import { pipe } from 'fp-ts/lib/function';
import { saveToken } from '@domain/account/repository/token.repository';

export type AccountEntity = Awaited<ReturnType<typeof getAccount>>;
export async function getAccount(identification: string) {
  const data = await getIdentification(identification);
  if (!data) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no data',
    );
  }
  return data;
}

export async function createAccount(param: {
  identification: string;
  password: string;
}) {
  const password = await encryptValue(param.password);
  await saveAccount({
    identification: param.identification,
    password,
  });
}

export function findAccessToken(accessToken: string) {
  return pipe(accessToken, getToken);
}

async function checkPassword(entity: AccountEntity, password: string) {
  const isMatched = await bcrypt.compare(password, entity.password);
  if (isMatched) {
    return;
  }

  throw new CallerWrongUsageException(
    ErrorSubCategoryEnum.INVALID_INPUT,
    'identification or password is not matched',
  );
}

export async function createToken(param: {
  identification: string;
  password: string;
}) {
  const entity = await getAccount(param.identification);

  await checkPassword(entity, param.password);
  const tokens = makeTokens({ userId: entity.id });
  await saveToken({
    accountId: entity.id,
    ...tokens,
  });
  return tokens;
}

async function encryptValue(value: string) {
  return bcrypt.hash(value, 10);
}

function makeTokens(payload: { userId: number }) {
  const cfgService = new ConfigurationService(new ConfigService());
  const accessTokenExpiredAt = cfgService.getTokenData().accessTokenExpiredAt;
  const refreshTokenExpiredAt = cfgService.getTokenData().refreshTokenExpiredAt;

  const accessToken = jwt.sign(
    payload,
    cfgService.getTokenData().accessTokenSecret,
    { expiresIn: `${accessTokenExpiredAt}s` },
  );

  const refreshToken = jwt.sign(
    payload,
    cfgService.getTokenData().refreshTokenSecret,
    { expiresIn: `${refreshTokenExpiredAt}` },
  );

  return {
    accessToken,
    refreshToken,
    accessTokenExpiredAt: add(new Date(), { seconds: accessTokenExpiredAt }),
    refreshTokenExpiredAt: add(new Date(), {
      seconds: refreshTokenExpiredAt,
    }),
  };
}
