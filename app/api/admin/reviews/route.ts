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
    const reviews = await prisma.review.findMany({
      include: {
        tour: { select: { title: true } },
        user: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching reviews" }, { status: 500 });
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

    await prisma.review.delete({
      where: { id }
    });
    return NextResponse.json({ message: "Review deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting review" }, { status: 500 });
  }
}
