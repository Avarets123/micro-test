import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@infrastructure/database/database.module'
import { RMQModule } from '@infrastructure/rabbitMQ/rabbitMQ.module'
import { JWTModule } from '@infrastructure/jwt/jwt.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RMQModule,
    JWTModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
