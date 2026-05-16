import React from 'react';
import { formatCurrency } from '../../../lib/data';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const tourData = await prisma.tour.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!tourData) {
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Tour không tồn tại</div>;
  }

  // Parse JSON fields
  const itinerary = JSON.parse(tourData.itinerary) as {day: string, title: string, desc: string}[];
  const features = JSON.parse(tourData.features) as string[];
  const policies = tourData.policies ? JSON.parse(tourData.policies) as string[] : [
    "Bao gồm: Xe đưa đón, Hướng dẫn viên, Vé tham quan, Ăn uống theo chương trình.",
    "Không bao gồm: Chi phí cá nhân, Thuế VAT, Tiền tip cho HDV.",
    "Chính sách hủy: Hủy trước 7 ngày không mất phí, hủy sau 7 ngày mất 50% phí."
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", padding: "40px 0" }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px', color: 'var(--text-gray)', fontSize: '14px' }}>
           <Link href="/">Trang chủ</Link> {'>'} <Link href="/tours">Du lịch</Link> {'>'} <span style={{ color: 'var(--text-dark)' }}>{tourData.title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '32px' }}>
          
          {/* Main Info */}
          <div>
            <h1 style={{ fontSize: '28px', color: 'var(--text-dark)', marginBottom: '16px', lineHeight: 1.3, fontWeight: 800 }}>{tourData.title}</h1>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: 'var(--radius-sm)', fontSize: '14px', border: '1px solid var(--border-color)', color: 'var(--primary-blue)', fontWeight: 600 }}>📍 Điểm đến: {tourData.destination}</span>
              <span style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: 'var(--radius-sm)', fontSize: '14px', border: '1px solid var(--border-color)', color: 'var(--primary-blue)', fontWeight: 600 }}>⏱️ Thời gian: {tourData.duration}</span>
              <span style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: 'var(--radius-sm)', fontSize: '14px', border: '1px solid var(--border-color)', color: 'var(--primary-blue)', fontWeight: 600 }}>🛫 Nơi khởi hành: {tourData.departurePoint}</span>
            </div>

            <img src={tourData.image} alt={tourData.title} style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: '32px', boxShadow: 'var(--shadow-md)' }} />

            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--primary-blue)', fontWeight: 800, textTransform: 'uppercase' }}>Tổng quan chuyến đi</h2>
              <p style={{ color: 'var(--text-dark)', lineHeight: 1.8, fontSize: '15px' }}>{tourData.description}</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--primary-blue)', fontWeight: 800, textTransform: 'uppercase' }}>Lịch trình chi tiết</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {itinerary.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '20px', borderBottom: idx !== itinerary.length - 1 ? '1px dashed var(--border-color)' : 'none', paddingBottom: idx !== itinerary.length - 1 ? '20px' : '0' }}>
                    <div style={{ color: 'white', backgroundColor: 'var(--primary-blue)', padding: '6px 12px', height: 'fit-content', borderRadius: '4px', fontWeight: 700, fontSize: '13px', whiteSpace: 'nowrap' }}>
                      {item.day}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-dark)' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-gray)', fontSize: '15px', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--primary-blue)', fontWeight: 800, textTransform: 'uppercase' }}>Chính sách & Điều khoản</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0 }}>
                {policies.map((policy, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '12px', color: 'var(--text-dark)', fontSize: '15px', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--primary-blue)' }}>●</span>
                    {policy}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews Section */}
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--primary-blue)', fontWeight: 800, textTransform: 'uppercase' }}>Đánh giá từ khách hàng</h2>
              
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#475569' }}>AN</div>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '15px' }}>Anh Nguyễn</strong>
                      <span style={{ color: '#fbbf24' }}>★★★★★</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: 1.5 }}>Chuyến đi rất tuyệt vời, hướng dẫn viên nhiệt tình. Khách sạn sạch sẽ, đồ ăn ngon!</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#475569' }}>TH</div>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '15px' }}>Thanh Hằng</strong>
                      <span style={{ color: '#fbbf24' }}>★★★★☆</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: 1.5 }}>Cảnh đẹp, lịch trình hơi dày một chút nhưng bù lại được đi nhiều nơi. Sẽ quay lại!</p>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '16px', marginBottom: '16px', fontWeight: 700 }}>Để lại đánh giá của bạn</h4>
                <textarea placeholder="Chia sẻ trải nghiệm của bạn về tour này..." style={{ width: '100%', height: '100px', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', marginBottom: '16px', resize: 'none' }}></textarea>
                <button style={{ backgroundColor: 'var(--primary-blue)', color: 'white', padding: '10px 24px', borderRadius: 'var(--radius-full)', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Gửi đánh giá</button>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', position: 'sticky', top: '100px', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--primary-blue)', marginBottom: '24px', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>THÔNG TIN ĐẶT TOUR</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
                 <span style={{ color: 'var(--text-gray)' }}>Mã Tour:</span>
                 <strong style={{ color: 'var(--text-dark)' }}>{tourData.code}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
                 <span style={{ color: 'var(--text-gray)' }}>Khởi hành:</span>
                 <strong style={{ color: 'var(--text-dark)' }}>{tourData.departureDate} ({tourData.time})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
                 <span style={{ color: 'var(--text-gray)' }}>Chỗ trống:</span>
                 <strong style={{ color: 'var(--accent-red)' }}>Còn {tourData.seats} chỗ</strong>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px', marginBottom: '24px' }}>
                {features.map((feat, i) => (
                  <span key={i} style={{ backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>✓ {feat}</span>
                ))}
              </div>

              <hr style={{ border: 'none', borderTop: '1px dashed var(--border-color)', margin: '24px 0' }} />
              
              <div style={{ textAlign: 'right', marginBottom: '24px' }}>
                 <div style={{ color: 'var(--text-light)', textDecoration: 'line-through', fontSize: '14px', marginBottom: '4px' }}>Giá cũ: {formatCurrency(tourData.oldPrice)}</div>
                 <div style={{ color: 'var(--accent-red)', fontSize: '28px', fontWeight: 800 }}>{formatCurrency(tourData.price)}</div>
                 <div style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Tối thiểu 1 Khách</div>
              </div>

              <Link href={`/book/${tourData.id}`} style={{ display: 'block', backgroundColor: 'var(--accent-red)', color: 'white', textAlign: 'center', padding: '16px', borderRadius: 'var(--radius-md)', fontWeight: 800, fontSize: '16px', textTransform: 'uppercase', transition: 'all 0.3s', boxShadow: '0 4px 6px rgba(225, 37, 27, 0.2)' }}>
                ĐẶT NGAY TRỰC TUYẾN
              </Link>
              
              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-gray)' }}>
                Hoặc gọi tổng đài <strong style={{ color: 'var(--primary-blue)' }}>1900 1839</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
