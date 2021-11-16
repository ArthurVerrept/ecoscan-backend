import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // swagger setup
  const config = new DocumentBuilder()
  .setTitle('Netscapes-API')
  .setDescription('swagger description')
  .setVersion('1.0')
  .build()
  

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}

bootstrap()
