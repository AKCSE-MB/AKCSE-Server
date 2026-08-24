import { Module } from '@nestjs/common';
import { EventsController } from '@domain/events/controller/events.controller';
import { EventsService } from '@domain/events/service/events.service';
import { EventsRepository } from '@domain/events/repository/events.repository';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
})
export class EventsModule {}
