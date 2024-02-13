-- CreateTable
CREATE TABLE "pokemon_details" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sprites" JSONB NOT NULL,
    "types" JSONB NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "moves" JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    "species" VARCHAR(255) NOT NULL,
    "stats" JSONB NOT NULL,
    "abilities" JSONB NOT NULL,
    "form" VARCHAR(255) NOT NULL,
    "pokemon_id" INTEGER NOT NULL,

    CONSTRAINT "pokemon_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_details_pokemon_id_key" ON "pokemon_details"("pokemon_id");

-- AddForeignKey
ALTER TABLE "pokemon_details" ADD CONSTRAINT "pokemon_details_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
