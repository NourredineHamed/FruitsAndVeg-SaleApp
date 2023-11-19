import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter'; // Import HttpExceptionFilter

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.use(cors()); 
  app.setGlobalPrefix('api');
  app.useLogger(new Logger());

  // Set up global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(4000);
}
bootstrap();
