import { PrismaClient } from "@/lib/generated/prisma";
import NewDishPageClient from "@/app/components/dishes/NewDishPageClient";
const prisma = new PrismaClient();

export default async function NewDishPage() {
  const allCategories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <NewDishPageClient allCategories={allCategories} />;
}
