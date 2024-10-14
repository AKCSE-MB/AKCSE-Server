import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ServerConfig,
  ServerMetaData,
} from '@domain/configuration/dto/configuration.dto';
import { EnvironmentEnum } from '@root/src/env.validation';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  getServerConfig(): ServerConfig {
    const env = this.configService.get<EnvironmentEnum>(
      'ENV',
      EnvironmentEnum.LOCAL,
    );
    return {
      env,
    };
  }

  getServerMetaData(): ServerMetaData {
    return { serverTime: new Date().toISOString(), version: '0.0.1' };
  }

  getDataBaseUrl() {
    return this.configService.get<string>('DATABASE_URL');
  }
}
