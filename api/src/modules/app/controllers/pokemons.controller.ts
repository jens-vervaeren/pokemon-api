import { Controller, Get, Inject, Query, Version } from "@nestjs/common"
import { Pokemon } from "@prisma/client"
import { GetPokemonsService } from "../services/pokemons/getPokemons.service"
import { getPokemonsQueryParamsV1Schema } from "../schemasAndTypes/pokemons/schemas"
import { GetPokemonsQueryParamsV1 } from "../schemasAndTypes/pokemons/types"

@Controller("pokemons")
export class PokemonsController {
  constructor(
    @Inject(GetPokemonsService)
    private readonly getPokemonsService: GetPokemonsService
  ) {}

  @Version("1")
  @Get()
  async index(
    @Query() queryParams: GetPokemonsQueryParamsV1
  ): Promise<Pokemon[]> {
    const filteredQueryParams =
      getPokemonsQueryParamsV1Schema.parse(queryParams)
    return await this.getPokemonsService.execute(filteredQueryParams)
  }
}
