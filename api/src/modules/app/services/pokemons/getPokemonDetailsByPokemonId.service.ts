import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../../prisma/services/prisma.service"
import { PokemonWithDetails } from "../../schemasAndTypes/pokemons/types"
import {
  getPokemonWithDetailsSchema,
  parsedPokemonDetailSchema,
  parsedPokemonSchema
} from "../../schemasAndTypes/pokemons/schemas"

@Injectable()
export class GetPokemonDetailsByPokemonIdService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(pId: number): Promise<PokemonWithDetails> {
    const pokemon = await this.prisma.pokemon.findUnique({
      where: {
        id: pId
      }
    })

    if (!pokemon) throw new NotFoundException("Pokemon not found")

    const foundDetails = await this.prisma.pokemonDetails.findUnique({
      where: {
        pokemonId: pId
      }
    })

    if (!foundDetails) throw new NotFoundException("Pokemon details not found")

    const parsedPokemon = parsedPokemonSchema.parse(pokemon)
    const parsedDetails = parsedPokemonDetailSchema.parse(foundDetails)

    return getPokemonWithDetailsSchema.parse({
      ...parsedPokemon,
      ...parsedDetails
    })
  }
}
