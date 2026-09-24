import { LoggerService } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { EnvironmentEnum } from '@src/env.validation';

export function createLogger(): LoggerService {
  const env = process.env.ENV;
  const isLocal = env === EnvironmentEnum.LOCAL || env === EnvironmentEnum.TEST;

  return WinstonModule.createLogger({
    level: 'info',
    transports: [
      new transports.Console({
        format: isLocal
          ? format.combine(
              format.timestamp(),
              utilities.format.nestLike('AKCSE', { prettyPrint: true }),
            )
          : format.combine(format.timestamp(), format.json()),
      }),
    ],
  });
}
