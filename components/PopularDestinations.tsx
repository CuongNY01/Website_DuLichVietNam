"use client";

import React from 'react';
import styles from './PopularDestinations.module.css';
import Link from 'next/link';

const destinations = [
  { name: 'Hạ Long', image: '/destinations/ha-long.png', count: '120+ Tours' },
  { name: 'Đà Nẵng', image: '/destinations/da-nang.png', count: '85+ Tours' },
  { name: 'Phú Quốc', image: '/destinations/phu-quoc.png', count: '60+ Tours' },
  { name: 'Sapa', image: '/destinations/sapa.png', count: '45+ Tours' },
  { name: 'Đà Lạt', image: '/destinations/da-lat.png', count: '70+ Tours' },
];

export default function PopularDestinations() {
  return (
    <section className="container mb-12">
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-dark)', marginBottom: '12px' }}>
          ĐIỂM ĐẾN <span style={{ color: 'var(--primary-blue)' }}>YÊU THÍCH</span>
        </h2>
        <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto' }}>
          Khám phá những địa danh tuyệt đẹp và nổi tiếng nhất tại Việt Nam được hàng triệu du khách bình chọn
        </p>
      </div>

      <div className={styles.destGrid}>
        {destinations.map((dest, i) => (
          <Link href={`/tours?dest=${dest.name}`} key={i} className={styles.destCard}>
            <img src={dest.image} alt={dest.name} />
            <div className={styles.overlay}>
              <h3 className={styles.destName}>{dest.name}</h3>
              <span className={styles.tourCount}>{dest.count}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
