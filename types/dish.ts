import type {
  Dish as PrismaDish,
  Category as PrismaCategory,
} from "@/lib/generated/prisma";

export type DishWithCategories = PrismaDish & {
  categories: PrismaCategory[];
};
