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
