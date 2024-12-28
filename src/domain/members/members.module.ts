import { Module } from '@nestjs/common';
import { ConfigurationService } from '@domain/configuration/configuration.service';
import { JwtService } from '@nestjs/jwt';
import { MembersController } from '@domain/members/controller/members.controller';
import { ConfigurationModule } from '@domain/configuration/configuration.module';

@Module({
  imports: [ConfigurationModule],
  controllers: [MembersController],
  providers: [ConfigurationService, JwtService],
})
export class MembersModule {}
