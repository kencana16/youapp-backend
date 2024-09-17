import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yaml';
import { AppModule } from './app.module';


const port = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));


  const config = new DocumentBuilder()
    .setTitle('You App')
    .setDescription('You App API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`http://localhost:${port}`, 'Local development server') 
    .build();


  const document = SwaggerModule.createDocument(app, config);


  SwaggerModule.setup('swagger', app, document);
  app.use('/swagger/api-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });
  app.use('/swagger/api-yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/x-yaml');
    res.send(YAML.stringify(document));
  });


  await app.listen(port);
}

bootstrap();
