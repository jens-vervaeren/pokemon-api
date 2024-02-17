import { z } from "zod"

const abilitiesSchema = z
  .object({
    is_hidden: z.boolean(),
    slot: z.number(),
    ability: z.object({
      name: z.string(),
      url: z.string()
    })
  })
  .array()

const formsSchema = z
  .object({
    name: z.string(),
    url: z.string()
  })
  .array()

const movesSchema = z
  .object({
    move: z.object({
      name: z.string(),
      url: z.string()
    }),
    version_group_details: z
      .object({
        level_learned_at: z.number(),
        version_group: z.object({
          name: z.string(),
          url: z.string()
        }),
        move_learn_method: z.object({
          name: z.string(),
          url: z.string()
        })
      })
      .array()
  })
  .array()

const speciesSchema = z.object({
  name: z.string(),
  url: z.string()
})

const spritesSchema = z.object({
  back_default: z.string().nullable(),
  back_female: z.string().nullable(),
  back_shiny: z.string().nullable(),
  back_shiny_female: z.string().nullable(),
  front_default: z.string().nullable(),
  front_female: z.string().nullable(),
  front_shiny: z.string().nullable(),
  front_shiny_female: z.string().nullable(),
  other: z.object({
    dream_world: z.object({
      front_default: z.string().nullable(),
      front_female: z.string().nullable()
    }),
    home: z.object({
      front_default: z.string().nullable(),
      front_female: z.string().nullable(),
      front_shiny: z.string().nullable(),
      front_shiny_female: z.string().nullable()
    }),
    "official-artwork": z.object({
      front_default: z.string().nullable(),
      front_shiny: z.string().nullable()
    }),
    showdown: z.object({
      back_default: z.string().nullable(),
      back_female: z.string().nullable(),
      back_shiny: z.string().nullable(),
      back_shiny_female: z.string().nullable(),
      front_default: z.string().nullable(),
      front_female: z.string().nullable(),
      front_shiny: z.string().nullable(),
      front_shiny_female: z.string().nullable()
    })
  }),
  versions: z.object({
    "generation-i": z.object({
      "red-blue": z.object({
        back_default: z.string().nullable(),
        back_gray: z.string().nullable(),
        front_default: z.string().nullable(),
        front_gray: z.string().nullable()
      }),
      yellow: z.object({
        back_default: z.string().nullable(),
        back_gray: z.string().nullable(),
        front_default: z.string().nullable(),
        front_gray: z.string().nullable()
      })
    }),
    "generation-ii": z.object({
      crystal: z.object({
        back_default: z.string().nullable(),
        back_shiny: z.string().nullable(),
        front_default: z.string().nullable(),
        front_shiny: z.string().nullable()
      }),
      gold: z.object({
        back_default: z.string().nullable(),
        back_shiny: z.string().nullable(),
        front_default: z.string().nullable(),
        front_shiny: z.string().nullable()
      }),
      silver: z.object({
        back_default: z.string().nullable(),
        back_shiny: z.string().nullable(),
        front_default: z.string().nullable(),
        front_shiny: z.string().nullable()
      })
    }),
    "generation-iii": z.object({
      emerald: z.object({
        front_default: z.string().nullable(),
        front_shiny: z.string().nullable()
      }),
      "firered-leafgreen": z.object({
        back_default: z.string().nullable(),
        back_shiny: z.string().nullable(),
        front_default: z.string().nullable(),
        front_shiny: z.string().nullable()
      }),
      "ruby-sapphire": z.object({
        back_default: z.string().nullable(),
        back_shiny: z.string().nullable(),
        front_default: z.string().nullable(),
        front_shiny: z.string().nullable()
      })
    }),
    "generation-iv": z.object({
      "diamond-pearl": z.object({
        back_default: z.string().nullable(),
        back_female: z.string().nullable(),
        back_shiny: z.string().nullable(),
        back_shiny_female: z.string().nullable(),
        front_default: z.string().nullable(),
        front_female: z.string().nullable(),
        front_shiny: z.string().nullable(),
        front_shiny_female: z.string().nullable()
      }),
      "heartgold-soulsilver": z.object({
        back_default: z.string().nullable(),
        back_female: z.string().nullable(),
        back_shiny: z.string().nullable(),
        back_shiny_female: z.string().nullable(),
        front_default: z.string().nullable(),
        front_female: z.string().nullable(),
        front_shiny: z.string().nullable(),
        front_shiny_female: z.string().nullable()
      }),
      platinum: z.object({
        back_default: z.string().nullable(),
        back_female: z.string().nullable(),
        back_shiny: z.string().nullable(),
        back_shiny_female: z.string().nullable(),
        front_default: z.string().nullable(),
        front_female: z.string().nullable(),
        front_shiny: z.string().nullable(),
        front_shiny_female: z.string().nullable()
      })
    }),
    "generation-v": z.object({
      "black-white": z.object({
        animated: z.object({
          back_default: z.string().nullable(),
          back_female: z.string().nullable(),
          back_shiny: z.string().nullable(),
          back_shiny_female: z.string().nullable(),
          front_default: z.string().nullable(),
          front_female: z.string().nullable(),
          front_shiny: z.string().nullable(),
          front_shiny_female: z.string().nullable()
        }),
        back_default: z.string().nullable(),
        back_female: z.string().nullable(),
        back_shiny: z.string().nullable(),
        back_shiny_female: z.string().nullable(),
        front_default: z.string().nullable(),
        front_female: z.string().nullable(),
        front_shiny: z.string().nullable(),
        front_shiny_female: z.string().nullable()
      })
    }),
    "generation-vi": z.object({
      "omegaruby-alphasapphire": z.object({
        front_default: z.string().nullable(),
        front_female: z.string().nullable(),
        front_shiny: z.string().nullable(),
        front_shiny_female: z.string().nullable()
      }),
      "x-y": z.object({
        front_default: z.string().nullable(),
        front_female: z.string().nullable(),
        front_shiny: z.string().nullable(),
        front_shiny_female: z.string().nullable()
      })
    }),
    "generation-vii": z.object({
      icons: z.object({
        front_default: z.string().nullable(),
        front_female: z.string().nullable()
      }),
      "ultra-sun-ultra-moon": z.object({
        front_default: z.string().nullable(),
        front_female: z.string().nullable(),
        front_shiny: z.string().nullable(),
        front_shiny_female: z.string().nullable()
      })
    }),
    "generation-viii": z.object({
      icons: z.object({
        front_default: z.string().nullable(),
        front_female: z.string().nullable()
      })
    })
  })
})

const statsSchema = z
  .object({
    base_stat: z.number().nonnegative(),
    effort: z.number().nonnegative(),
    stat: z.object({
      name: z.string(),
      url: z.string()
    })
  })
  .array()

const typesSchema = z
  .object({
    slot: z.number().nonnegative(),
    type: z.object({
      name: z.string(),
      url: z.string()
    })
  })
  .array()

export const pokemonDbEntrySchema = z.object({
  id: z.number().nonnegative(),
  name: z.string().min(1),
  sprites: spritesSchema,
  types: typesSchema
})

export const upsertPokemonDbEntrySchema = pokemonDbEntrySchema.extend({
  id: z.number().nonnegative().optional()
})

export const pokemonDetailsDbEntrySchema = z.object({
  id: z.number().nonnegative(),
  height: z.number().nonnegative(),
  weight: z.number().nonnegative(),
  moves: movesSchema,
  order: z.number().nonnegative(),
  species: speciesSchema,
  stats: statsSchema,
  abilities: abilitiesSchema,
  forms: formsSchema,
  pokemonId: z.number().nonnegative()
})

export const upsertPokemonDetailsDbEntrySchema =
  pokemonDetailsDbEntrySchema.omit({ id: true })
