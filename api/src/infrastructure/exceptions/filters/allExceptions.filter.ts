import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { constantCase } from 'change-case'
import { ValidationErrorResponse } from 'src/infrastructure/validation/errors/validationError.response'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception)
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    let status = exception['status'] || HttpStatus.INTERNAL_SERVER_ERROR
    let code = constantCase(
      exception['code'] ||
        exception['response']?.code ||
        'INTERNAL_SERVER_ERROR',
    )
    let message = exception['message'] || undefined

    if (exception?.['response'] instanceof ValidationErrorResponse) {
      const exc = exception['response']
      code = exc.code
      status = exc.status
      message = exc.exceptions
    }

    return response.status(status).json({ status, code, message })
  }
}
