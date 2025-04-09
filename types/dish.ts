import { Category } from "./category";

export type Dish = {
  id: string;
  name: string;
  categories: Category[];
  description: string;
  image?: string;
};
