/*
  Warnings:

  - You are about to drop the column `name` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `sprites` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `types` on the `pokemon_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pokemon_details" DROP COLUMN "name",
DROP COLUMN "sprites",
DROP COLUMN "types";
