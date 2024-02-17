import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "../../../prisma/services/prisma.service"
import {
  GetPokemonsFilterOptions,
  ParsedPokemon,
  SortQueryParam
} from "../../schemasAndTypes/pokemons/types"
import { parsedPokemonsSchema } from "../../schemasAndTypes/pokemons/schemas"

@Injectable()
export class GetPokemonsService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(
    filterOptions?: GetPokemonsFilterOptions
  ): Promise<ParsedPokemon[]> {
    const pokemons = await this.prisma.pokemon.findMany({
      skip: filterOptions?.offset,
      take: filterOptions?.limit,
      orderBy: this.buildOrderByClause(filterOptions?.sort)
    })
    return parsedPokemonsSchema.parse(pokemons)
  }

  private buildOrderByClause(
    sortParam: SortQueryParam
  ): Prisma.PokemonOrderByWithRelationInput {
    if (!sortParam) return {}
    return {
      [sortParam[0]]: sortParam[1]
    }
  }
}
