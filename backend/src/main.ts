import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sqlLogger = new Logger('SQL');
  app.setGlobalPrefix("api");
  app.useLogger(sqlLogger);

  const config = new DocumentBuilder()
    .setTitle('Mini-Board')
    .setDescription('Mini-Board에 대한 API 명세서')
    .setVersion('1.2')
    .addTag('Boards')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3001);
}
bootstrap();
