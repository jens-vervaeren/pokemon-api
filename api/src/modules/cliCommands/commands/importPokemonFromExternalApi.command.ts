import { Inject } from "@nestjs/common"
import { Command, CommandRunner, Option } from "nest-commander"
import {
  upsertPokemonDbEntrySchema,
  upsertPokemonDetailsDbEntrySchema
} from "../../prisma/schemasAndTypes/pokemons/schemas"
import { PrismaService } from "../../prisma/services/prisma.service"
import { UpsertPokemonDetailsInTransactionService } from "../services/pokemons/upsertPokemonDetailsInTransaction.service"
import { UpsertPokemonInTransactionService } from "../services/pokemons/upsertPokemonInTransaction.service"
import { GetPokemonFromApiService } from "../services/pokemons/getPokemonFromApi.service"

interface CommandOptions {
  input?: string
}

@Command({
  name: "import-pokemon-from-api",
  description: "Import a pokemon from the external pokemon api"
})
export class ImportPokemonFromExternalApiCommand extends CommandRunner {
  constructor(
    @Inject(GetPokemonFromApiService)
    private readonly getPokemonFromApiService: GetPokemonFromApiService,
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
    @Inject(UpsertPokemonInTransactionService)
    private readonly upsertPokemonInTransactionService: UpsertPokemonInTransactionService,
    @Inject(UpsertPokemonDetailsInTransactionService)
    private readonly upsertPokemonDetailsInTransactionService: UpsertPokemonDetailsInTransactionService
  ) {
    super()
  }

  async run(passedParam: string[], options: CommandOptions): Promise<void> {
    if (!options.input)
      throw new Error("Please provide the input flag to start importing\n")

    try {
      const apiPokemon = await this.getPokemonFromApiService.execute(
        options.input
      )

      await this.prismaService.$transaction(async (t) => {
        const pokemonEntry =
          await this.upsertPokemonInTransactionService.execute(
            t,
            upsertPokemonDbEntrySchema.parse(apiPokemon)
          )

        await this.upsertPokemonDetailsInTransactionService.execute(
          t,
          upsertPokemonDetailsDbEntrySchema.parse({
            ...apiPokemon,
            pokemonId: pokemonEntry.id
          })
        )

        console.log(
          `Pokemon with id ${pokemonEntry.id} and name ${pokemonEntry.name} successfully synced\n`
        )
      })
    } catch (error) {
      console.error(error)
    }
  }

  @Option({
    flags: "-i, --input [input]",
    description: "Id or name of pokemon you want to import"
  })
  parseInput(val: string): string {
    return val
  }
}
