import { Body, Controller, Post, HttpCode, Inject } from "@nestjs/common"
import { ZodPipe } from "../../../pipes/zod.pipe"
import { CreateUserService } from "../services/createUser.service"
import { createUserSchema } from "../schemasAndTypes/schemas"
import { CreateUserData } from "../schemasAndTypes/types"

@Controller({
  path: "users",
  version: "1"
})
export class UsersController {
  constructor(
    @Inject(CreateUserService)
    private readonly createUserService: CreateUserService
  ) {}

  @Post()
  @HttpCode(204)
  async createUser(
    @Body(new ZodPipe(createUserSchema)) createUserPayload: CreateUserData
  ): Promise<void> {
    await this.createUserService.execute(createUserPayload)
  }
}
