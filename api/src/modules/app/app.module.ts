import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "../prisma/prisma.module"
import { PrismaService } from "../prisma/services/prisma.service"
import { PokemonsController } from "./controllers/pokemons.controller"
import { TeamsController } from "./controllers/teams.controller"
import { SearchController } from "./controllers/search.controller"
import { GetPokemonsService } from "./services/pokemons/getPokemons.service"
import { GetPokemonsPaginatedService } from "./services/pokemons/getPokemonsPaginated.service"
import { DoPokemonsExistInDbService } from "./services/pokemons/doPokemonsExistInDb.service"
import { GetPokemonDetailsByPokemonIdService } from "./services/pokemons/getPokemonDetailsByPokemonId.service"
import { GetAllTeamsService } from "./services/teams/getAllTeams.service"
import { GetTeamByIdService } from "./services/teams/getTeamById.service"
import { CreateTeamService } from "./services/teams/createTeam.service"
import { UpdateTeamPokemonsService } from "./services/teams/updateTeamPokemons.service"
import { SearchPokemonBySearchParamsService } from "./services/search/searchPokemonBySearchParams.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.ENV ?? "development"}`
    }),
    PrismaModule
  ],
  controllers: [PokemonsController, TeamsController, SearchController],
  providers: [
    PrismaService,
    GetPokemonsService,
    GetPokemonsPaginatedService,
    DoPokemonsExistInDbService,
    GetPokemonDetailsByPokemonIdService,
    GetAllTeamsService,
    GetTeamByIdService,
    CreateTeamService,
    UpdateTeamPokemonsService,
    SearchPokemonBySearchParamsService
  ]
})
export class AppModule {}
