import { Module } from '@nestjs/common';
import { EventsController } from '@domain/events/controller/events.controller';

@Module({
  controllers: [EventsController],
})
export class EventsModule {}
