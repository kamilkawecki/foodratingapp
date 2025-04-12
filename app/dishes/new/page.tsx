import { PrismaClient } from "@/lib/generated/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import DishForm from "@/app/components/dishes/DishForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function NewDishPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const allCategories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-heading font-semibold mb-6">
        Add a New Dish
      </h1>

      <DishForm mode="new" allCategories={allCategories} />
    </div>
  );
}
