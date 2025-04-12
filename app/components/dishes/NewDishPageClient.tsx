"use client";

import { useUser } from "@/lib/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DishForm from "./DishForm";
import Spinner from "../Spinner";
import { Category } from "@/lib/generated/prisma";

export default function NewDishPageClient({
  allCategories,
}: {
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
      <h1 className="heading-1 mb-6">Add a New Dish</h1>
      <DishForm mode="new" allCategories={allCategories} />
    </div>
  );
}
