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
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching bookings" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, ...data } = await req.json();
    const booking = await prisma.booking.update({
      where: { id },
      data
    });
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: "Error updating booking" }, { status: 500 });
  }
}
