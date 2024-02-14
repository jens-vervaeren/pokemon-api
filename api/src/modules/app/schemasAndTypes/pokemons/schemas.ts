import { z } from "zod"

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
