import DishForm from "@/app/components/dishes/DishForm";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export default async function EditDishPage({
  params,
}: {
  params: { id: string };
}) {
  const dish = await prisma.dish.findUnique({
    where: { id: params.id },
    include: {
      categories: {
        select: { name: true },
      },
    },
  });

  if (!dish) {
    return <div className="p-6 text-gray-600">Dish not found</div>;
  }

  const allCategories = await prisma.category.findMany({
    select: { name: true },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-heading font-semibold mb-6">Edit Dish</h1>
      <DishForm mode="edit" dish={dish} allCategories={allCategories} />
    </div>
  );
}
