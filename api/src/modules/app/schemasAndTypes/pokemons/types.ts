import { z } from "zod"
import {
  getPokemonsQueryParamsV1Schema,
  getPokemonsQueryParamsV2Schema,
  sortQueryParamSchema
} from "./schemas"
import { Pokemon } from "@prisma/client"

export type SortQueryParam = z.infer<typeof sortQueryParamSchema>

export type GetPokemonsQueryParamsV1 = z.infer<
  typeof getPokemonsQueryParamsV1Schema
>
export type GetPokemonsQueryParamsV2 = z.infer<
  typeof getPokemonsQueryParamsV2Schema
>
export type GetPokemonsFilterOptions = GetPokemonsQueryParamsV2

type PaginationMetadata = {
  next: string
  previous: string
  total: number
  pages: number
  page: number
}

export type PaginatedPokemon = {
  data: Pokemon[]
  metadata: PaginationMetadata
}
