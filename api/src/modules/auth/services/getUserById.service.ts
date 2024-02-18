import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { User } from "@prisma/client"
import { PrismaService } from "src/modules/prisma/services/prisma.service"

@Injectable()
export class GetUserByIdService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService
  ) {}

  public async execute(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id
      }
    })
    if (!user) throw new NotFoundException("User not found")
    return user
  }
}
