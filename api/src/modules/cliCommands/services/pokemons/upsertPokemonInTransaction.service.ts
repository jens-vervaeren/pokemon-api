import { Injectable } from "@nestjs/common"
import {
  PrismaTransaction,
  PokemonDbEntry,
  UpsertPokemonDbEntry
} from "../../../prisma/schemasAndTypes/pokemons/types"
import { pokemonDbEntrySchema } from "../../../prisma/schemasAndTypes/pokemons/schemas"

@Injectable()
export class UpsertPokemonInTransactionService {
  public async execute(
    transaction: PrismaTransaction,
    data: UpsertPokemonDbEntry
  ): Promise<PokemonDbEntry> {
    const createdEntry = await transaction.pokemon.upsert({
      where: {
        id: data.id
      },
      create: data,
      update: data
    })

    return pokemonDbEntrySchema.parse(createdEntry)
  }
}
