import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import decorateGateway from './config/decorateSocket';
import { SocketGateway } from './socket/socket.gateway';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: config.get<string>('CLIENT_URL'),
  });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Inject config to SocketGateway
  decorateGateway(SocketGateway, config);
  await app.listen(3003);
}
bootstrap();
