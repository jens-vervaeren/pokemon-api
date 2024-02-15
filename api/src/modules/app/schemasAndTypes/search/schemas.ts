import { z } from "zod"

export const searchPokemonsQueryParamsSchema = z.object({
  query: z.string().min(1),
  limit: z.number().nonnegative().optional()
})
