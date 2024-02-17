import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { HttpModule } from "@nestjs/axios"
import { PrismaModule } from "../prisma/prisma.module"
import { PrismaService } from "../prisma/services/prisma.service"
import { ImportPokemonFromExternalApiCommand } from "./commands/importPokemonFromExternalApi.command"
import { CallPokemonApiService } from "./services/callPokemonApi.service"
import { UpsertPokemonService } from "./services/pokemons/upsertPokemon.service"
import { UpsertPokemonDetailsService } from "./services/pokemons/upsertPokemonDetails.service"

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
    UpsertPokemonService,
    UpsertPokemonDetailsService,
    CallPokemonApiService,
    ImportPokemonFromExternalApiCommand
  ]
})
export class CommandsModule {}
