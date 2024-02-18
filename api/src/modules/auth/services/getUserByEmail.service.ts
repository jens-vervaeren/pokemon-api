import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { User } from "@prisma/client"
import { PrismaService } from "src/modules/prisma/services/prisma.service"

@Injectable()
export class GetUserByEmailService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService
  ) {}

  public async execute(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email
      }
    })
    if (!user) throw new NotFoundException("User not found")
    return user
  }
}
