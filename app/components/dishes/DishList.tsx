"use client";

import DishCard from "./DishCard";
import { DishWithCategories } from "@/types/dish";

type DishListProps = {
  dishes: DishWithCategories[];
};

export default function DishList({ dishes }: DishListProps) {
  if (dishes.length === 0) {
    return <p className="text-gray-600">No dishes match your filters.</p>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {dishes.map((dish) => (
        <DishCard key={dish.id} {...dish} />
      ))}
    </div>
  );
}
