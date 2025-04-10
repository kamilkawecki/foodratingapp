import { PrismaClient } from "@/lib/generated/prisma";
import { slugify } from "@/lib/slugify";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  const { name, description, image, categories, recipeUrl } = body;

  if (!name || !description || !Array.isArray(categories)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const baseSlug = slugify(name);
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.dish.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  const dish = await prisma.dish.create({
    data: {
      name,
      slug,
      description,
      image,
      recipeUrl,
      categories: {
        connectOrCreate: categories.map((catName: string) => ({
          where: { name: catName },
          create: { name: catName },
        })),
      },
    },
    include: {
      categories: true,
    },
  });

  return NextResponse.json(dish, { status: 201 });
}

export async function GET() {
  const dishes = await prisma.dish.findMany({
    include: {
      categories: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(dishes);
}
