import { Dish } from "@/types/dish";

export const mockDishes: Dish[] = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    categories: ["Dinner", "Pasta"],
    description:
      "Creamy and rich classic Italian pasta with pancetta, egg, and parmesan cheese.",
  },
  {
    id: "2",
    name: "Caesar Salad",
    categories: ["Lunch", "Salad", "Vegetarian"],
    description:
      "Crisp romaine lettuce with creamy Caesar dressing, croutons, and parmesan.",
  },
  {
    id: "3",
    name: "Beef Pho",
    categories: ["Soup"],
    description:
      "Vietnamese noodle soup with slow-cooked beef, herbs, and aromatic broth.",
  },
];
