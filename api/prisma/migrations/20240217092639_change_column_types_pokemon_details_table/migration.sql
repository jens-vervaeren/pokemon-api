/*
  Warnings:

  - Changed the type of `species` on the `pokemon_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `forms` on the `pokemon_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pokemon_details" DROP COLUMN "species",
ADD COLUMN     "species" JSONB NOT NULL,
DROP COLUMN "forms",
ADD COLUMN     "forms" JSONB NOT NULL;
