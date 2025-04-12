import { PrismaClient } from "@/lib/generated/prisma";
import EditDishPageClient from "@/app/components/dishes/EditDishPageClient";
import type { DishWithCategories } from "@/types/dish";

const prisma = new PrismaClient();

export default async function EditDishPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const dish: DishWithCategories | null = await prisma.dish.findUnique({
    where: { slug: params.slug },
    include: { categories: true },
  });

  if (!dish) {
    return <div className="p-6 text-gray-600">Dish not found</div>;
  }

  const allCategories = await prisma.category.findMany();

  return <EditDishPageClient dish={dish} allCategories={allCategories} />;
}
