import { Injectable, NotFoundException } from "@nestjs/common"
import { PokemonDetails } from "@prisma/client"
import { PrismaService } from "../../../prisma/services/prisma.service"

@Injectable()
export class GetPokemonDetailsByPokemonIdService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(pokemonId: number): Promise<PokemonDetails> {
    const pokemonExists = await this.prisma.pokemon.findUnique({
      where: {
        id: pokemonId
      }
    })

    if (!pokemonExists) throw new NotFoundException("Pokemon not found")

    const foundDetails = await this.prisma.pokemonDetails.findUnique({
      where: {
        pokemonId
      }
    })

    if (!foundDetails) throw new NotFoundException("Pokemon details not found")

    return foundDetails
  }
}
