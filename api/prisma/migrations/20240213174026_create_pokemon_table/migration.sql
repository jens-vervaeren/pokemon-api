-- CreateTable
CREATE TABLE "pokemons" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sprites" JSONB NOT NULL,
    "types" JSONB NOT NULL,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);
