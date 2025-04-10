import Image from "next/image";
import { DEFAULT_DISH_IMAGE } from "@/lib/constants";
import { PrismaClient } from "@/lib/generated/prisma";
import { ExternalLink } from "lucide-react";

const prisma = new PrismaClient();

export default async function DishPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const dish = await prisma.dish.findUnique({
    where: { id: params.id },
    include: {
      categories: {
        select: { name: true },
      },
    },
  });

  if (!dish) return <div className="p-6 text-gray-600">Dish not found</div>;

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-heading text-black mb-2">{dish.name}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {dish.categories.map((c) => c.name).join(", ")}
      </p>
      {dish.recipeUrl && (
        <a
          href={dish.recipeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition mb-4"
        >
          View Recipe
          <ExternalLink size={16} />
        </a>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-6">
        <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
          <Image
            src={dish.image || DEFAULT_DISH_IMAGE}
            alt={dish.name}
            width={800}
            height={800}
            className="w-full object-cover rounded-2xl mb-6"
          />
        </div>
        <div className="bg-primary rounded-2xl p-6">
          <p className="text-gray-700">{dish.description}</p>
        </div>
      </div>
    </div>
  );
}
