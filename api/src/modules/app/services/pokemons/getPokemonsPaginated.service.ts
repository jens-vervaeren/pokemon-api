import { Inject, Injectable } from "@nestjs/common"
import {
  GetPokemonsFilterOptions,
  PaginatedPokemon
} from "../../schemasAndTypes/pokemons/types"
import { GetPokemonsService } from "./getPokemons.service"
import { PrismaService } from "../../../prisma/services/prisma.service"

@Injectable()
export class GetPokemonsPaginatedService {
  constructor(
    @Inject(GetPokemonsService)
    private readonly getPokemonsService: GetPokemonsService,
    @Inject(PrismaService)
    private readonly prismaService: PrismaService
  ) {}

  public async execute(
    filterOptions: GetPokemonsFilterOptions
  ): Promise<PaginatedPokemon> {
    const foundPokemons = await this.getPokemonsService.execute(filterOptions)
    const totalPokemon = await this.totalPokemon()

    return {
      data: foundPokemons,
      metadata: {
        next: this.buildNextUrl(filterOptions, totalPokemon),
        previous: this.buildPreviousUrl(filterOptions),
        page: this.calculatePage(filterOptions?.offset, filterOptions?.limit),
        pages: this.calculatePages(totalPokemon, filterOptions?.limit),
        total: totalPokemon
      }
    }
  }

  private async totalPokemon(): Promise<number> {
    return await this.prismaService.pokemon.count()
  }

  private buildNextUrl(
    filterOptions: GetPokemonsFilterOptions,
    totalPokemon: number
  ): string {
    const parts = []

    if (filterOptions.sort) {
      parts.push(`sort=${filterOptions.sort[0]}-${filterOptions.sort[1]}`)
    }

    if (filterOptions.offset) {
      let nextOffset: number = 0
      if (filterOptions.limit) {
        nextOffset = filterOptions.offset + filterOptions.limit
      } else {
        nextOffset = filterOptions.offset + 1
      }

      if (nextOffset > totalPokemon) nextOffset = totalPokemon

      parts.push(`offset=${nextOffset}`)
    }

    if (filterOptions.limit) {
      parts.push(`limit=${filterOptions.limit}`)
    }

    return parts.join("&")
  }

  private buildPreviousUrl(filterOptions: GetPokemonsFilterOptions): string {
    const parts = []

    if (filterOptions.sort) {
      parts.push(`sort=${filterOptions.sort[0]}-${filterOptions.sort[1]}`)
    }

    if (filterOptions.offset) {
      let nextOffset: number = 0
      if (filterOptions.limit) {
        nextOffset = filterOptions.offset - filterOptions.limit
      } else {
        nextOffset = filterOptions.offset + 1
      }

      if (nextOffset < 0) nextOffset = 0

      parts.push(`offset=${nextOffset}`)
    }

    if (filterOptions.limit) {
      parts.push(`limit=${filterOptions.limit}`)
    }

    return parts.join("&")
  }

  private calculatePage(offset?: number, limit?: number): number {
    if (!offset || !limit) return 1
    return Math.ceil(offset / limit) + 1
  }

  private calculatePages(totalResults: number, limitPerPage?: number): number {
    if (!limitPerPage) return 1
    return Math.ceil(totalResults / limitPerPage)
  }
}
