import { z } from "zod"
import { createTeamSchema } from "./schemas"

export type CreateTeamPayload = z.infer<typeof createTeamSchema>
