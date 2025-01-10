import { Module } from '@nestjs/common';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import { JwtService } from '@nestjs/jwt';
import { EventController } from '@domain/event/controller/event.controller';

@Module({
  controllers: [EventController],
  providers: [ConfigurationService, JwtService],
})
export class EventModule {}
