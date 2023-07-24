import { INestApplication } from '@nestjs/common'
import { AllExceptionsFilter } from './filters/allExceptions.filter'

export function exceptionBoot(app: INestApplication) {
  app.useGlobalFilters(new AllExceptionsFilter())
}
