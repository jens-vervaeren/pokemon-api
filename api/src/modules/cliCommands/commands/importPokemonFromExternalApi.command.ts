import { Inject } from "@nestjs/common"
import { Command, CommandRunner, Option } from "nest-commander"
import { CallPokemonApiService } from "../services/callPokemonApi.service"
import { UpsertPokemonDetailsService } from "../services/pokemons/upsertPokemonDetails.service"
import {
  upsertPokemonDbEntrySchema,
  upsertPokemonDetailsDbEntrySchema
} from "../../prisma/schemasAndTypes/pokemons/schemas"
import { UpsertPokemonService } from "../services/pokemons/upsertPokemon.service"

interface CommandOptions {
  input?: string
}

@Command({
  name: "import-pokemon-from-api",
  description: "Import a pokemon from the external pokemon api"
})
export class ImportPokemonFromExternalApiCommand extends CommandRunner {
  constructor(
    @Inject(CallPokemonApiService)
    private readonly callPokemonApiService: CallPokemonApiService,
    @Inject(UpsertPokemonService)
    private readonly upsertPokemonService: UpsertPokemonService,
    @Inject(UpsertPokemonDetailsService)
    private readonly upsertPokemonDetailsService: UpsertPokemonDetailsService
  ) {
    super()
  }

  async run(passedParam: string[], options: CommandOptions): Promise<void> {
    if (!options.input)
      throw new Error("Please provide the input flag to start importing\n")

    try {
      const apiImport = await this.callPokemonApiService.execute(options.input)
      const pokemonEntry = await this.upsertPokemonService.execute(
        upsertPokemonDbEntrySchema.parse(apiImport)
      )
      await this.upsertPokemonDetailsService.execute(
        upsertPokemonDetailsDbEntrySchema.parse({
          ...apiImport,
          pokemonId: pokemonEntry.id
        })
      )
      console.log(`Pokemon ${pokemonEntry.name} successfully imported\n`)
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
