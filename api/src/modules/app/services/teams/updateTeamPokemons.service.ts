import { Injectable, Inject } from "@nestjs/common"
import { Team } from "@prisma/client"
import { PrismaService } from "../../../prisma/services/prisma.service"
import { GetTeamByIdService } from "./getTeamById.service"
import { DoPokemonsExistInDbService } from "../pokemons/doPokemonsExistInDb.service"
import { UpdateTeamPokemonsPayload } from "../../schemasAndTypes/teams/types"

@Injectable()
export class UpdateTeamPokemonsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(DoPokemonsExistInDbService)
    private readonly doPokemonsExistInDbService: DoPokemonsExistInDbService,
    @Inject(GetTeamByIdService)
    private readonly getTeamByIdService: GetTeamByIdService
  ) {}

  public async execute(
    teamId: number,
    updateTeamPokemonsPayload: UpdateTeamPokemonsPayload
  ): Promise<Team> {
    await this.doPokemonsExistInDbService.execute(
      updateTeamPokemonsPayload.pokemons
    )
    await this.getTeamByIdService.execute(teamId)

    return await this.prisma.team.update({
      where: {
        id: teamId
      },
      data: {
        pokemons: updateTeamPokemonsPayload.pokemons
      }
    })
  }
}
