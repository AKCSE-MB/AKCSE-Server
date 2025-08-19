import {
  UnauthorizedException,
  CallerWrongUsageException,
} from '@common/exception/internal.exception';
import {
  getIdentification,
  getToken,
  saveAccount,
} from '@domain/account/repository/account.repository';
import { ErrorSubCategoryEnum } from '@common/exception/enum';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { add } from 'date-fns';
import { pipe } from 'fp-ts/lib/function';
import { saveToken } from '@domain/account/repository/token.repository';
import { getKakaoUserData } from '@root/src/third_party/kakao/kakao';
import { CreateTokenRequest } from '../dto/account.dto';
import { Role } from '@prisma/client';

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
  role: Role;
}) {
  await saveAccount({
    identification: param.identification,
    role: param.role,
  });
}

export function findAccessToken(accessToken: string) {
  return pipe(accessToken, getToken);
}

export async function createToken(param: CreateTokenRequest) {
  const identification = await getKakaoUserData(param.code);
  const entity = await getAccount(String(identification)).catch(async () => {
    const newAccountParam = {
      identification: String(identification),
      role: Role.UNKNOWN,
    };
    await createAccount(newAccountParam);
    return getAccount(String(identification));
  });

  if (entity.role === Role.UNKNOWN) {
    // account not verified yet, return status code 401
    throw new UnauthorizedException();
  }

  const tokens = makeTokens({ userId: entity.id });
  await saveToken({
    accountId: entity.id,
    ...tokens,
  });
  return tokens;
}

function makeTokens(payload: { userId: number }) {
  const cfgService = new ConfigurationService(new ConfigService());
  const accessTokenExpiredAt = cfgService.getTokenData().accessTokenExpiredAt;
  const refreshTokenExpiredAt = cfgService.getTokenData().refreshTokenExpiredAt;

  const accessToken = jwt.sign(
    payload,
    cfgService.getTokenData().accessTokenSecret,
    { expiresIn: `${accessTokenExpiredAt}` },
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
