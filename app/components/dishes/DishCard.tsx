import Image from "next/image";
import Link from "next/link";
import { DEFAULT_DISH_IMAGE } from "@/lib/constants";
import { DishWithCategories } from "@/types/dish";

export default function DishCard({
  name,
  categories,
  image,
  slug,
}: DishWithCategories) {
  return (
    <Link href={`/dishes/${slug}`}>
      <div className="group overflow-hidden rounded-2xl bg-gradient-to-t from-primary to-transparent p-1 md:p-4">
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
        <div className="pb-2 px-2 md:p-0">
          <h3 className="heading-4 md:heading-3 mb-2 text-black mt-3">
            {name}
          </h3>
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
      </div>
    </Link>
  );
}
