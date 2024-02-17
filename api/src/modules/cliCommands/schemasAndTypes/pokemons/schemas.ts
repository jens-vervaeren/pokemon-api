import { z } from "zod"
import {
  pokemonDbEntrySchema,
  pokemonDetailsDbEntrySchema
} from "../../../prisma/schemasAndTypes/pokemons/schemas"

const gameIndicesSchema = z
  .object({
    game_index: z.number(),
    version: z.object({
      name: z.string(),
      url: z.string()
    })
  })
  .array()

const heldItemsSchema = z
  .object({
    item: z.object({
      name: z.string(),
      url: z.string()
    }),
    version_details: z.object({
      rarity: z.number(),
      version: z
        .object({
          name: z.string(),
          url: z.string()
        })
        .array()
    })
  })
  .array()

const pastTypesSchema = z
  .object({
    generation: z.object({
      name: z.string(),
      url: z.string()
    }),
    types: z
      .object({
        slot: z.number().nonnegative(),
        type: z.object({
          name: z.string(),
          url: z.string()
        })
      })
      .array()
  })
  .array()

export const pokemonApiResponseSchema = pokemonDbEntrySchema
  .merge(pokemonDetailsDbEntrySchema.omit({ id: true, pokemonId: true }))
  .extend({
    game_indices: gameIndicesSchema,
    held_items: heldItemsSchema,
    past_types: pastTypesSchema
  })
