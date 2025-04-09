import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  const { name, description, image, categories } = body;

  if (!name || !description || !Array.isArray(categories)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const dish = await prisma.dish.create({
    data: {
      name,
      description,
      image,
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
      categories: {
        select: { name: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(dishes);
}
