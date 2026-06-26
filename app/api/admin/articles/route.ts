export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function checkAdmin() {
  const session = await auth();
  return (session?.user as any)?.role === "ADMIN";
}

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching articles" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await req.json();
    const article = await prisma.article.create({
      data: {
        ...data,
        id: data.id || `ART-${Date.now()}`,
      }
    });
    return NextResponse.json(article);
  } catch (error) {
    console.error("Create article error:", error);
    return NextResponse.json({ error: "Error creating article" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, ...data } = await req.json();
    const article = await prisma.article.update({
      where: { id },
      data
    });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "Error updating article" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await prisma.article.delete({
      where: { id }
    });
    return NextResponse.json({ message: "Article deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting article" }, { status: 500 });
  }
}
