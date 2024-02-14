import { Injectable } from "@nestjs/common"
import { Pokemon } from "@prisma/client"
import { PrismaService } from "../../../prisma/services/prisma.service"
import { GetPokemonsQueryParamsV1 } from "../../schemasAndTypes/pokemons/types"

@Injectable()
export class GetPokemonsService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(options?: GetPokemonsQueryParamsV1): Promise<Pokemon[]> {
    return await this.prisma.pokemon.findMany({
      orderBy: {
        ...options?.sort
      }
    })
  }
}
