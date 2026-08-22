import { Module } from '@nestjs/common';
import { ExecutivesController } from '@domain/executives/controller/executives.controller';

@Module({
  controllers: [ExecutivesController],
})
export class ExecutivesModule {}
