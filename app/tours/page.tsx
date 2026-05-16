import React from 'react';
import { formatCurrency } from '../../lib/data';
import CardTour from '../../components/CardTour';
import TourSort from '../../components/TourSort';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import PageBanner from '../../components/PageBanner';

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const destQuery = typeof params.dest === 'string' ? params.dest : '';
  const priceFilter = typeof params.price === 'string' ? params.price : '';
  const startPoint = typeof params.start === 'string' ? params.start : '';
  const sort = typeof params.sort === 'string' ? params.sort : 'default';

  // Build Prisma query
  // ... (rest of query logic remains the same)
  let where: any = {};
  if (destQuery) {
    where.OR = [
      { destination: { contains: destQuery } },
      { title: { contains: destQuery } }
    ];
  }
  if (startPoint) {
    where.departurePoint = { contains: startPoint };
  }
  if (priceFilter) {
    if (priceFilter === 'under5') where.price = { lt: 5000000 };
    else if (priceFilter === '5to10') where.price = { gte: 5000000, lte: 10000000 };
    else if (priceFilter === '10to20') where.price = { gte: 10000000, lte: 20000000 };
    else if (priceFilter === 'over20') where.price = { gt: 20000000 };
  }

  let orderBy: any = {};
  if (sort === 'priceAsc') orderBy.price = 'asc';
  else if (sort === 'priceDesc') orderBy.price = 'desc';
  else if (sort === 'rating') orderBy.rating = 'desc';
  else orderBy.createdAt = 'desc';

  const results = await prisma.tour.findMany({
    where,
    orderBy: Object.keys(orderBy).length ? orderBy : undefined
  });

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)" }}>
      <PageBanner 
        title="KHÁM PHÁ TOURS" 
        subtitle={destQuery ? `Kết quả tìm kiếm cho: "${destQuery}"` : "Hàng trăm tour du lịch hấp dẫn đang chờ đón bạn"} 
      />
      
      <div className="container" style={{ padding: '40px 0' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px', color: 'var(--text-gray)', fontSize: '14px' }}>
          <Link href="/">Trang chủ</Link> {'>'} <span>Tìm kiếm tour</span>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Sidebar */}
          <aside style={{ width: '280px', flexShrink: 0, backgroundColor: 'white', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', height: 'fit-content' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--text-dark)' }}>Lọc kết quả</h3>
                <Link href="/tours" style={{ fontSize: '12px', color: 'var(--primary-blue)' }}>Xóa lọc</Link>
             </div>
             
             <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--text-gray)', fontWeight: 700 }}>MỨC GIÁ</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link href={`/tours?price=under5&dest=${destQuery}`} style={{ fontSize: '14px', color: priceFilter === 'under5' ? 'var(--primary-blue)' : 'var(--text-dark)', fontWeight: priceFilter === 'under5' ? 700 : 400 }}>Dưới 5 triệu</Link>
                  <Link href={`/tours?price=5to10&dest=${destQuery}`} style={{ fontSize: '14px', color: priceFilter === '5to10' ? 'var(--primary-blue)' : 'var(--text-dark)', fontWeight: priceFilter === '5to10' ? 700 : 400 }}>5 - 10 triệu</Link>
                  <Link href={`/tours?price=10to20&dest=${destQuery}`} style={{ fontSize: '14px', color: priceFilter === '10to20' ? 'var(--primary-blue)' : 'var(--text-dark)', fontWeight: priceFilter === '10to20' ? 700 : 400 }}>10 - 20 triệu</Link>
                  <Link href={`/tours?price=over20&dest=${destQuery}`} style={{ fontSize: '14px', color: priceFilter === 'over20' ? 'var(--primary-blue)' : 'var(--text-dark)', fontWeight: priceFilter === 'over20' ? 700 : 400 }}>Trên 20 triệu</Link>
                </div>
             </div>

             <div>
                <h4 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--text-gray)', fontWeight: 700 }}>ĐIỂM KHỞI HÀNH</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link href={`/tours?start=Hồ Chí Minh&dest=${destQuery}`} style={{ fontSize: '14px', color: startPoint === 'Hồ Chí Minh' ? 'var(--primary-blue)' : 'var(--text-dark)', fontWeight: startPoint === 'Hồ Chí Minh' ? 700 : 400 }}>Hồ Chí Minh</Link>
                  <Link href={`/tours?start=Hà Nội&dest=${destQuery}`} style={{ fontSize: '14px', color: startPoint === 'Hà Nội' ? 'var(--primary-blue)' : 'var(--text-dark)', fontWeight: startPoint === 'Hà Nội' ? 700 : 400 }}>Hà Nội</Link>
                  <Link href={`/tours?start=Đà Nẵng&dest=${destQuery}`} style={{ fontSize: '14px', color: startPoint === 'Đà Nẵng' ? 'var(--primary-blue)' : 'var(--text-dark)', fontWeight: startPoint === 'Đà Nẵng' ? 700 : 400 }}>Đà Nẵng</Link>
                </div>
             </div>
          </aside>

          {/* List */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ color: 'var(--text-gray)', fontSize: '14px' }}>
                Tìm thấy <strong style={{ color: 'var(--primary-blue)' }}>{results.length}</strong> kết quả phù hợp
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-gray)' }}>Sắp xếp theo:</span>
                <TourSort 
                  currentSort={sort}
                  destQuery={destQuery}
                  priceFilter={priceFilter}
                  startPoint={startPoint}
                />
              </div>
            </div>

            {results.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {results.map(tour => (
                  <CardTour 
                    key={tour.id} 
                    id={tour.id}
                    image={tour.image}
                    code={tour.code}
                    title={tour.title}
                    departureDate={tour.departureDate}
                    time={tour.time}
                    oldPrice={formatCurrency(tour.oldPrice)}
                    price={formatCurrency(tour.price)}
                    discount={tour.discount || ""}
                    seats={tour.seats}
                    destination={tour.destination}
                    duration={tour.duration}
                    departurePoint={tour.departurePoint}
                  />
                ))}
              </div>
            ) : (
              <div style={{ backgroundColor: 'white', padding: '64px', textAlign: 'center', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ marginBottom: '8px', color: 'var(--text-dark)' }}>Không tìm thấy tour phù hợp</h3>
                <p style={{ color: 'var(--text-gray)' }}>Vui lòng thử thay đổi điều kiện lọc hoặc từ khóa tìm kiếm.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
