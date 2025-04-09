"use client";

import { useState } from "react";
import { categories as availableCategories } from "@/lib/categories";

export default function NewDishPage() {
  const [form, setForm] = useState({
    name: "",
    categories: [] as string[],
    description: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dish submitted:", form);
    alert("Dish submitted! (Check console)");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-heading font-semibold mb-6">
        Add a New Dish
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Dish Name"
          className="w-full border border-gray-300 rounded-lg p-3"
          value={form.name}
          onChange={handleChange}
          required
        />

        <div>
          <p className="font-semibold mb-2">Categories</p>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((cat) => (
              <label key={cat} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={cat}
                  checked={form.categories.includes(cat)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setForm((prev) => ({
                      ...prev,
                      categories: isChecked
                        ? [...prev.categories, cat]
                        : prev.categories.filter((c) => c !== cat),
                    }));
                  }}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add category"
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
          <button
            type="button"
            className="px-4 py-2 bg-accent text-white rounded-lg"
          >
            Add
          </button>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border border-gray-300 rounded-lg p-3 h-32"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          className="w-full border border-gray-300 rounded-lg p-3"
          value={form.image}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
        >
          Save Dish
        </button>
      </form>
    </div>
  );
}
