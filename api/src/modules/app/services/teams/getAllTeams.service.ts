import { Injectable } from "@nestjs/common"
import { Team } from "@prisma/client"
import { PrismaService } from "../../../prisma/services/prisma.service"

@Injectable()
export class GetAllTeamsService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(): Promise<Team[]> {
    return await this.prisma.team.findMany()
  }
}
