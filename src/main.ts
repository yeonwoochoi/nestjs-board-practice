import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  await app.listen(port);
  logger.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();
