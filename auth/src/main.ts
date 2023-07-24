import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { exceptionBoot } from '@infrastructure/exceptions/exception.boot'
import { validationBoot } from '@infrastructure/validation/validation.boot'

import { getEnv } from '@infrastructure/rabbitMQ/rabbitMQ.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  exceptionBoot(app)
  validationBoot(app)

  const PORT = getEnv('AUTH_SEVICE_PORT') || 3010

  await app.listen(PORT, () =>
    console.log('Auth service has ben started on port ' + PORT),
  )
}
bootstrap()
