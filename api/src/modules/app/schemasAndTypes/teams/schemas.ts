import { z } from "zod"

export const createTeamSchema = z.object({
  name: z.string()
})

export const updateTeamPokemonsSchema = z.object({
  pokemons: z.number().array().max(6)
})
