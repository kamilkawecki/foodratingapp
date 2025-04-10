"use client";

import { useEffect, useState } from "react";
import { DishWithCategories } from "@/types/dish";
import DishList from "../components/dishes/DishList";
import { Category } from "@/lib/generated/prisma";
import { X } from "lucide-react";

export default function AllDishesPage() {
  const [dishes, setDishes] = useState<DishWithCategories[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchDishes = async () => {
      const res = await fetch("/api/dishes");
      if (res.ok) {
        const data = await res.json();
        setDishes(data);
      }
    };
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setAllCategories(data);
      }
    };

    fetchDishes();
    fetchCategories();
  }, []);

  const toggleCategory = (id: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const filteredDishes =
    selectedCategoryIds.length === 0
      ? dishes
      : dishes.filter((dish) =>
          dish.categories.some((cat) => selectedCategoryIds.includes(cat.id))
        );

  return (
    <div className="flex min-h-screen relative">
      <aside
        className={`z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        fixed top-[100px] left-0 h-full
        md:sticky md:top-[100px] md:h-fit md:self-start md:shadow-none
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="p-6 flex items-center justify-between md:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-sm text-gray-500 hover:underline"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-md font-bold mb-4">Categories</h3>
          <div className="space-y-2">
            {allCategories.map((cat) => (
              <label key={cat.id} className="block">
                <input
                  type="checkbox"
                  checked={selectedCategoryIds.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="mr-2"
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <button
          onClick={() => setShowSidebar(true)}
          className="md:hidden mb-4 bg-accent text-white px-4 py-2 rounded-lg"
        >
          Filters
        </button>

        <DishList dishes={filteredDishes} />
      </main>
    </div>
  );
}
