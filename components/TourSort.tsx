"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './TourSort.module.css';

interface TourSortProps {
  currentSort: string;
  destQuery: string;
  priceFilter: string;
  startPoint: string;
}

export default function TourSort({ currentSort, destQuery, priceFilter, startPoint }: TourSortProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    const params = new URLSearchParams();
    if (destQuery) params.set('dest', destQuery);
    if (priceFilter) params.set('price', priceFilter);
    if (startPoint) params.set('start', startPoint);
    params.set('sort', sort);
    
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <select 
      defaultValue={currentSort}
      onChange={handleChange}
      className={styles.sortSelect}
      aria-label="Sắp xếp danh sách tour"
      title="Sắp xếp danh sách tour"
    >
      <option value="default">Mới nhất</option>
      <option value="priceAsc">Giá thấp đến cao</option>
      <option value="priceDesc">Giá cao đến thấp</option>
      <option value="rating">Đánh giá cao nhất</option>
    </select>
  );
}
