import React from 'react';
import styles from './PromotionGrid.module.css';
import Link from 'next/link';

export default function PromotionGrid() {
  return (
    <section className="container mb-8">
      <h2 className={styles.sectionTitle}>KHUYẾN MÃI HẤP DẪN</h2>
      <div className={styles.grid}>
        <Link href="/tours?dest=Phú Quốc" className={styles.promoCard}>
          <img src="/promo_europe.png" alt="Phú Quốc" />
          <div className={styles.promoOverlay}>
            <h3>THIÊN ĐƯỜNG ĐẢO NGỌC PHÚ QUỐC</h3>
          </div>
        </Link>
        <Link href="/tours?dest=Nha Trang" className={styles.promoCard}>
          <img src="/promo_japan.png" alt="Nha Trang" />
          <div className={styles.promoOverlay}>
            <h3>KHÁM PHÁ VỊNH BIỂN NHA TRANG</h3>
          </div>
        </Link>
        <Link href="/tours?dest=Đà Lạt" className={styles.promoCard}>
          <img src="/hero_bg.png" alt="Đà Lạt" />
          <div className={styles.promoOverlay}>
            <h3>THÀNH PHỐ NGÀN HOA ĐÀ LẠT</h3>
          </div>
        </Link>
      </div>
    </section>
  );
}
