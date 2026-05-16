'use client';

import React, { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Xóa đánh giá này? Thao tác này không thể hoàn tác.')) {
      await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      fetchReviews();
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải đánh giá...</div>;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Quản lý đánh giá khách hàng</h1>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Sản phẩm (Tour)</th>
              <th>Đánh giá</th>
              <th>Nội dung</th>
              <th>Ngày gửi</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{review.user?.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{review.user?.email}</div>
                </td>
                <td style={{ maxWidth: '200px' }}>{review.tour?.title}</td>
                <td style={{ color: '#fbbf24', fontWeight: 'bold' }}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </td>
                <td style={{ maxWidth: '300px', fontSize: '14px' }}>{review.content}</td>
                <td>{new Date(review.createdAt).toLocaleDateString('vi-VN')}</td>
                <td>
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(review.id)}>Xóa</button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Chưa có đánh giá nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
