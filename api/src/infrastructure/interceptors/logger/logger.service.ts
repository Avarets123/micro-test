import { Injectable, Logger } from '@nestjs/common'
@Injectable()
export class LoggerService extends Logger {
  log(message: any, ...optionalParams: any[]): void {
    super.log(`[INFO] ${message}`, ...optionalParams)
  }
  error(message: any, ...optionalParams: any[]): void {
    super.error(`[ERROR] ${message}`, ...optionalParams)
  }
  warn(message: any, ...optionalParams: any[]): void {
    super.warn(`[WARN] ${message}`, ...optionalParams)
  }
}
