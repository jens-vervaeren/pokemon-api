/*
  Warnings:

  - You are about to drop the column `form` on the `pokemon_details` table. All the data in the column will be lost.
  - Added the required column `forms` to the `pokemon_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemon_details" DROP COLUMN "form",
ADD COLUMN     "forms" VARCHAR(255) NOT NULL;
