import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserService } from './user.service'
import { UserLoginContract } from 'src/contracts/auth/user.login.contract'
import { UserRegisterContract } from 'src/contracts/auth/user.register.contract'
import { UsersFindContract } from 'src/contracts/others/users.find.contract'
import { ROOT_EXCHANGE } from '@infrastructure/rabbitMQ/rabbitMQ.module'
import { QueuesEnum } from '@infrastructure/rabbitMQ/enums/queues.enum'
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq'

@Injectable()
export class AuthRmqService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @RabbitRPC({
    exchange: ROOT_EXCHANGE,
    routingKey: UserRegisterContract.route,
    queue: QueuesEnum.USER_REGISTER,
  })
  async register(body: UserRegisterContract.Request) {
    try {
      return await this.authService.register(body)
    } catch (error) {
      console.log(error)

      const { message, status } = error

      return new HttpException(
        {
          message,
          status: status.status,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  @RabbitRPC({
    exchange: ROOT_EXCHANGE,
    routingKey: UserLoginContract.route,
    queue: QueuesEnum.USER_LOGIN,
  })
  async login(body: UserLoginContract.Request) {
    try {
      return await this.authService.login(body)
    } catch (error) {
      console.log(error)

      const { message, status } = error

      return new HttpException(
        {
          message,
          status: status.status,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  @RabbitRPC({
    exchange: ROOT_EXCHANGE,
    routingKey: UsersFindContract.route,
    queue: QueuesEnum.USERS_FIND,
  })
  async findUsers() {
    try {
      return await this.userService.findUsers()
    } catch (error) {
      console.log(error)

      const { message, status } = error

      return new HttpException(
        {
          message,
          status: status.status,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
