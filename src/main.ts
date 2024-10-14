import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const docsConfig = new DocumentBuilder()
  .setTitle('akcse-mb')
  .setDescription('Akcse MB API Document')
  .setVersion('1.0')
  .addServer('/api/v1')
  .build()
  const docs = SwaggerModule.createDocument(app, docsConfig)

  const config = app.get(ConfigService);
  const url = config.get<string>('API_SERVER_URL') as string;
  const port = config.get<number>('API_SERVER_PORT') as number;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  SwaggerModule.setup('api', app, docs);
  await app.listen(port);
}

bootstrap();
