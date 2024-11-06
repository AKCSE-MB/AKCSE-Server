import { Module } from '@nestjs/common';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import { JwtService } from '@nestjs/jwt';
import { MembersController } from './controller/members.controller';

@Module({
  controllers: [MembersController],
  providers: [ConfigurationService, JwtService],
})
export class MembersModule {}
