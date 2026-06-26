export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function checkAdmin() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") {
    return false;
  }
  return true;
}

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const hotels = await prisma.hotel.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(hotels);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await req.json();
    const hotel = await prisma.hotel.create({
      data: {
        id: data.id || `ht-${Date.now()}`,
        name: data.name,
        location: data.location,
        image: data.image || '/promo_japan.png',
        price: Number(data.price),
        oldPrice: data.oldPrice ? Number(data.oldPrice) : 0,
        discount: data.discount || null,
        rating: Number(data.rating) || 9.0,
        reviews: Number(data.reviews) || 0,
        stars: Number(data.stars) || 5,
        description: data.description || '',
        amenities: data.amenities || '[]',
        rooms: data.rooms || '[]',
        features: data.features || '[]',
      }
    });
    return NextResponse.json(hotel);
  } catch (error) {
    console.error('Error creating hotel:', error);
    return NextResponse.json({ error: 'Failed to create hotel' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, ...data } = await req.json();
    const hotel = await prisma.hotel.update({
      where: { id },
      data: {
        ...data,
        price: data.price ? Number(data.price) : undefined,
        oldPrice: data.oldPrice ? Number(data.oldPrice) : undefined,
        stars: data.stars ? Number(data.stars) : undefined,
        rating: data.rating ? Number(data.rating) : undefined,
      }
    });
    return NextResponse.json(hotel);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hotel' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    
    await prisma.hotel.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete hotel' }, { status: 500 });
  }
}
