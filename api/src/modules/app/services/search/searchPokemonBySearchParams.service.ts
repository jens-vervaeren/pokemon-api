import { Injectable } from "@nestjs/common"
import { Prisma, Pokemon } from "@prisma/client"
import { PrismaService } from "../../../prisma/services/prisma.service"
import { SearchPokemonParams } from "../../schemasAndTypes/search/types"
import { parsedPokemonsSchema } from "../../schemasAndTypes/pokemons/schemas"

@Injectable()
export class SearchPokemonBySearchParamsService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(searchParams: SearchPokemonParams): Promise<Pokemon[]> {
    const foundPokemons = await this.prisma.pokemon.findMany({
      where: this.buildWhereClause(searchParams.query),
      take: searchParams.limit
    })
    return parsedPokemonsSchema.parse(foundPokemons)
  }

  private buildWhereClause(query: string): Prisma.PokemonWhereInput {
    return {
      OR: [
        {
          name: {
            contains: query
          }
        },
        {
          types: {
            array_contains: [{ type: { name: query } }]
          }
        }
      ]
    }
  }
}
