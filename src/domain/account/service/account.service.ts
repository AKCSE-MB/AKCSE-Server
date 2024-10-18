import { CallerWrongUsageException } from "@common/exception/internal.exception";
import { getIdentification } from "@domain/account/repository/account.repository";
import { ErrorSubCategoryEnum } from "@common/exception/enum";
import bcrypt from 'bcrypt';
import { ConfigurationService } from "@domain/configuration/configuration.service";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';
import { add } from 'date-fns';

export type AccountEntity = Awaited<ReturnType<typeof getAccount>>;
export async function getAccount(
    identification: string,
) {
    const data = await getIdentification(identification);
    if(!data) {
        throw new CallerWrongUsageException(ErrorSubCategoryEnum.INVALID_INPUT,'no data');
    }
    return data;
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
    const token = makeTokens({ userId: entity.id });
    return token;
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
  