import { Controller, Get, Inject, Query } from "@nestjs/common"
import { Pokemon } from "@prisma/client"
import { SearchPokemonsQueryParams } from "../schemasAndTypes/search/types"
import { searchPokemonsQueryParamsSchema } from "../schemasAndTypes/search/schemas"
import { SearchPokemonBySearchParamsService } from "../services/search/searchPokemonBySearchParams.service"

@Controller({
  path: "search",
  version: "1"
})
export class SearchController {
  constructor(
    @Inject(SearchPokemonBySearchParamsService)
    private readonly searchPokemonBySearchParamsService: SearchPokemonBySearchParamsService
  ) {}

  @Get()
  async searchPokemon(
    @Query() queryParams: SearchPokemonsQueryParams
  ): Promise<Pokemon[]> {
    const filteredQueryParams =
      searchPokemonsQueryParamsSchema.parse(queryParams)
    return await this.searchPokemonBySearchParamsService.execute(
      filteredQueryParams
    )
  }
}
