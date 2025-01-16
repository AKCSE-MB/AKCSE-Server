import { Module } from '@nestjs/common';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import { JwtService } from '@nestjs/jwt';
import { ResourcesController } from '@domain/resources/controller/resources.controller';
import { ConfigurationModule } from '@domain/configuration/configuration.module';

@Module({
  imports: [ConfigurationModule],
  controllers: [ResourcesController],
  providers: [ConfigurationService, JwtService],
})
export class ResourcesModule {}
