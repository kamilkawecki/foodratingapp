"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type DishFormProps = {
  mode: "new" | "edit";
  dish?: {
    id: string;
    name: string;
    description: string;
    recipeUrl?: string | null;
    image?: string | null;
    categories: { name: string }[];
  };
  allCategories: { name: string }[];
};

export default function DishForm({ mode, dish, allCategories }: DishFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    name: dish?.name || "",
    description: dish?.description || "",
    recipeUrl: dish?.recipeUrl || "",
    image: dish?.image || "",
    categories: dish?.categories.map((c) => c.name) || [],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(allCategories.map((c) => c.name));
  }, [allCategories]);

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
      setError(data.error || "Failed to add category");
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setError("Please select an image file first.");
      return;
    }

    if (form.image) {
      setError("Image already uploaded.");
      return;
    }

    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error } = await supabase.storage
      .from("dish-images")
      .upload(fileName, imageFile);

    if (error) {
      console.error("Image upload failed:", error);
      setError("Image upload failed.");
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("dish-images")
      .getPublicUrl(fileName);

    setForm((prev) => ({ ...prev, image: publicUrlData.publicUrl }));
    setStatus("✅ Image uploaded");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus(null);

    const res = await fetch(
      mode === "new" ? "/api/dishes" : `/api/dishes/${dish?.id}`,
      {
        method: mode === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (!res.ok) {
      setError("Something went wrong.");
      return;
    }

    const data = await res.json();
    setStatus("Dish saved! Redirecting...");
    router.push(`/dishes/${data.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Dish Name"
        className="w-full border border-gray-300 rounded-lg p-3"
        required
      />

      <div>
        <p className="font-semibold mb-2">Categories</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={cat}
                checked={form.categories.includes(cat)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setForm((prev) => ({
                    ...prev,
                    categories: checked
                      ? [...prev.categories, cat]
                      : prev.categories.filter((c) => c !== cat),
                  }));
                }}
              />
              {cat}
            </label>
          ))}
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
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border border-gray-300 rounded-lg p-3 h-32"
        required
      />

      <input
        name="recipeUrl"
        type="url"
        value={form.recipeUrl}
        onChange={handleChange}
        placeholder="Recipe Link (optional)"
        className="w-full border border-gray-300 rounded-lg p-3"
      />

      {form.image && (
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Image
            src={form.image}
            alt="Uploaded"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="flex justify-between py-2 px-4">
            <p className="text-sm text-gray-500 mt-1 text-center">
              Uploaded image preview
            </p>
            <button
              type="button"
              onClick={() => {
                setForm((prev) => ({ ...prev, image: "" }));
                setImageFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="mt-2 text-sm text-red-600 hover:underline cursor-pointer"
            >
              Remove image
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 items-center">
        <label
          htmlFor="dish-image"
          className="flex-1 cursor-pointer border border-gray-300 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50 transition text-center"
        >
          {imageFile ? imageFile.name : "Choose Image"}
        </label>

        <input
          ref={fileInputRef}
          id="dish-image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) setImageFile(e.target.files[0]);
          }}
          className="hidden"
        />

        <button
          type="button"
          disabled={!!form.image}
          onClick={handleImageUpload}
          className="h-[48px] px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
        >
          Upload
        </button>
      </div>

      <button
        type="submit"
        className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
      >
        {mode === "new" ? "Save Dish" : "Update Dish"}
      </button>

      {status && <p className="text-sm mt-2 text-green-600">{status}</p>}
      {error && <p className="text-sm mt-2 text-red-600">{error}</p>}
    </form>
  );
}
