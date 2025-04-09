/*
  Warnings:

  - You are about to drop the column `categories` on the `Dish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "categories";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DishCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DishCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "_DishCategories_B_index" ON "_DishCategories"("B");

-- AddForeignKey
ALTER TABLE "_DishCategories" ADD CONSTRAINT "_DishCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishCategories" ADD CONSTRAINT "_DishCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;
