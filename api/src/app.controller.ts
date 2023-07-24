import { Body, Controller, Get, Post } from '@nestjs/common'
import { RMQService } from './infrastructure/rabbitMQ/rabbitPublish.service'
import { UserRegisterContract } from '../../contracts/auth/user.register.contract'
import { UserLoginContract } from '../../contracts/auth/user.login.contract'
import { UsersFindContract } from '../../contracts/others/users.find.contract'
import { ROOT_EXCHANGE } from '@infrastructure/rabbitMQ/rabbitMQ.module'

@Controller()
export class AppController {
  constructor(private readonly rmqService: RMQService) {}
  @Post('auth/register')
  async register(@Body() body: UserRegisterContract.Request) {
    return await this.rmqService.request<
      UserRegisterContract.Request,
      UserRegisterContract.Response
    >(ROOT_EXCHANGE, UserRegisterContract.route, body)
  }
  @Post('auth/login')
  async login(@Body() body: UserLoginContract.Request) {
    return await this.rmqService.request<
      UserLoginContract.Request,
      UserLoginContract.Response
    >(ROOT_EXCHANGE, UserLoginContract.route, body)
  }
  @Get('users')
  async findUsers() {
    return await this.rmqService.request<unknown, UsersFindContract.Response[]>(
      ROOT_EXCHANGE,
      UsersFindContract.route,
    )
  }
}
