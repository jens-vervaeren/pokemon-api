import { Module } from "@nestjs/common"
import { PrismaModule } from "../prisma/prisma.module"
import { AuthController } from "./controllers/auth.controller"
import { UsersController } from "./controllers/users.controller"
import { CreateUserService } from "./services/createUser.service"
import { GetUserByEmailService } from "./services/getUserByEmail.service"
import { GetUserByIdService } from "./services/getUserById.service"
import { GetTokenService } from "./services/getToken.service"
import { AuthGuard } from "./guards/auth.guard"

@Module({
  imports: [PrismaModule],
  controllers: [AuthController, UsersController],
  providers: [
    CreateUserService,
    GetUserByEmailService,
    GetUserByIdService,
    GetTokenService,
    AuthGuard
  ],
  exports: [AuthGuard]
})
export class AuthModule {}
