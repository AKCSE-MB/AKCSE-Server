import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from '@src/common/logging/logging.module';
import { ConfigurationModule } from '@domain/configuration/configuration.module';
import { EventsModule } from '@domain/events/events.module';
import { validate } from '@src/env.validation';

@Module({
  imports: [
    ConfigurationModule,
    EventsModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate,
    }),
    LoggingModule,
  ],
})
export class AppModule {}
