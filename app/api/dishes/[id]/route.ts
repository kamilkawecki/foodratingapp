import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, description, image, recipeUrl, categories } = await req.json();

  const updated = await prisma.dish.update({
    where: { id: params.id },
    data: {
      name,
      description,
      image,
      recipeUrl,
      categories: {
        set: [],
        connectOrCreate: categories.map((cat: string) => ({
          where: { name: cat },
          create: { name: cat },
        })),
      },
    },
    include: {
      categories: true,
    },
  });

  return NextResponse.json(updated);
}
