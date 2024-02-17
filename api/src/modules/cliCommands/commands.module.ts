import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { HttpModule } from "@nestjs/axios"
import { PrismaModule } from "../prisma/prisma.module"
import { PrismaService } from "../prisma/services/prisma.service"
import { ImportPokemonFromExternalApiCommand } from "./commands/importPokemonFromExternalApi.command"
import { GetPokemonFromApiService } from "./services/pokemons/getPokemonFromApi.service"
import { ImportPokemonsFromFileCommand } from "./commands/importPokemonsFromFile.command"
import { UpsertPokemonInTransactionService } from "./services/pokemons/upsertPokemonInTransaction.service"
import { UpsertPokemonDetailsInTransactionService } from "./services/pokemons/upsertPokemonDetailsInTransaction.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    PrismaModule,
    HttpModule
  ],
  providers: [
    PrismaService,
    UpsertPokemonInTransactionService,
    UpsertPokemonDetailsInTransactionService,
    GetPokemonFromApiService,
    ImportPokemonFromExternalApiCommand,
    ImportPokemonsFromFileCommand
  ]
})
export class CommandsModule {}
