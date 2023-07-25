import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { exceptionBoot } from '@infrastructure/exceptions/exception.boot'
import { validationBoot } from '@infrastructure/validation/validation.boot'

import { getEnv } from '@infrastructure/rabbitMQ/rabbitMQ.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const PORT = getEnv('AUTH_SEVICE_PORT') || 3010

  await app.init(() =>
    console.log('Auth service has ben inited on port ' + PORT),
  )
}
bootstrap()
