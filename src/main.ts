import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ZodValidationPipe } from 'nestjs-zod';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const publicPath = join(__dirname, '..', 'public');
  app.useStaticAssets(publicPath);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ZodValidationPipe());
  app.enableCors();

  const port: string = config.port;
  await app.listen(port);

  Logger.log(`Application running on port ${port}`, 'NestApplication');
}
bootstrap();
