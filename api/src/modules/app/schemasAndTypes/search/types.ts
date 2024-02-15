import { z } from "zod"
import { searchPokemonsQueryParamsSchema } from "./schemas"

export type SearchPokemonsQueryParams = z.infer<
  typeof searchPokemonsQueryParamsSchema
>
export type SearchPokemonParams = SearchPokemonsQueryParams
