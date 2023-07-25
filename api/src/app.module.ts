import { Module } from '@nestjs/common'
import { RMQModule } from '@infrastructure/rabbitMQ/rabbitMQ.module'
import { AppController } from './app.controller'

@Module({
  imports: [RMQModule],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
