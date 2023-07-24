import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RMQModule } from '@infrastructure/rabbitMQ/rabbitMQ.module'
import { AppController } from './app.controller'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RMQModule],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
