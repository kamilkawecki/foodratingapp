/*
  Warnings:

  - Made the column `slug` on table `Dish` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "slug" SET NOT NULL;
