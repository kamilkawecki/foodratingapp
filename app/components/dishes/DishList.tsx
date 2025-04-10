"use client";

import { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { DishWithCategories } from "@/types/dish";

export default function DishList() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const res = await fetch("/api/dishes");
      const data = await res.json();
      setDishes(data);
    };

    fetchDishes();
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {dishes.map((dish: DishWithCategories) => (
        <DishCard key={dish.id} {...dish} />
      ))}
    </div>
  );
}
