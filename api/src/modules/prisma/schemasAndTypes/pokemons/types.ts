import { z } from "zod"
import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"
import {
  upsertPokemonDbEntrySchema,
  upsertPokemonDetailsDbEntrySchema,
  pokemonDbEntrySchema,
  pokemonDetailsDbEntrySchema
} from "./schemas"

export type PrismaTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>

export type PokemonDbEntry = z.infer<typeof pokemonDbEntrySchema>
export type PokemonDetailsDbEntry = z.infer<typeof pokemonDetailsDbEntrySchema>
export type UpsertPokemonDbEntry = z.infer<typeof upsertPokemonDbEntrySchema>
export type UpsertPokemonDetailsDbEntry = z.infer<
  typeof upsertPokemonDetailsDbEntrySchema
>
