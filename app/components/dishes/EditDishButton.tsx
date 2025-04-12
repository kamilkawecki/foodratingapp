"use client";

import { useUser } from "@/lib/context/UserContext";
import Link from "next/link";

export default function EditDishButton({ slug }: { slug: string }) {
  const { user } = useUser();

  if (!user) return null;
  return (
    <Link
      href={`/dishes/${slug}/edit`}
      className="inline-block text-sm text-accent hover:underline"
    >
      Edit Dish
    </Link>
  );
}
