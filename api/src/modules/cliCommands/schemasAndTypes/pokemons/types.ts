import { z } from "zod"
import { pokemonApiResponseSchema } from "./schemas"

export type PokemonApiResponse = z.infer<typeof pokemonApiResponseSchema>
