import { Injectable } from "@nestjs/common"
import {
  UpsertPokemonDetailsDbEntry,
  PokemonDetailsDbEntry,
  PrismaTransaction
} from "../../../prisma/schemasAndTypes/pokemons/types"
import { pokemonDetailsDbEntrySchema } from "../../../prisma/schemasAndTypes/pokemons/schemas"

@Injectable()
export class UpsertPokemonDetailsInTransactionService {
  constructor() {}

  public async execute(
    transaction: PrismaTransaction,
    data: UpsertPokemonDetailsDbEntry
  ): Promise<PokemonDetailsDbEntry> {
    const entry = await transaction.pokemonDetails.upsert({
      where: {
        pokemonId: data.pokemonId
      },
      create: data,
      update: data
    })

    return pokemonDetailsDbEntrySchema.parse(entry)
  }
}
