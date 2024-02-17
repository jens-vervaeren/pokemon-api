import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { firstValueFrom } from "rxjs"
import { PokemonApiResponse } from "../../schemasAndTypes/pokemons/types"
import { pokemonApiResponseSchema } from "../../schemasAndTypes/pokemons/schemas"

@Injectable()
export class GetPokemonFromApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  public async execute(idOrName: string): Promise<PokemonApiResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.getBaseUrl()}/pokemon/${idOrName}`)
    )
    return pokemonApiResponseSchema.parse(data)
  }

  private getBaseUrl(): string {
    return this.configService.get<string>("POKEMON_API_BASE_URL") ?? ""
  }
}
