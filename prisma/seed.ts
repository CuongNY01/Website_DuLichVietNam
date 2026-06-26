import { PrismaClient } from '@prisma/client';
import { tours, hotels, articles } from '../lib/data';
import { recentBookings } from '../lib/booking-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // 1. Tours
  for (const tour of tours) {
    await prisma.tour.upsert({
      where: { id: tour.id },
      update: {},
      create: {
        id: tour.id,
        code: tour.code,
        title: tour.title,
        destination: tour.destination,
        departurePoint: tour.departurePoint,
        image: tour.image,
        departureDate: tour.departureDate,
        time: tour.time,
        duration: tour.duration,
        oldPrice: tour.oldPrice,
        price: tour.price,
        discount: tour.discount,
        seats: tour.seats,
        rating: tour.rating,
        reviews_count: tour.reviews,
        category: tour.category || "",
        description: tour.description,
        features: JSON.stringify(tour.features),
        itinerary: JSON.stringify(tour.itinerary),
        policies: JSON.stringify((tour as any).policies || [
          "Bao gồm: Xe đưa đón, Hướng dẫn viên, Vé tham quan, Ăn uống theo chương trình.",
          "Không bao gồm: Chi phí cá nhân, Thuế VAT, Tiền tip cho HDV.",
          "Chính sách hủy: Hủy trước 7 ngày không mất phí, hủy sau 7 ngày mất 50% phí."
        ])
      }
    });
  }

  // 2. Hotels
  for (const hotel of hotels) {
    await prisma.hotel.upsert({
      where: { id: hotel.id },
      update: {},
      create: {
        id: hotel.id,
        name: hotel.name,
        location: hotel.location,
        image: hotel.image,
        price: hotel.price,
        oldPrice: hotel.oldPrice,
        discount: (hotel as any).discount || null,
        rating: hotel.rating,
        reviews: hotel.reviews,
        stars: hotel.stars,
        description: hotel.description || "",
        amenities: JSON.stringify(hotel.amenities),
        rooms: JSON.stringify(hotel.rooms),
        features: JSON.stringify(hotel.features)
      }
    });
  }

  // 3. Articles
  for (const article of articles) {
    await prisma.article.upsert({
      where: { id: article.id },
      update: {},
      create: {
        id: article.id,
        title: article.title,
        date: article.date,
        category: article.category,
        image: article.image,
        excerpt: article.excerpt,
        content: article.content,
        author: article.author
      }
    });
  }

  // 4. Bookings
  for (const booking of recentBookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        bookingCode: (booking as any).bookingCode || `BK-${Math.floor(Math.random() * 10000)}`,
        customerName: booking.customer,
        date: booking.date,
        amount: booking.amount,
        status: booking.status,
        paymentMethod: (booking as any).paymentMethod || "Tiền mặt",
        paymentStatus: (booking as any).paymentStatus || "Chưa thanh toán"
      }
    });
  }

  // 5. User and Reviews
  const mockUser = await prisma.user.upsert({
    where: { email: 'testuser@example.com' },
    update: {},
    create: {
      name: 'Nguyễn Văn A',
      email: 'testuser@example.com',
      password: 'password123',
    }
  });

  await prisma.review.deleteMany({
    where: { userId: mockUser.id }
  });

  const reviewsData = [
    { content: "Tour rất tuyệt vời, HDV nhiệt tình.", rating: 5, tourId: "vn-01" },
    { content: "Đồ ăn ngon, chỗ ở thoải mái. Rất đáng tiền.", rating: 4, tourId: "vn-02" },
    { content: "Phong cảnh tuyệt đẹp, gia đình tôi đã có một chuyến đi đáng nhớ.", rating: 5, tourId: "vn-03" },
    { content: "Giá cả hợp lý, tuy nhiên lịch trình hơi dày đặc.", rating: 4, tourId: "vn-04" },
    { content: "Dịch vụ hoàn hảo từ A đến Z, sẽ giới thiệu cho bạn bè.", rating: 5, tourId: "vn-05" },
    { content: "Chất lượng đúng như quảng cáo, xe đưa đón mới và sạch sẽ.", rating: 5, tourId: "vn-06" },
    { content: "Cảnh báo một số điểm tham quan hơi đông đúc vào dịp lễ.", rating: 4, tourId: "vn-07" },
    { content: "Hướng dẫn viên cực kỳ hài hước và am hiểu lịch sử.", rating: 5, tourId: "vn-08" },
    { content: "Mình đi trúng ngày mưa nên hơi buồn xíu, nhưng tour tổ chức tốt.", rating: 4, tourId: "vn-09" },
    { content: "Một chuyến đi chữa lành thực sự, cảm ơn công ty.", rating: 5, tourId: "vn-10" }
  ];

  for (const review of reviewsData) {
    await prisma.review.create({
      data: {
        content: review.content,
        rating: review.rating,
        tourId: review.tourId,
        userId: mockUser.id
      }
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
