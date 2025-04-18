"use client";

import { useEffect, useState } from "react";
import { DishWithCategories } from "@/types/dish";
import DishList from "../components/dishes/DishList";
import { Category } from "@/lib/generated/prisma";
import { X } from "lucide-react";
import Spinner from "../components/Spinner";

export default function AllDishesPage() {
  const [dishes, setDishes] = useState<DishWithCategories[]>([]);
  const [isDishesLoading, setIsDishesLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchDishes = async () => {
      setIsDishesLoading(true);
      const res = await fetch("/api/dishes");
      if (res.ok) {
        const data = await res.json();
        setDishes(data);
      }
      setIsDishesLoading(false);
    };

    const fetchCategories = async () => {
      setIsCategoriesLoading(true);
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setAllCategories(data);
      }
      setIsCategoriesLoading(false);
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
    <div className="flex relative">
      <aside
        className={`z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        fixed top-[100px] left-0 h-full
        md:sticky md:top-[100px] md:h-fit md:self-start md:shadow-none
        ${
          showSidebar
            ? "translate-x-0 pointer-events-auto"
            : "-translate-x-full pointer-events-none"
        }
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

          {isCategoriesLoading ? (
            <Spinner />
          ) : (
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
          )}
        </div>
      </aside>

      {showSidebar && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <main className="flex-1 p-6">
        <button
          onClick={() => setShowSidebar(true)}
          className="md:hidden mb-4 button"
        >
          Filters
        </button>

        {isDishesLoading ? <Spinner /> : <DishList dishes={filteredDishes} />}
      </main>
    </div>
  );
}
