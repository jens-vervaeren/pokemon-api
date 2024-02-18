import { sign } from "jsonwebtoken"
import { Injectable, Inject, UnauthorizedException } from "@nestjs/common"
import { GetTokenData } from "../schemasAndTypes/types"
import { GetUserByEmailService } from "./getUserByEmail.service"

@Injectable()
export class GetTokenService {
  constructor(
    @Inject(GetUserByEmailService)
    private readonly getUserByEmailService: GetUserByEmailService
  ) {}

  public async execute(data: GetTokenData): Promise<string> {
    const user = await this.getUserByEmailService.execute(data.email)
    if (user.email !== data.email) throw new UnauthorizedException()

    return sign({ sub: user.id }, "secret")
  }
}
