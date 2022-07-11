import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = new ConfigService().get('PORT') || 5232;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
