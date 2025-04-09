"use client";

import { useEffect, useState } from "react";

export default function NewDishPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const [form, setForm] = useState({
    name: "",
    categories: [] as string[],
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.map((cat: { name: string }) => cat.name));
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddCategory = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed || categories.includes(trimmed)) return;

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmed }),
    });

    if (res.ok) {
      setCategories((prev) => [...prev, trimmed]);
      setForm((prev) => ({
        ...prev,
        categories: [...prev.categories, trimmed],
      }));
      setNewCategory("");
    } else {
      const data = await res.json();
      alert(data.error || "Failed to add category");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/dishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create dish");

      const data = await res.json();
      alert(`Dish "${data.name}" created!`);
    } catch (err) {
      console.error(err);
      alert("Error submitting dish");
    }
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
            {categories.map((cat) => (
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
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add category"
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
          <button
            type="button"
            onClick={handleAddCategory}
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
