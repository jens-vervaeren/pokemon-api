import { Controller, Get, Inject, Query, Version } from "@nestjs/common"
import { Pokemon } from "@prisma/client"
import { GetPokemonsService } from "../services/pokemons/getPokemons.service"
import { GetPokemonsPaginatedService } from "../services/pokemons/getPokemonsPaginated.service"
import {
  getPokemonsQueryParamsV1Schema,
  getPokemonsQueryParamsV2Schema
} from "../schemasAndTypes/pokemons/schemas"
import {
  GetPokemonsQueryParamsV1,
  GetPokemonsQueryParamsV2,
  PaginatedPokemon
} from "../schemasAndTypes/pokemons/types"

@Controller("pokemons")
export class PokemonsController {
  constructor(
    @Inject(GetPokemonsService)
    private readonly getPokemonsService: GetPokemonsService,
    @Inject(GetPokemonsPaginatedService)
    private readonly getPokemonsPaginatedService: GetPokemonsPaginatedService
  ) {}

  @Version("1")
  @Get()
  async getAll(
    @Query() queryParams: GetPokemonsQueryParamsV1
  ): Promise<Pokemon[]> {
    const filteredQueryParams =
      getPokemonsQueryParamsV1Schema.parse(queryParams)
    return await this.getPokemonsService.execute(filteredQueryParams)
  }

  @Version("2")
  @Get()
  async getAllPaginated(
    @Query() queryParams: GetPokemonsQueryParamsV2
  ): Promise<PaginatedPokemon> {
    const filteredQueryParams =
      getPokemonsQueryParamsV2Schema.parse(queryParams)
    return await this.getPokemonsPaginatedService.execute(filteredQueryParams)
  }
}
