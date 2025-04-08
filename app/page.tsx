import DishCard from "./components/dishes/DishCard";
import { mockDishes } from "@/lib/mockDishes";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-10">
      <h1 className="heading-1 mb-4 md:mb-8 text-center">
        Welcome to FoodRatingApp
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full max-w-6xl">
        {mockDishes.map((dish, index) => (
          <DishCard key={index} {...dish} />
        ))}
      </div>
    </main>
  );
}
