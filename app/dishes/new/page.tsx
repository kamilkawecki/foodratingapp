"use client";

import { useEffect, useState } from "react";
import type { Category } from "@/lib/generated/prisma";
import DishForm from "@/app/components/dishes/DishForm";

export default function NewDishPage() {
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setAllCategories(data);
      } else {
        console.error("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-heading font-semibold mb-6">
        Add a New Dish
      </h1>

      <DishForm mode="new" allCategories={allCategories} />
    </div>
  );
}
