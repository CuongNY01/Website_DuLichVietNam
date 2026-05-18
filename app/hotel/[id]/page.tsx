"use client";

import React, { useState, use } from 'react';
import { hotels, formatCurrency, Hotel } from '../../../lib/data';
import Link from 'next/link';

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState('overview');
  
  const hotel = hotels.find(h => h.id === resolvedParams.id);

  if (!hotel) {
    return (
      <div style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary-blue)' }}>Khách sạn không tồn tại</h2>
        <Link href="/hotel" style={{ color: 'var(--accent-red)', fontWeight: 700 }}> Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", padding: "20px 0 80px" }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: '20px', color: 'var(--text-gray)', fontSize: '14px' }}>
          <Link href="/">Trang chủ</Link> {'>'} <Link href="/hotel">Khách sạn</Link> {'>'} <span style={{ color: 'var(--text-dark)' }}>{hotel.name}</span>
        </div>

        {/* Hotel Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ color: 'var(--accent-yellow)', marginBottom: '8px', fontSize: '18px' }}>
                {'★'.repeat(hotel.stars)}{'☆'.repeat(5 - hotel.stars)}
              </div>
              <h1 style={{ fontSize: '32px', color: 'var(--text-dark)', fontWeight: 900, marginBottom: '8px' }}>{hotel.name}</h1>
              <p style={{ color: 'var(--text-gray)', fontSize: '16px' }}>📍 {hotel.location}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'var(--primary-blue)', color: 'white', padding: '8px 16px', borderRadius: 'var(--radius-md)', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px', fontWeight: 900 }}>{hotel.rating}</span>
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Tuyệt vời</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{hotel.reviews} đánh giá</div>
                </div>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-gray)' }}>Giá từ <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--accent-red)' }}>{formatCurrency(hotel.price)}</span></div>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gridTemplateRows: 'repeat(2, 200px)', 
          gap: '12px', 
          marginBottom: '40px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}>
          <div style={{ gridRow: 'span 2', position: 'relative' }}>
            <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {hotel.gallery?.slice(1, 3).map((img, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img src={img} alt={`${hotel.name} ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {i === 1 && hotel.gallery && hotel.gallery.length > 3 && (
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700 }}>
                  +{hotel.gallery.length - 3} ảnh
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '2.4fr 1fr', gap: '32px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Action Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '40px' }}>
              {['Gói ưu đãi', 'Vị trí', 'Đánh giá', 'Chính sách'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                    padding: '16px 0', 
                    border: 'none', 
                    background: 'none', 
                    color: activeTab === tab ? 'var(--primary-blue)' : 'var(--text-gray)', 
                    fontWeight: 700, 
                    fontSize: '16px',
                    borderBottom: activeTab === tab ? '3px solid var(--primary-blue)' : '3px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Description */}
            <section style={{ backgroundColor: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-dark)' }}>Giới thiệu khách sạn</h2>
              <p style={{ lineHeight: 1.8, color: 'var(--text-dark)', fontSize: '15px' }}>{hotel.description}</p>
            </section>

            {/* Amenities Grid */}
            <section style={{ backgroundColor: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-dark)' }}>Tiện nghi nổi bật</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {hotel.amenities?.map((ame, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{ame.icon}</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-dark)', fontWeight: 600 }}>{ame.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Room Availability */}
            <section id="rooms">
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px', color: 'var(--primary-blue)' }}>Các loại phòng hiện có</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {hotel.rooms?.map((room, i) => (
                  <div key={i} style={{ backgroundColor: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: '240px', backgroundColor: '#f8fafc', borderRight: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                      🛌
                    </div>
                    <div style={{ padding: '24px', flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px' }}>{room.name}</h3>
                        <p style={{ color: 'var(--text-gray)', fontSize: '13px', marginBottom: '16px' }}>👤 {room.capacity}</p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {room.amenities.map((a, j) => (
                            <span key={j} style={{ fontSize: '11px', backgroundColor: 'var(--background-light)', padding: '4px 8px', borderRadius: '4px', color: 'var(--text-gray)' }}>{a}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--accent-red)' }}>{formatCurrency(room.price)}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-gray)' }}>/đêm (đã gồm thuế)</div>
                        </div>
                        <Link href={`/book-hotel/${hotel.id}?roomName=${encodeURIComponent(room.name)}`} style={{ display: 'inline-block', backgroundColor: 'var(--accent-red)', color: 'white', padding: '10px 24px', borderRadius: 'var(--radius-sm)', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'transform 0.2s', textDecoration: 'none', textAlign: 'center' }}>
                          ĐẶT PHÒNG
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sticky Sidebar Info */}
          <aside>
            <div style={{ position: 'sticky', top: '100px', backgroundColor: 'white', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px', color: 'var(--primary-blue)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Tại sao nên đặt tại đây?</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                  <span style={{ color: '#16a34a' }}>✓</span>
                  <span>Giá tốt nhất thị trường</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                  <span style={{ color: '#16a34a' }}>✓</span>
                  <span>Xác nhận phòng tức thì</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                  <span style={{ color: '#16a34a' }}>✓</span>
                  <span>Hỗ trợ khách hàng 24/7</span>
                </li>
              </ul>
              
              <div style={{ marginTop: '32px', backgroundColor: '#fff7ed', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid #fed7aa' }}>
                <p style={{ fontSize: '12px', color: '#9a3412', fontWeight: 700, marginBottom: '4px' }}>⚡ ĐANG CÓ NHIỀU NGƯỜI XEM</p>
                <p style={{ fontSize: '12px', color: '#9a3412' }}>Đã có 5 lượt đặt trong 24 giờ qua cho khách sạn này.</p>
              </div>
            </div>
          </aside>
        </div>

      </div>
    </main>
  );
}
