import { PrismaClient } from "@/lib/generated/prisma";
import { slugify } from "@/lib/slugify";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { name, description, image, recipeUrl, categories } = await req.json();

  const baseSlug = slugify(name);
  let slug = baseSlug;
  let suffix = 1;

  while (
    await prisma.dish.findFirst({
      where: {
        slug,
        NOT: { id: params.id },
      },
    })
  ) {
    slug = `${baseSlug}-${suffix++}`;
  }

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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.dish.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
