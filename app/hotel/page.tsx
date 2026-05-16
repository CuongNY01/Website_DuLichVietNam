import React from 'react';
import Link from 'next/link';
import { formatCurrency } from '../../lib/data';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import PageBanner from '../../components/PageBanner';

export default async function HotelPage() {
  const hotelsData = await prisma.hotel.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)" }}>
      <PageBanner 
        title="KHÁCH SẠN NỔI BẬT" 
        subtitle="Hàng ngàn lựa chọn chỗ nghỉ cao cấp từ resort đến khách sạn trung tâm" 
      />
      
      <div className="container" style={{ padding: '40px 0' }}>

        <h2 style={{ fontSize: '22px', color: 'var(--primary-blue)', marginBottom: '24px', textTransform: 'uppercase', fontWeight: 800 }}>Khách sạn nổi bật được đề xuất</h2>
        
        <div className="grid-systems col-3">
          {hotelsData.map((h: any) => (
            <div key={h.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)',
              transition: 'transform 0.3s'
            }}>
               <div style={{ position: 'relative' }}>
                 <img src={h.image} alt={h.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                 <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 700 }}>
                   ⭐ {h.rating} / 10
                 </div>
               </div>
               <div style={{ padding: '24px' }}>
                  <div style={{ color: 'var(--accent-yellow)', marginBottom: '4px', fontSize: '14px' }}>
                    {'★'.repeat(h.stars)}{'☆'.repeat(5-h.stars)}
                  </div>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: 800, lineHeight: 1.4 }}>{h.name}</h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '16px' }}>📍 {h.location}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {typeof h.features === 'string' ? JSON.parse(h.features).slice(0, 2).map((f: string, i: number) => (
                      <span key={i} style={{ fontSize: '12px', backgroundColor: 'var(--background-light)', padding: '4px 8px', borderRadius: '4px', color: 'var(--text-gray)' }}>{f}</span>
                    )) : h.features?.slice(0, 2).map((f: string, i: number) => (
                        <span key={i} style={{ fontSize: '12px', backgroundColor: 'var(--background-light)', padding: '4px 8px', borderRadius: '4px', color: 'var(--text-gray)' }}>{f}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px dashed var(--border-color)', paddingTop: '16px' }}>
                     <div style={{ fontSize: '13px', color: 'var(--text-gray)' }}>{h.reviews} lượt đánh giá</div>
                     <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-light)', textDecoration: 'line-through', display: 'block' }}>{formatCurrency(h.oldPrice)}</span>
                        <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-red)' }}>{formatCurrency(h.price)}</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}> /đêm</span>
                     </div>
                  </div>
                  <Link href={`/hotel/${h.id}`} style={{ width: '100%', marginTop: '20px', display: 'block' }}>
                    <button style={{ width: '100%', padding: '12px', background: 'var(--primary-blue)', color: 'white', borderRadius: 'var(--radius-sm)', fontWeight: 700, border: 'none', cursor: 'pointer' }}>XEM PHÒNG TRỐNG</button>
                  </Link>
               </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
