import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RMQService {
  constructor(private readonly amqp: AmqpConnection) {}

  publishMessage<T>(exchange: string, routingKey: string, message: T) {
    return this.amqp.publish(exchange, routingKey, message)
  }
}
