import { Injectable, Inject } from "@nestjs/common"
import { PrismaService } from "src/modules/prisma/services/prisma.service"
import { CreateUserData } from "../schemasAndTypes/types"

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService
  ) {}

  public async execute(data: CreateUserData): Promise<void> {
    await this.prismaService.user.create({
      data: data
    })
  }
}
