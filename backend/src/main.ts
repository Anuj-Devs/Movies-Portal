import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });

  const uploadDir = 'uploads';
  app.use('/uploads', express.static(path.join(process.cwd(), uploadDir)));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  await app.listen(port);
  console.log(`Backend server running on http://localhost:${port}`);
}
bootstrap();
