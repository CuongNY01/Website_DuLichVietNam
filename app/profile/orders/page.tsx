"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/data';

export default function UserOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/profile/orders');
    }
    
    if (status === 'authenticated') {
      fetch('/api/user/bookings')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setOrders(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [status, router]);

  if (status === 'loading' || loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  if (!session) return null;

  const handleCancel = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn yêu cầu hủy tour này không?")) {
      try {
        const res = await fetch('/api/admin/bookings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, status: 'Đang chờ hủy' })
        });
        if (res.ok) {
          setOrders(orders.map(o => o.id === id ? { ...o, status: "Đang chờ hủy" } : o));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", padding: "40px 0" }}>
      <div className="container flex mobile-flex-col gap-8">
        
        {/* Sidebar (Reusable from Profile) */}
        <aside style={{ width: '100%', maxWidth: '300px', backgroundColor: 'white', padding: '32px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--primary-blue)', color: 'white', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 700 }}>
              {session.user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2 style={{ fontSize: '20px', color: 'var(--text-dark)', fontWeight: 800 }}>Hi, {session.user?.name || 'Khách'}</h2>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="/profile" style={{ padding: '12px', borderRadius: 'var(--radius-sm)', color: 'var(--text-dark)', fontWeight: 600 }}>Quản lý tài khoản</Link>
            <Link href="/profile/orders" style={{ padding: '12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(10, 88, 163, 0.1)', color: 'var(--primary-blue)', fontWeight: 700 }}>Chuyến đi của tôi</Link>
            <Link href="/" style={{ padding: '12px', borderRadius: 'var(--radius-sm)', color: 'var(--text-dark)', fontWeight: 600 }}>Trang chủ</Link>
          </nav>
        </aside>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '24px', color: 'var(--text-dark)', marginBottom: '32px', fontWeight: 800, textTransform: 'uppercase' }}>Quản lý đơn hàng cá nhân</h2>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: 'var(--text-gray)' }}>Bạn chưa có đơn hàng nào.</p>
                <Link href="/tours" style={{ color: 'var(--primary-blue)', fontWeight: 700, marginTop: '16px', display: 'inline-block' }}>Khám phá các Tour ngay</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {orders.map((order) => {
                  const displayTitle = order.tour?.title || order.hotel?.name || "Đơn hàng dịch vụ";
                  const displayImage = order.tour?.image || order.hotel?.image || "/hero_bg.png";
                  
                  return (
                    <div key={order.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '24px', display: 'flex', gap: '24px' }} className="mobile-flex-col">
                      <img src={displayImage} alt={displayTitle} style={{ width: '160px', height: '110px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                          <h3 style={{ fontSize: '18px', color: 'var(--text-dark)', fontWeight: 700, maxWidth: '400px' }}>{displayTitle}</h3>
                          <span style={{ 
                            backgroundColor: order.status === 'Hoàn tất' ? '#dcfce7' : '#fff7ed', 
                            color: order.status === 'Hoàn tất' ? '#166534' : '#9a3412', 
                            padding: '6px 16px', 
                            borderRadius: '20px', 
                            fontSize: '12px', 
                            fontWeight: 700 
                          }}>
                            {order.status}
                          </span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                          <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Mã đơn: <strong style={{ color: 'var(--text-dark)' }}>#{order.bookingCode}</strong></p>
                          <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Ngày đặt: <strong style={{ color: 'var(--text-dark)' }}>{order.date}</strong></p>
                          <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Tổng tiền: <strong style={{ color: 'var(--primary-blue)' }}>{formatCurrency(order.amount)}</strong></p>
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <button style={{ padding: '8px 20px', border: '1px solid var(--primary-blue)', color: 'var(--primary-blue)', borderRadius: '6px', fontWeight: 700, fontSize: '14px', backgroundColor: 'transparent' }}>
                            Xem chi tiết
                          </button>
                          
                          {order.paymentStatus === "Chưa thanh toán" && order.status !== "Đang chờ hủy" && (
                            <button 
                              onClick={async () => {
                                try {
                                  const res = await fetch('/api/vnpay/create_url', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ bookingId: order.id, amount: order.amount, language: 'vn' })
                                  });
                                  const data = await res.json();
                                  if (data.url) {
                                    window.location.href = data.url;
                                  } else {
                                    alert('Lỗi tạo thanh toán VNPay');
                                  }
                                } catch (error) {
                                  console.error("Payment error:", error);
                                  alert('Lỗi kết nối máy chủ');
                                }
                              }}
                              style={{ padding: '8px 20px', backgroundColor: 'var(--primary-blue)', color: 'white', borderRadius: '6px', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}
                            >
                              Thanh toán ngay
                            </button>
                          )}

                          {order.status === "Chờ xử lý" && (
                            <button 
                              onClick={() => handleCancel(order.id)}
                              style={{ padding: '8px 20px', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '6px', fontWeight: 700, fontSize: '14px', backgroundColor: 'transparent', cursor: 'pointer' }}
                            >
                              Yêu cầu hủy
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
