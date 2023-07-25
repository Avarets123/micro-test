import { Module } from '@nestjs/common'
import { RMQModule } from '@infrastructure/rabbitMQ/rabbitMQ.module'
import { AppController } from './app.controller'
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    RMQModule,
    LoggerModule.forRootAsync({
      useFactory: () => ({
        pinoHttp: {
          customProps: () => ({
            context: 'HTTP',
          }),
          transport: {
            target: 'pino-pretty',
            options: { singleLine: true, colorize: true },
          },
        },
      }),
    }),
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
