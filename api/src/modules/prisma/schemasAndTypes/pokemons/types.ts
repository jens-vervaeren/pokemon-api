import { z } from "zod"
import {
  upsertPokemonDbEntrySchema,
  upsertPokemonDetailsDbEntrySchema,
  pokemonDbEntrySchema,
  pokemonDetailsDbEntrySchema
} from "./schemas"

export type PokemonDbEntry = z.infer<typeof pokemonDbEntrySchema>
export type PokemonDetailsDbEntry = z.infer<typeof pokemonDetailsDbEntrySchema>
export type UpsertPokemonDbEntry = z.infer<typeof upsertPokemonDbEntrySchema>
export type UpsertPokemonDetailsDbEntry = z.infer<
  typeof upsertPokemonDetailsDbEntrySchema
>
