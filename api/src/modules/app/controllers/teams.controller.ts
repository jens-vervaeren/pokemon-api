import { Controller, Get, Inject } from "@nestjs/common"
import { Team } from "@prisma/client"
import { GetAllTeamsService } from "../services/teams/getAllTeams.service"

@Controller({
  path: "teams",
  version: "1"
})
export class TeamsController {
  constructor(
    @Inject(GetAllTeamsService)
    private readonly getAllTeamsService: GetAllTeamsService
  ) {}

  @Get()
  async index(): Promise<Team[]> {
    return await this.getAllTeamsService.execute()
  }
}
