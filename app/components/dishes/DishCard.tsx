import Image from "next/image";
import Link from "next/link";
import { DEFAULT_DISH_IMAGE } from "@/lib/constants";
import { DishWithCategories } from "@/types/dish";

export default function DishCard({
  name,
  categories,
  image,
  id,
}: DishWithCategories) {
  return (
    <Link href={`/dishes/${id}`}>
      <div className="group overflow-hidden rounded-2xl bg-gradient-to-t from-primary to-transparent p-4">
        <div className="overflow-hidden rounded-2xl aspect-square">
          <Image
            src={image || DEFAULT_DISH_IMAGE}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            priority={false}
          />
        </div>

        <h3 className="heading-3 mb-2 text-black mt-3">{name}</h3>
        <div className="flex gap-2">
          <Image
            src="/ForkKnife.svg"
            alt="FoodRating Logo"
            width={20}
            height={20}
            priority
          />
          <p className="text-sm text-gray-600">
            {categories.map((c) => c.name).join(", ")}
          </p>
        </div>
      </div>
    </Link>
  );
}
