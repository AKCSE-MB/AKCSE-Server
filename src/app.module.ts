import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from '@src/common/logging/logging.module';
import { ConfigurationModule } from '@domain/configuration/configuration.module';
import { AccountModule } from '@domain/account/account.module';
import { MembersModule } from '@domain/members/members.module';
import { validate } from '@src/env.validation';
import { EventModule } from '@domain/event/event.module';
import { SentryModule, SentryGlobalFilter } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { ResourcesModule } from '@domain/resources/resources.module';

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigurationModule,
    AccountModule,
    EventModule,
    MembersModule,
    ResourcesModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate,
    }),
    LoggingModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule {}
