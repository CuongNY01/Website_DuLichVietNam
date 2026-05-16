"use client";

import React from 'react';
import styles from './PageBanner.module.css';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageBanner({ title, subtitle, image = '/hero_bg_sunset.png' }: PageBannerProps) {
  return (
    <section className={styles.bannerWrapper}>
      <div className={styles.bannerImage}>
        <img src={image} alt={title} />
      </div>
      
      <div className={styles.bannerContent}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
