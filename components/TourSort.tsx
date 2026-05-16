"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

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
      style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', cursor: 'pointer' }}
    >
      <option value="default">Mới nhất</option>
      <option value="priceAsc">Giá thấp đến cao</option>
      <option value="priceDesc">Giá cao đến thấp</option>
      <option value="rating">Đánh giá cao nhất</option>
    </select>
  );
}
