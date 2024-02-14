import { z } from "zod"
import { createTeamSchema, updateTeamPokemonsSchema } from "./schemas"

export type CreateTeamPayload = z.infer<typeof createTeamSchema>
export type UpdateTeamPokemonsPayload = z.infer<typeof updateTeamPokemonsSchema>
