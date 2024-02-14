import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "../prisma/prisma.module"
import { PrismaService } from "../prisma/services/prisma.service"
import { PokemonsController } from "./controllers/pokemons.controller"
import { TeamsController } from "./controllers/teams.controller"
import { GetPokemonsService } from "./services/pokemons/getPokemons.service"
import { DoPokemonsExistInDbService } from "./services/pokemons/doPokemonsExistInDb.service"
import { GetAllTeamsService } from "./services/teams/getAllTeams.service"
import { GetTeamByIdService } from "./services/teams/getTeamById.service"
import { CreateTeamService } from "./services/teams/createTeam.service"
import { UpdateTeamPokemonsService } from "./services/teams/updateTeamPokemons.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    PrismaModule
  ],
  controllers: [PokemonsController, TeamsController],
  providers: [
    PrismaService,
    GetPokemonsService,
    DoPokemonsExistInDbService,
    GetAllTeamsService,
    GetTeamByIdService,
    CreateTeamService,
    UpdateTeamPokemonsService
  ]
})
export class AppModule {}
