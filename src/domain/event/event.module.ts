import { Module } from '@nestjs/common';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import { JwtService } from '@nestjs/jwt';
import { EventController } from './controller/event.controller';

@Module({
  controllers: [EventController],
  providers: [ConfigurationService, JwtService],
})
export class EventModule {}
