import { Body, Controller, Post, HttpCode, Inject } from "@nestjs/common"
import { ZodPipe } from "../../../pipes/zod.pipe"
import { getTokenSchema } from "../schemasAndTypes/schemas"
import { GetTokenData } from "../schemasAndTypes/types"
import { GetTokenService } from "../services/getToken.service"

@Controller({
  path: "auth",
  version: "1"
})
export class AuthController {
  constructor(
    @Inject(GetTokenService)
    private readonly getTokenService: GetTokenService
  ) {}

  @Post("/token")
  @HttpCode(200)
  async getToken(
    @Body(new ZodPipe(getTokenSchema)) getTokenPayload: GetTokenData
  ): Promise<string> {
    return await this.getTokenService.execute(getTokenPayload)
  }
}
