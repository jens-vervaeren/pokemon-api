-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "pokemons" INTEGER[],

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);
