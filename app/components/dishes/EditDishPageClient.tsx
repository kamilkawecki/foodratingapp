"use client";

import { useUser } from "@/lib/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DishForm from "./DishForm";
import Spinner from "../Spinner";
import type { DishWithCategories } from "@/types/dish";
import { Category } from "@/lib/generated/prisma";

export default function EditDishPageClient({
  dish,
  allCategories,
}: {
  dish: DishWithCategories;
  allCategories: Category[];
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <div className="max-w-xl w-full mx-auto p-6">
      <h1 className="heading-1 mb-6">Edit Dish</h1>
      <DishForm mode="edit" dish={dish} allCategories={allCategories} />
    </div>
  );
}
