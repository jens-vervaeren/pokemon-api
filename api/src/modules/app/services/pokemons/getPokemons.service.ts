import { Injectable } from "@nestjs/common"
import { Pokemon, Prisma } from "@prisma/client"
import { PrismaService } from "../../../prisma/services/prisma.service"
import {
  GetPokemonsFilterOptions,
  SortQueryParam
} from "../../schemasAndTypes/pokemons/types"

@Injectable()
export class GetPokemonsService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(
    filterOptions?: GetPokemonsFilterOptions
  ): Promise<Pokemon[]> {
    return await this.prisma.pokemon.findMany({
      skip: filterOptions?.offset,
      take: filterOptions?.limit,
      orderBy: this.buildOrderByClause(filterOptions?.sort)
    })
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
