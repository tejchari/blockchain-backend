import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import basicAuth from 'express-basic-auth';

const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Blockchain-Backend')
    .setDescription('Blockchain-Backend')
    .setVersion('0.0.1')
    .addTag('')
    .addBearerAuth()
    .build();

  app.use(
    '/swagger',
    basicAuth({
      challenge: true,
      users: { admin: 'admin1234' },
    }),
  );

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
