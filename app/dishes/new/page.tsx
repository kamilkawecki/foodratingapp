"use client";

import { useUser } from "@/lib/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DishForm from "@/app/components/dishes/DishForm";
import Spinner from "@/app/components/Spinner";
import { Category } from "@/lib/generated/prisma";

export default function NewDishPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  if (loading || !user || !categories) {
    return <Spinner />;
  }

  return (
    <div className="max-w-xl w-full mx-auto p-6">
      <h1 className="heading-1 mb-6">Add a New Dish</h1>
      <DishForm mode="new" allCategories={categories} />
    </div>
  );
}
