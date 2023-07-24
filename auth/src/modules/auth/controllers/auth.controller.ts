import { RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { Controller } from '@nestjs/common'
import { UserRegisterContract } from '../../../../../contracts/auth/user.register.contract'
import { UserLoginContract } from '../../../../../contracts/auth/user.login.contract'
import { UsersFindContract } from '../../../../../contracts/others/users.find.contract'
import { AuthService } from '../services/auth.service'
import { UserService } from '../services/user.service'

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @RabbitRPC({ routingKey: UserRegisterContract.route })
  async register(body: UserRegisterContract.Request) {
    return await this.authService.register(body)
  }

  @RabbitRPC({ routingKey: UserLoginContract.route })
  async login(body: UserLoginContract.Request) {
    return await this.authService.login(body)
  }

  @RabbitRPC({ routingKey: UsersFindContract.route })
  async findUsers() {
    return await this.userService.findUsers()
  }
}
