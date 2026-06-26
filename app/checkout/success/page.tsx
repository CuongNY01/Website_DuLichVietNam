"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="container" style={{ maxWidth: '700px', backgroundColor: 'white', padding: '64px', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
       <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
       <h1 style={{ fontSize: '28px', color: 'var(--primary-blue)', marginBottom: '16px', fontWeight: 800 }}>THANH TOÁN THÀNH CÔNG!</h1>
       
       <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: 'var(--radius-md)', marginBottom: '32px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-gray)' }}>Mã đơn hàng gốc:</span>
            <strong style={{ color: 'var(--text-dark)' }}>{orderId || 'Không rõ'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-gray)' }}>Phương thức:</span>
            <strong style={{ color: 'var(--primary-blue)' }}>VNPAY</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-gray)' }}>Trạng thái:</span>
            <strong style={{ color: '#16a34a' }}>Đã xác nhận thanh toán</strong>
          </div>
       </div>

       <p style={{ color: 'var(--text-gray)', marginBottom: '32px', lineHeight: 1.6 }}>Cảm ơn bạn đã tin tưởng dịch vụ của DuLichVietNam. Một bản sao vé điện tử đã được gửi đến email của bạn. Chúng tôi sẽ liên hệ với bạn trong vòng 24h tới.</p>
       
       <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link href="/profile/orders" style={{ display: 'inline-block', border: '2px solid var(--primary-blue)', color: 'var(--primary-blue)', padding: '14px 32px', borderRadius: 'var(--radius-full)', fontWeight: 700, textTransform: 'uppercase' }}>Xem Lịch Sử Đặt Tour</Link>
        <Link href="/" style={{ display: 'inline-block', backgroundColor: 'var(--primary-blue)', color: 'white', padding: '14px 32px', borderRadius: 'var(--radius-full)', fontWeight: 700, textTransform: 'uppercase' }}>Về Trang Chủ</Link>
       </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", padding: "80px 0", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Suspense fallback={<div>Đang tải...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
