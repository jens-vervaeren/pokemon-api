import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../../prisma/services/prisma.service"

@Injectable()
export class DoPokemonsExistInDbService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(pokemonIds: number[]): Promise<void> {
    const existingCount = await this.prisma.pokemon.count({
      where: {
        id: {
          in: pokemonIds
        }
      }
    })

    if (existingCount !== pokemonIds.length)
      throw new NotFoundException("Not all pokemon are found in our database")
  }
}
