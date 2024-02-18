import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1)
})

export const getTokenSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})
