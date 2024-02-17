import { z } from "zod"
import {
  getPokemonWithDetailsSchema,
  getPokemonsQueryParamsV1Schema,
  getPokemonsQueryParamsV2Schema,
  parsedPokemonSchema,
  sortQueryParamSchema
} from "./schemas"

export type SortQueryParam = z.infer<typeof sortQueryParamSchema>

export type GetPokemonsQueryParamsV1 = z.infer<
  typeof getPokemonsQueryParamsV1Schema
>
export type GetPokemonsQueryParamsV2 = z.infer<
  typeof getPokemonsQueryParamsV2Schema
>
export type GetPokemonsFilterOptions = GetPokemonsQueryParamsV2

export type ParsedPokemon = z.infer<typeof parsedPokemonSchema>
export type PokemonWithDetails = z.infer<typeof getPokemonWithDetailsSchema>

type PaginationMetadata = {
  next: string
  previous: string
  total: number
  pages: number
  page: number
}

export type PaginatedPokemon = {
  data: ParsedPokemon[]
  metadata: PaginationMetadata
}
