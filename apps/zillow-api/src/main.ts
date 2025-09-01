/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { GlobalExceptionFilter } from './core/filters/global-exception.filter'
import { CustomValidationPipe } from './core/pipes/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  // Global Exception Filter
  app.useGlobalFilters(new GlobalExceptionFilter())

  // Enhanced Validation Pipe
  app.useGlobalPipes(new CustomValidationPipe())

  // Enable CORS if needed
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Zillow-BR API')
    .setDescription('This is the documentation for the Zillow-BR API')
    .setVersion('1.0')
    .addTag('api')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('open-api', app, documentFactory)

  const port = process.env.PORT || 4200
  await app.listen(port)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  )
}

bootstrap()
