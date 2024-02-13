import { Injectable, NotFoundException } from "@nestjs/common"
import { Team } from "@prisma/client"
import { PrismaService } from "../../../prisma/services/prisma.service"

@Injectable()
export class GetTeamByIdService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(id: number): Promise<Team> {
    const foundTeam = await this.prisma.team.findUnique({
      where: {
        id
      }
    })

    if (!foundTeam) throw new NotFoundException("Team not found")

    return foundTeam
  }
}
