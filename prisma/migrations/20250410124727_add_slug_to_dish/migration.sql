/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Dish_slug_key" ON "Dish"("slug");
