import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendBookingConfirmationEmail } from "@/lib/mailer";

export async function GET() {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        bookings: {
          include: {
            tour: {
              select: { code: true, title: true, image: true }
            },
            hotel: {
              select: { name: true, image: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.bookings);
  } catch (error) {
    console.error("Fetch user bookings error:", error);
    return NextResponse.json({ error: "Error fetching bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookingId = require('crypto').randomBytes(16).toString('hex');
    const bookingCode = `BK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const paymentMethod = data.paymentMethod || "Tiền mặt";

    const newBooking = await prisma.booking.create({
      data: {
        id: bookingId,
        bookingCode,
        customerId: user.id,
        customerName: user.name,
        tourId: data.tourId || null,
        hotelId: data.hotelId || null,
        date: new Date().toLocaleDateString('vi-VN'),
        amount: data.amount,
        status: "Chờ xử lý",
        paymentMethod: paymentMethod,
        paymentStatus: "Chưa thanh toán"
      },
      include: { tour: true, hotel: true }
    });

    // Gửi email nếu khách hàng chọn Tiền mặt hoặc phương thức khác (trừ VNPay vì VNPay sẽ gửi mail sau khi thanh toán xong)
    if (paymentMethod !== 'VNPay') {
      await sendBookingConfirmationEmail(newBooking, user.email);
    }

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "Error creating booking" }, { status: 500 });
  }
}

