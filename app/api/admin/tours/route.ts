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
    const tours = await prisma.tour.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(tours);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tours' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await req.json();
    
    // Check if code already exists
    const existingTour = await prisma.tour.findUnique({
      where: { code: data.code }
    });
    
    if (existingTour) {
      return NextResponse.json({ error: "Mã tour đã tồn tại. Vui lòng chọn mã khác." }, { status: 400 });
    }

    const tour = await prisma.tour.create({
      data: {
        id: data.id || `tour-${Date.now()}`,
        code: data.code || `TOUR${Math.floor(Math.random() * 10000)}`,
        title: data.title,
        destination: data.destination,
        departurePoint: data.departurePoint || 'TP. Hồ Chí Minh',
        image: data.image || '/hero_bg.png',
        departureDate: data.departureDate,
        time: data.time || '08:00 AM',
        duration: data.duration || '1 ngày',
        oldPrice: data.oldPrice ? Number(data.oldPrice) : 0,
        price: Number(data.price),
        discount: data.discount || null,
        seats: Number(data.seats),
        rating: Number(data.rating) || 5.0,
        category: data.category || 'Trong nước',
        description: data.description || '',
        features: data.features || '[]',
        itinerary: data.itinerary || '[]',
        policies: data.policies || '[]',
      }
    });
    return NextResponse.json(tour);
  } catch (error) {
    console.error('Error creating tour:', error);
    return NextResponse.json({ error: 'Failed to create tour' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, ...data } = await req.json();
    const tour = await prisma.tour.update({
      where: { id },
      data: {
        ...data,
        price: data.price ? Number(data.price) : undefined,
        oldPrice: data.oldPrice ? Number(data.oldPrice) : undefined,
        seats: data.seats ? Number(data.seats) : undefined,
      }
    });
    return NextResponse.json(tour);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update tour' }, { status: 500 });
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
    
    await prisma.tour.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete tour' }, { status: 500 });
  }
}
