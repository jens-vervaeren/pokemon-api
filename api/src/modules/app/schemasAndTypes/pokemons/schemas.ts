import { z } from "zod"

export const getPokemonsQueryParamsV1Schema = z.object({
  sort: z
    .enum(["name-asc", "name-desc", "id-asc", "id-desc"])
    .optional()
    .transform((value) => {
      if (!value) return
      const parts = value.split("-")
      return {
        [parts[0]]: parts[1]
      }
    })
})
