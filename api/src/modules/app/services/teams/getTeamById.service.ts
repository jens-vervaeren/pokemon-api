import { Injectable, NotFoundException } from "@nestjs/common"
import { Team } from "@prisma/client"
import { PrismaService } from "../../../prisma/services/prisma.service"

@Injectable()
export class GetTeamByIdService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(teamId: number): Promise<Team> {
    const foundTeam = await this.prisma.team.findUnique({
      where: {
        id: teamId
      }
    })

    if (!foundTeam) throw new NotFoundException("Team not found")

    return foundTeam
  }
}
