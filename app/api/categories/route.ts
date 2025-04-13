import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  const existing = await prisma.category.findUnique({ where: { name } });
  if (existing) {
    return NextResponse.json(
      { error: "Category already exists" },
      { status: 409 }
    );
  }

  const category = await prisma.category.create({ data: { name } });
  return NextResponse.json(category, { status: 201 });
}
