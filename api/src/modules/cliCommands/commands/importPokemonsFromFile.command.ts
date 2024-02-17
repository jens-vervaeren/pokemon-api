import * as path from "path"
import { readFile as readFileAsync } from "fs/promises"
import { Inject } from "@nestjs/common"
import { Command, CommandRunner, Option } from "nest-commander"
import { PrismaService } from "../../prisma/services/prisma.service"
import { UpsertPokemonInTransactionService } from "../services/pokemons/upsertPokemonInTransaction.service"
import { UpsertPokemonDetailsInTransactionService } from "../services/pokemons/upsertPokemonDetailsInTransaction.service"
import {
  upsertPokemonDbEntrySchema,
  upsertPokemonDetailsDbEntrySchema
} from "../../prisma/schemasAndTypes/pokemons/schemas"
import { PokemonFileEntry } from "../schemasAndTypes/pokemons/types"

interface CommandOptions {
  file?: string
}

@Command({
  name: "import-pokemons-from-file",
  description: "Import pokemons from a file"
})
export class ImportPokemonsFromFileCommand extends CommandRunner {
  constructor(
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
    if (!options.file)
      throw new Error("Please provide the file name to start importing\n")

    try {
      const fileContents = await readFileAsync(
        `/app/seeds/${options.file}`,
        "utf-8"
      )

      const fileEntries = JSON.parse(fileContents) as PokemonFileEntry[]
      // Why not Promise.all?
      // Since we open a transaction to the database, we want to close it asap
      // This due the fact that keeping transactions open for a long time causes deadlocks on the database
      // since a database only allows for a certain number of open transactions
      // See: https://www.prisma.io/docs/orm/prisma-client/queries/transactions#interactive-transactions
      // This is why we want to sequencially process our data as fast as possible
      for (const entry of fileEntries) {
        await this.prismaService.$transaction(async (t) => {
          const pokemonEntry =
            await this.upsertPokemonInTransactionService.execute(
              t,
              upsertPokemonDbEntrySchema.parse(entry)
            )

          await this.upsertPokemonDetailsInTransactionService.execute(
            t,
            upsertPokemonDetailsDbEntrySchema.parse({
              ...entry,
              pokemonId: pokemonEntry.id
            })
          )

          console.log(
            `Pokemon with id ${entry.id} and name ${entry.name} successfully synced\n`
          )
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  @Option({
    flags: "-f, --file [file]",
    description: "Id or name of pokemon you want to import"
  })
  parseFile(val: string): string {
    if (path.extname(val) !== ".json")
      throw new Error("Please provide a json file to start the import\n")

    return val
  }
}
