import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe
} from "@nestjs/common"
import { Team } from "@prisma/client"
import { GetAllTeamsService } from "../services/teams/getAllTeams.service"
import { GetTeamByIdService } from "../services/teams/getTeamById.service"
import { ZodPipe } from "../pipes/zod.pipe"
import { createTeamSchema } from "../schemasAndTypes/teams/schemas"
import { CreateTeamPayload } from "../schemasAndTypes/teams/types"
import { CreateTeamService } from "../services/teams/createTeam.service"

@Controller({
  path: "teams",
  version: "1"
})
export class TeamsController {
  constructor(
    @Inject(GetAllTeamsService)
    private readonly getAllTeamsService: GetAllTeamsService,
    @Inject(GetTeamByIdService)
    private readonly getTeamByIdService: GetTeamByIdService,
    @Inject(CreateTeamService)
    private readonly createTeamService: CreateTeamService
  ) {}

  @Get()
  async index(): Promise<Team[]> {
    return await this.getAllTeamsService.execute()
  }

  @Get("/:id")
  async show(@Param("id", ParseIntPipe) id: number): Promise<Team> {
    return await this.getTeamByIdService.execute(id)
  }

  @Post()
  @HttpCode(201)
  async createTeam(
    @Body(new ZodPipe(createTeamSchema)) createTeamPayload: CreateTeamPayload
  ): Promise<Team> {
    return await this.createTeamService.execute(createTeamPayload)
  }
}
