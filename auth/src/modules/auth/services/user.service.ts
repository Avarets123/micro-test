import { PrismaService } from '@infrastructure/database/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUsers() {
    return this.prisma.user.findMany()
  }
}
