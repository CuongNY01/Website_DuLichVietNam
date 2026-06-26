import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const currentDate = new Date();
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const totalTours = await prisma.tour.count();
    const totalHotels = await prisma.hotel.count();
    const totalUsers = await prisma.user.count();
    const newUsers = await prisma.user.count({
      where: { createdAt: { gte: currentMonthStart } }
    });
    
    const totalBookings = await prisma.booking.count();
    
    const bookings = await prisma.booking.findMany();
    const totalRevenue = bookings
      .filter(b => b.paymentStatus === 'Đã thanh toán')
      .reduce((sum, b) => sum + b.amount, 0);

    // Real monthly data for charts (last 6 months)
    const revenueData = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = `Tháng ${d.getMonth() + 1}`;
      
      const monthBookings = bookings.filter(b => {
        const bDate = new Date(b.createdAt);
        return bDate.getMonth() === d.getMonth() && 
               bDate.getFullYear() === d.getFullYear() &&
               b.paymentStatus === 'Đã thanh toán';
      });
      
      const monthRevenue = monthBookings.reduce((sum, b) => sum + b.amount, 0);
      revenueData.push({ name: monthStr, revenue: monthRevenue / 1000000 }); // in millions
    }

    const categoryData = [
      { name: "Tours", value: totalTours },
      { name: "Khách sạn", value: totalHotels },
    ];

    const statusData = [
      { name: "Đã thanh toán", value: bookings.filter(b => b.paymentStatus === 'Đã thanh toán').length },
      { name: "Chưa thanh toán", value: bookings.filter(b => b.paymentStatus === 'Chưa thanh toán').length },
      { name: "Thất bại/Hủy", value: bookings.filter(b => b.paymentStatus === 'Thất bại').length },
    ];

    const topTours = await prisma.tour.findMany({
      take: 5,
      orderBy: { rating: 'desc' }
    });

    const totalArticles = await prisma.article.count();
    const totalReviews = await prisma.review.count();
    const newReviews = await prisma.review.count({
      where: { createdAt: { gte: currentMonthStart } }
    });

    return NextResponse.json({
      stats: [
        { label: "Tổng doanh thu", value: `${(totalRevenue / 1000000).toLocaleString('vi-VN')}Tr VNĐ`, icon: "💰" },
        { label: "Tổng đơn hàng", value: totalBookings, icon: "📦" },
        { label: "Người dùng mới", value: newUsers, icon: "👤" },
        { label: "Đánh giá mới", value: newReviews, icon: "⭐" },
        { label: "Bài viết", value: totalArticles, icon: "📝" },
        { label: "Tours hiện có", value: totalTours, icon: "🗺️" },
      ],
      revenueData,
      categoryData,
      statusData,
      topTours
    });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching stats" }, { status: 500 });
  }
}
