import { z } from "zod"
import { createUserSchema, getTokenSchema } from "./schemas"

export type CreateUserData = z.infer<typeof createUserSchema>
export type GetTokenData = z.infer<typeof getTokenSchema>
