"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'tour' | 'hotel'>('tour');
  const [dest, setDest] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'tour') {
      const params = new URLSearchParams();
      if (dest) params.append('dest', dest);
      if (priceRange) params.append('price', priceRange);
      router.push(`/tours?${params.toString()}`);
    } else {
      router.push(`/hotel?search=${encodeURIComponent(dest)}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/tours?dest=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <section className={styles.heroWrapper}>
        <div className={styles.heroImage}>
          <img src="/hero_bg_sunset.png" alt="Cảnh hoàng hôn tuyệt đẹp" />
        </div>
        
        <div className={styles.heroContent}>
          <p style={{ color: 'var(--accent-red)', fontSize: '18px', fontStyle: 'italic', marginBottom: '8px' }}>Chào mừng bạn đến với Du Lịch Việt Nam</p>
          <h1 style={{ maxWidth: '800px', margin: '0 auto 24px' }}>Khám phá địa điểm yêu thích của bạn với chúng tôi</h1>
          <p style={{ fontSize: '18px', fontWeight: 400 }}>Mọi hành trình đều bắt đầu từ một lần tìm kiếm</p>
        </div>
        
        <div className={styles.searchContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'tour' ? styles.active : ""}`}
              onClick={() => setActiveTab('tour')}
            >
              Tìm kiếm Tour
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'hotel' ? styles.active : ""}`}
              onClick={() => setActiveTab('hotel')}
            >
              Tìm kiếm khách sạn
            </button>
          </div>
          
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.inputGroup}>
              <label>{activeTab === 'tour' ? 'TOUR' : 'KHÁCH SẠN'}</label>
              <input 
                type="text" 
                placeholder="Bạn muốn đi đâu?" 
                value={dest}
                onChange={(e) => setDest(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>NGÀY KHỞI HÀNH</label>
              <input type="date" />
            </div>
            <div className={styles.inputGroup}>
              <label>NGÀY TRỞ VỀ</label>
              <input type="date" />
            </div>
            <div className={styles.inputGroup}>
              <label>KHOẢNG GIÁ</label>
              <select 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                style={{ border: 'none', outline: 'none', fontWeight: 700, fontSize: '15px', background: 'transparent' }}
              >
                <option value="">Tất cả</option>
                <option value="under5">Dưới 5 triệu</option>
                <option value="5to10">5 - 10 triệu</option>
                <option value="10to20">10 - 20 triệu</option>
                <option value="over20">Trên 20 triệu</option>
              </select>
            </div>
            <button type="submit" className={styles.searchBtn}>
              TÌM KIẾM
            </button>
          </form>
        </div>
      </section>

      <div className="container" style={{ position: 'relative' }}>
        <div className={styles.features}>
            {[
              { icon: '🏯', text: 'Di Tích & Văn Hoá' },
              { icon: '🏖️', text: 'Nghỉ Dưỡng Biển' },
              { icon: '🏕️', text: 'Khám Phá Rừng Núi' },
              { icon: '🛍️', text: 'Mua Sắm & Tiện Ích' },
            ].map((feat, i) => (
              <div 
                key={i} 
                className={styles.featureCard} 
                onClick={() => handleCategoryClick(feat.text)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.featureIcon}>{feat.icon}</div>
                <span className={styles.featureText}>{feat.text}</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
