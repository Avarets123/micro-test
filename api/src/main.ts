import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { getEnv } from '@infrastructure/rabbitMQ/rabbitMQ.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const PORT = getEnv('API_SEVICE_PORT') || 3011

  await app.listen(PORT, () =>
    console.log(`Api service has ben started on port ${PORT}`),
  )
}

bootstrap()
