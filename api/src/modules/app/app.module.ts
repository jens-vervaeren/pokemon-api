import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "../prisma/prisma.module"
import { PrismaService } from "../prisma/services/prisma.service"
import { TeamsController } from "./controllers/teams.controller"
import { GetAllTeamsService } from "./services/teams/getAllTeams.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    PrismaModule
  ],
  controllers: [TeamsController],
  providers: [PrismaService, GetAllTeamsService]
})
export class AppModule {}
