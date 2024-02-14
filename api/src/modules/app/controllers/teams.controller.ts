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
import { ZodPipe } from "../pipes/zod.pipe"
import { GetAllTeamsService } from "../services/teams/getAllTeams.service"
import { GetTeamByIdService } from "../services/teams/getTeamById.service"
import { CreateTeamService } from "../services/teams/createTeam.service"

import {
  createTeamSchema,
  updateTeamPokemonsSchema
} from "../schemasAndTypes/teams/schemas"
import {
  CreateTeamPayload,
  UpdateTeamPokemonsPayload
} from "../schemasAndTypes/teams/types"
import { UpdateTeamPokemonsService } from "../services/teams/updateTeamPokemons.service"

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
    private readonly createTeamService: CreateTeamService,
    @Inject(UpdateTeamPokemonsService)
    private readonly updateTeamPokemonsService: UpdateTeamPokemonsService
  ) {}

  @Get()
  async index(): Promise<Team[]> {
    return await this.getAllTeamsService.execute()
  }

  @Get("/:teamId")
  async show(@Param("teamId", ParseIntPipe) teamId: number): Promise<Team> {
    return await this.getTeamByIdService.execute(teamId)
  }

  @Post()
  async createTeam(
    @Body(new ZodPipe(createTeamSchema)) createTeamPayload: CreateTeamPayload
  ): Promise<Team> {
    return await this.createTeamService.execute(createTeamPayload)
  }

  @Post("/:teamId")
  @HttpCode(200)
  async updateTeamPokemons(
    @Param("teamId", ParseIntPipe) teamId: number,
    @Body(new ZodPipe(updateTeamPokemonsSchema))
    updateTeamPokemonsPayload: UpdateTeamPokemonsPayload
  ): Promise<Team> {
    return await this.updateTeamPokemonsService.execute(
      teamId,
      updateTeamPokemonsPayload
    )
  }
}
