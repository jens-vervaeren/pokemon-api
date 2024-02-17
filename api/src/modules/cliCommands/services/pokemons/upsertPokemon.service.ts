import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../../prisma/services/prisma.service"
import {
  PokemonDbEntry,
  UpsertPokemonDbEntry
} from "../../../prisma/schemasAndTypes/pokemons/types"
import { pokemonDbEntrySchema } from "../../../prisma/schemasAndTypes/pokemons/schemas"

@Injectable()
export class UpsertPokemonService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(data: UpsertPokemonDbEntry): Promise<PokemonDbEntry> {
    const createdEntry = await this.prisma.pokemon.upsert({
      where: {
        id: data.id
      },
      create: data,
      update: data
    })

    return pokemonDbEntrySchema.parse(createdEntry)
  }
}
