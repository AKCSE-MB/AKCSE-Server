import { Module } from '@nestjs/common';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import { V1ConfigurationController } from '@domain/configuration/configuration.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [V1ConfigurationController],
  providers: [ConfigurationService, ConfigService],
  exports: [ConfigurationService, ConfigService],
})
export class ConfigurationModule {}
