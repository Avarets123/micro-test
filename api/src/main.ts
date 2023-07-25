import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { getEnv } from '@infrastructure/rabbitMQ/rabbitMQ.module'
import { RequestInterceptor } from '@infrastructure/interceptors/request.interceptor'
import { LoggerService } from '@infrastructure/interceptors/logger/logger.service'
import { exceptionBoot } from '@infrastructure/exceptions/exception.boot'
import { validationBoot } from '@infrastructure/validation/validation.boot'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  exceptionBoot(app)
  validationBoot(app)

  const PORT = getEnv('API_SEVICE_PORT') || 3011

  app.useGlobalInterceptors(new RequestInterceptor(new LoggerService()))

  await app.listen(PORT, () =>
    console.log(`Api service has ben started on port ${PORT}`),
  )
}

bootstrap()
