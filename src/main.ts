import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { EnvConfiguration } from 'config/configuration'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Sales-Force API')
    .setDescription('Sales-Force API endpoints')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const configService = app.get(ConfigService)
  const port = configService.get<EnvConfiguration>('config').port

  await app.listen(port)

  const logger = new Logger('Bootstrap')
  logger.log(`Application running on port ${port}`)
}
bootstrap()
