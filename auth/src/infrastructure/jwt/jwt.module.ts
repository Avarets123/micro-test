import { getEnv } from '@infrastructure/rabbitMQ/rabbitMQ.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

const secret = getEnv('JWT_SECRET') || 'secret'
const expiresIn = getEnv('JWT_EXPIRES') || '6h'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret,
      signOptions: { expiresIn },
    }),
  ],
})
export class JWTModule {}
