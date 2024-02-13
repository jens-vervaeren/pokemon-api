import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common"
import { Team } from "@prisma/client"
import { GetAllTeamsService } from "../services/teams/getAllTeams.service"
import { GetTeamByIdService } from "../services/teams/getTeamById.service"

@Controller({
  path: "teams",
  version: "1"
})
export class TeamsController {
  constructor(
    @Inject(GetAllTeamsService)
    private readonly getAllTeamsService: GetAllTeamsService,
    @Inject(GetTeamByIdService)
    private readonly getTeamByIdService: GetTeamByIdService
  ) {}

  @Get()
  async index(): Promise<Team[]> {
    return await this.getAllTeamsService.execute()
  }

  @Get("/:id")
  async show(@Param("id", ParseIntPipe) id: number): Promise<Team> {
    return await this.getTeamByIdService.execute(id)
  }
}
