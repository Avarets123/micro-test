import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@infrastructure/database/database.module'
import { RMQModule } from '@infrastructure/rabbitMQ/rabbitMQ.module'
import { JWTModule } from '@infrastructure/jwt/jwt.module'
import { AuthModule } from './modules/auth/auth.module'
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RMQModule,
    JWTModule,
    AuthModule,
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
})
export class AppModule {}
