import { Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { UserService } from './services/user.service'
import { AuthRmqService } from './services/authRmq.service'

@Module({
  providers: [AuthService, UserService, AuthRmqService],
  controllers: [],
})
export class AuthModule {}
