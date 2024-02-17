import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../../prisma/services/prisma.service"
import {
  UpsertPokemonDetailsDbEntry,
  PokemonDetailsDbEntry
} from "../../../prisma/schemasAndTypes/pokemons/types"
import { pokemonDetailsDbEntrySchema } from "../../../prisma/schemasAndTypes/pokemons/schemas"

@Injectable()
export class UpsertPokemonDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(
    data: UpsertPokemonDetailsDbEntry
  ): Promise<PokemonDetailsDbEntry> {
    const entry = await this.prisma.pokemonDetails.upsert({
      where: {
        pokemonId: data.pokemonId
      },
      create: data,
      update: data
    })

    return pokemonDetailsDbEntrySchema.parse(entry)
  }
}
