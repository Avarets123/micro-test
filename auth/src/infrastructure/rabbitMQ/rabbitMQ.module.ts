import {
  AmqpConnectionManager,
  RabbitMQExchangeConfig,
  RabbitMQModule,
  RabbitRpcParamsFactory,
} from '@golevelup/nestjs-rabbitmq'
import { Global, Module } from '@nestjs/common'
import { RMQService } from './rabbitPublish.service'

export const getEnv = (envName: string) => process.env[envName]

const user = getEnv('RMQ_USER') || 'user'
const password = getEnv('RMQ_PASSWORD') || 'password'
const host = getEnv('RMQ_HOST') || 'localhost:6666'
const uri = `amqp://${user}:${password}@${host}`

export const ROOT_EXCHANGE = 'root_exchange'

const RMQ_EXCHANGES: RabbitMQExchangeConfig[] = [
  {
    name: ROOT_EXCHANGE,
    type: 'direct',
    options: {
      durable: true,
    },
  },
]

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri,
      connectionInitOptions: { wait: true },
      connectionManagerOptions: {
        heartbeatIntervalInSeconds: 15,
        reconnectTimeInSeconds: 30,
      },
      exchanges: RMQ_EXCHANGES,
      prefetchCount: 1,
    }),
  ],
  providers: [RabbitRpcParamsFactory, AmqpConnectionManager, RMQService],
  exports: [RabbitRpcParamsFactory, AmqpConnectionManager, RMQService],
})
export class RMQModule {}
