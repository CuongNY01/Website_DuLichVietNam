"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CancelContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const code = searchParams.get('code');

  return (
    <div className="container" style={{ maxWidth: '700px', backgroundColor: 'white', padding: '64px', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
       <div style={{ fontSize: '64px', marginBottom: '24px' }}>❌</div>
       <h1 style={{ fontSize: '28px', color: 'var(--accent-red)', marginBottom: '16px', fontWeight: 800 }}>THANH TOÁN KHÔNG THÀNH CÔNG</h1>
       
       <p style={{ color: 'var(--text-gray)', marginBottom: '32px', lineHeight: 1.6 }}>
         {error === 'checksum' ? 'Lỗi xác thực dữ liệu từ ngân hàng (Sai chữ ký).' : 
          error === 'config' ? 'Hệ thống chưa được cấu hình cổng thanh toán chính xác.' : 
          code ? `Giao dịch thất bại hoặc đã bị hủy (Mã lỗi: ${code}).` : 
          'Quá trình thanh toán đã bị hủy bỏ hoặc xảy ra sự cố không xác định.'}
       </p>
       
       <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link href="/profile/orders" style={{ display: 'inline-block', backgroundColor: 'var(--accent-red)', color: 'white', padding: '14px 32px', borderRadius: 'var(--radius-full)', fontWeight: 700, textTransform: 'uppercase' }}>Quản Lý Đơn Hàng</Link>
        <Link href="/" style={{ display: 'inline-block', border: '2px solid var(--text-gray)', color: 'var(--text-dark)', padding: '14px 32px', borderRadius: 'var(--radius-full)', fontWeight: 700, textTransform: 'uppercase' }}>Về Trang Chủ</Link>
       </div>
    </div>
  );
}

export default function CheckoutCancelPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", padding: "80px 0", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Suspense fallback={<div>Đang tải...</div>}>
        <CancelContent />
      </Suspense>
    </main>
  );
}
