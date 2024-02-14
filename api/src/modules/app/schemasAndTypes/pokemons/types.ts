import { z } from "zod"
import { getPokemonsQueryParamsV1Schema } from "./schemas"

export type GetPokemonsQueryParamsV1 = z.infer<
  typeof getPokemonsQueryParamsV1Schema
>
