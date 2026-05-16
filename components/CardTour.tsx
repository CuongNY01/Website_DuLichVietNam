import Link from 'next/link';
import React from 'react';
import styles from './CardTour.module.css';

interface TourProps {
  id?: string;
  image: string;
  code: string;
  title: string;
  departureDate: string;
  time: string;
  oldPrice: string;
  price: string;
  discount: string;
  seats: number;
  destination?: string;
  duration?: string;
  departurePoint?: string;
}

export default function CardTour({ 
  id, image, code, title, departureDate, time, oldPrice, price, discount, seats, 
  destination = "Việt Nam", duration = "3 ngày 2 đêm", departurePoint = "TP. Hồ Chí Minh" 
}: TourProps) {
  const linkHref = id ? `/tours/${id}` : "#";

  return (
    <Link href={linkHref} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={image} alt={title} />
        <div className={styles.badge}>Ưu Đãi</div>
        <div className={styles.rating}>⭐ 8.5 Tuyệt vời</div>
        <div className={styles.hoverOverlay}>
          <div className={styles.hoverInfo}>📍 {destination}</div>
          <div className={styles.hoverInfo}>⏱️ {duration}</div>
          <div className={styles.hoverInfo}>🛫 {departurePoint}</div>
          <div className={styles.hoverBtn}>XEM CHI TIẾT</div>
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.date}>{departureDate} - {time}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.meta}>Mã tour: {code}</p>
        
        <div className={styles.features}>
           <span>Khách sạn 4-5 sao</span>
           <span>Vé máy bay khứ hồi</span>
        </div>

        <div className={styles.priceContainer}>
          <div className={styles.priceLeft}>
            <p className={styles.oldPrice}>Giá cũ: <del>{oldPrice}</del></p>
            <p className={styles.price}>{price}</p>
          </div>
          <div className={styles.discountBadge}>
            GIẢM {discount}
          </div>
        </div>
        
        <div className={styles.footer}>
           <p className={styles.seats}>Số chỗ còn nhận: <span className={styles.seatNum}>{seats}</span></p>
           <button className={styles.bookBtn}>Đặt Ngay</button>
        </div>
      </div>
    </Link>
  );
}
