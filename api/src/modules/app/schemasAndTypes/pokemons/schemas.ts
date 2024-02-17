import { z } from "zod"
import {
  pokemonDbEntrySchema,
  pokemonDetailsDbEntrySchema
} from "../../../prisma/schemasAndTypes/pokemons/schemas"

export const sortQueryParamSchema = z
  .enum(["name-asc", "name-desc", "id-asc", "id-desc"])
  .optional()
  .transform((value) => {
    if (!value) return
    const parts = value.split("-")
    return [parts[0], parts[1]] as [string, string]
  })

const limitQueryParamSchema = z.coerce.number().nonnegative().optional()
const offsetQueryParamSchema = z.coerce.number().nonnegative().optional()

export const getPokemonsQueryParamsV1Schema = z.object({
  sort: sortQueryParamSchema
})
export const getPokemonsQueryParamsV2Schema =
  getPokemonsQueryParamsV1Schema.extend({
    limit: limitQueryParamSchema,
    offset: offsetQueryParamSchema
  })

export const parsedPokemonSchema = pokemonDbEntrySchema.extend({
  sprites: z.object({
    back_default: z.string().nullable(),
    back_female: z.string().nullable(),
    back_shiny: z.string().nullable(),
    back_shiny_female: z.string().nullable(),
    front_default: z.string().nullable(),
    front_female: z.string().nullable(),
    front_shiny: z.string().nullable(),
    front_shiny_female: z.string().nullable()
  })
})

export const parsedPokemonsSchema = parsedPokemonSchema.array()

export const parsedPokemonDetailSchema = pokemonDetailsDbEntrySchema.omit({
  id: true,
  pokemonId: true
})

export const getPokemonWithDetailsSchema = parsedPokemonSchema.merge(
  parsedPokemonDetailSchema
)
