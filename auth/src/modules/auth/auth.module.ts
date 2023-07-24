import { Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { UserService } from './services/user.service'
import { AuthController } from './controllers/auth.controller'

@Module({
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
