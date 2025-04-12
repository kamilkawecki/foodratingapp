import DishForm from "@/app/components/dishes/DishForm";
import { PrismaClient } from "@/lib/generated/prisma";
import { DishWithCategories } from "@/types/dish";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditDishPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const dish: DishWithCategories | null = await prisma.dish.findUnique({
    where: { slug: params.slug },
    include: {
      categories: true,
    },
  });

  if (!dish) {
    return <div className="p-6 text-gray-600">Dish not found</div>;
  }

  const allCategories = await prisma.category.findMany();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-heading font-semibold mb-6">Edit Dish</h1>
      <DishForm mode="edit" dish={dish} allCategories={allCategories} />
    </div>
  );
}
