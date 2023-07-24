import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RMQService {
  constructor(private readonly amqp: AmqpConnection) {}

  request<DT, RT>(exchange: string, routingKey: string, payload?: DT) {
    return this.amqp.request<RT>({
      exchange,
      routingKey,
      payload,
    })
  }
}
