import { PrismaService } from '@infrastructure/database/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { UserRegisterContract } from '../../../../../contracts/auth/user.register.contract'
import { UserLoginContract } from '../../../../../contracts/auth/user.login.contract'
import { compare, hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    dto: UserRegisterContract.Request,
  ): Promise<UserRegisterContract.Response> {
    const { email, password: rawPassword } = dto

    await this.checkEmail(email)

    const password = await hash(rawPassword, 9)

    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    })
  }

  async login(
    dto: UserLoginContract.Request,
  ): Promise<UserLoginContract.Response> {
    const { email, password } = dto

    const hasUser = await this.prisma.user.findFirst({ where: { email } })

    if (!hasUser) {
      throw new BadRequestException('User not found')
    }

    if (!(await compare(password, hasUser.password))) {
      throw new BadRequestException('Invalid password')
    }

    const accessToken = this.jwtService.sign({ sub: hasUser.id })

    return {
      accessToken,
    }
  }

  private async checkEmail(email: string) {
    await this.prisma.user
      .findFirstOrThrow({
        where: {
          email,
        },
      })
      .catch(() => {
        throw new BadRequestException(`User by email: ${email} exists`)
      })
  }
}
