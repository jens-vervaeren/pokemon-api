import { Injectable } from "@nestjs/common"
import { Team } from "@prisma/client"
import { PrismaService } from "../../../prisma/services/prisma.service"
import { CreateTeamPayload } from "../../schemasAndTypes/teams/types"

@Injectable()
export class CreateTeamService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(createTeamPayload: CreateTeamPayload): Promise<Team> {
    return await this.prisma.team.create({
      data: createTeamPayload
    })
  }
}
