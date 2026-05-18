"use client";

import React, { useState, use } from 'react';
import { getTourById, formatCurrency, Tour } from '../../../lib/data';
import Link from 'next/link';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const resolvedParams = use(params);
  const [tour, setTour] = useState<Tour | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("VNPay");
  const [bookingCode, setBookingCode] = useState("");

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=/book/${resolvedParams.id}`);
    }
  }, [status, router, resolvedParams.id]);

  React.useEffect(() => {
    // In a real app, this would be an API call
    const t = getTourById(resolvedParams.id);
    if (t) setTour(t);
  }, [resolvedParams.id]);

  if (status === 'loading') return <div style={{ padding: '40px', textAlign: 'center' }}>Đang xác thực...</div>;
  if (!session) return null;

  if (!tour) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải thông tin...</div>;

  const total = (adults * tour.price) + (children * (tour.price * 0.7)); // Trẻ em giảm 30%

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // 1. Create Booking in DB
      const resBooking = await fetch('/api/user/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour.id,
          amount: total,
          paymentMethod: paymentMethod
        })
      });
      
      const bookingData = await resBooking.json();
      
      if (!resBooking.ok) {
        alert(bookingData.error || 'Lỗi đặt tour');
        setIsProcessing(false);
        return;
      }
      
      setBookingCode(bookingData.bookingCode);

      // 2. Handle Payment Redirect
      if (paymentMethod === 'VNPay') {
        const resVNPay = await fetch('/api/vnpay/create_url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: bookingData.id,
            amount: total,
            language: 'vn'
          })
        });
        
        const vnpayData = await resVNPay.json();
        
        if (resVNPay.ok && vnpayData.url) {
          window.location.href = vnpayData.url;
        } else {
          alert('Lỗi tạo thanh toán VNPay');
          setIsProcessing(false);
        }
      } else {
        // Cash or other mock payment
        setTimeout(() => {
          setSuccess(true);
          setIsProcessing(false);
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi kết nối máy chủ');
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "white", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '20px' }}>
          {paymentMethod === "VNPay" ? (
            <>
              <img src="/vnpay-logo.png" alt="VNPay" style={{ height: '50px', marginBottom: '24px' }} />
              <div style={{ width: '60px', height: '60px', border: '5px solid #f3f3f3', borderTop: '5px solid #005baa', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 24px' }}></div>
              <h2 style={{ fontSize: '20px', color: '#005baa', fontWeight: 800 }}>ĐANG KẾT NỐI VỚI VNPAY...</h2>
              <p style={{ color: 'var(--text-gray)', marginTop: '8px' }}>Vui lòng thực hiện thanh toán trên ứng dụng ngân hàng hoặc quét mã QR sẽ hiển thị trong giây lát.</p>
            </>
          ) : (
            <>
              <div style={{ width: '60px', height: '60px', border: '5px solid #f3f3f3', borderTop: '5px solid var(--accent-red)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 24px' }}></div>
              <h2 style={{ fontSize: '20px', color: 'var(--text-dark)', fontWeight: 800 }}>ĐANG XỬ LÝ ĐƠN HÀNG...</h2>
              <p style={{ color: 'var(--text-gray)', marginTop: '8px' }}>Hệ thống đang kiểm tra tình trạng chỗ trống.</p>
            </>
          )}
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: '700px', backgroundColor: 'white', padding: '64px', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
           <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
           <h1 style={{ fontSize: '28px', color: 'var(--primary-blue)', marginBottom: '16px', fontWeight: 800 }}>THANH TOÁN THÀNH CÔNG!</h1>
           
           <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: 'var(--radius-md)', marginBottom: '32px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-gray)' }}>Mã đơn hàng:</span>
                <strong style={{ color: 'var(--text-dark)' }}>{bookingCode}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-gray)' }}>Phương thức:</span>
                <strong style={{ color: 'var(--primary-blue)' }}>{paymentMethod}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-gray)' }}>Tổng tiền:</span>
                <strong style={{ color: 'var(--accent-red)' }}>{formatCurrency(total)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-gray)' }}>Trạng thái:</span>
                <strong style={{ color: '#16a34a' }}>Đã xác nhận thanh toán</strong>
              </div>
           </div>

           <p style={{ color: 'var(--text-gray)', marginBottom: '32px', lineHeight: 1.6 }}>Cảm ơn bạn đã tin tưởng dịch vụ của Vietravel Premium. Một bản sao vé điện tử đã được gửi đến email của bạn. Chúng tôi sẽ liên hệ với bạn trong vòng 24h tới.</p>
           
           <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/profile/orders" style={{ display: 'inline-block', border: '2px solid var(--primary-blue)', color: 'var(--primary-blue)', padding: '14px 32px', borderRadius: 'var(--radius-full)', fontWeight: 700, textTransform: 'uppercase' }}>Xem Lịch Sử Đặt Tour</Link>
            <Link href="/" style={{ display: 'inline-block', backgroundColor: 'var(--primary-blue)', color: 'white', padding: '14px 32px', borderRadius: 'var(--radius-full)', fontWeight: 700, textTransform: 'uppercase' }}>Về Trang Chủ</Link>
           </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", padding: "40px 0" }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        <div style={{ marginBottom: '24px', color: 'var(--text-gray)', fontSize: '14px' }}>
           <Link href="/">Trang chủ</Link> {'>'} <Link href={`/tours/${tour.id}`}>Tour {tour.destination}</Link> {'>'} <span style={{ color: 'var(--text-dark)' }}>Xác nhận đặt hàng</span>
        </div>

        <h1 style={{ fontSize: '28px', color: 'var(--primary-blue)', marginBottom: '32px', fontWeight: 800 }}>ĐẶT TOUR DU LỊCH</h1>

        <form onSubmit={handleBooking} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '32px' }}>
          
          {/* Form Thông tin */}
          <div>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '24px', color: 'var(--text-dark)', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>1. THÔNG TIN LIÊN HỆ CỦA BẠN</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Họ và tên *</label>
                  <input required defaultValue={session.user?.name || ""} style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Số điện thoại *</label>
                  <input required type="tel" placeholder="VD: 0901234567" style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Email *</label>
                  <input required type="email" defaultValue={session.user?.email || ""} style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Địa chỉ</label>
                  <input placeholder="VD: Quận 1, TP. Hồ Chí Minh" style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} />
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '24px', color: 'var(--text-dark)', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>2. SỐ LƯỢNG HÀNH KHÁCH</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px dashed var(--border-color)' }}>
                <div>
                  <h4 style={{ fontSize: '16px', color: 'var(--text-dark)', fontWeight: 700, marginBottom: '4px' }}>Người lớn</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Trên 12 tuổi</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', background: 'white', fontSize: '20px', cursor: 'pointer' }}>-</button>
                  <span style={{ width: '20px', textAlign: 'center', fontWeight: 800, fontSize: '18px' }}>{adults}</span>
                  <button type="button" onClick={() => setAdults(adults + 1)} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', background: 'white', fontSize: '20px', cursor: 'pointer' }}>+</button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '16px', color: 'var(--text-dark)', fontWeight: 700, marginBottom: '4px' }}>Trẻ em</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Từ 2 - 11 tuổi (Giảm 30%)</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', background: 'white', fontSize: '20px', cursor: 'pointer' }}>-</button>
                  <span style={{ width: '20px', textAlign: 'center', fontWeight: 800, fontSize: '18px' }}>{children}</span>
                  <button type="button" onClick={() => setChildren(children + 1)} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', background: 'white', fontSize: '20px', cursor: 'pointer' }}>+</button>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginTop: '24px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '24px', color: 'var(--text-dark)', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>3. PHƯƠNG THỨC THANH TOÁN</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: paymentMethod === 'VNPay' ? '1.5px solid var(--primary-blue)' : '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: paymentMethod === 'VNPay' ? 'rgba(10, 88, 163, 0.05)' : 'white', cursor: 'pointer' }}>
                   <input type="radio" name="payment" checked={paymentMethod === 'VNPay'} onChange={() => setPaymentMethod('VNPay')} style={{ width: '18px', height: '18px' }} />
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <img src="/vnpay-logo.png" alt="VNPay" style={{ height: '24px' }} />
                     <div>
                       <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-dark)' }}>Cổng thanh toán VNPAY</strong>
                       <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Thanh toán qua ứng dụng ngân hàng, quét mã QR</span>
                     </div>
                   </div>
                 </label>
                 
                 <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: paymentMethod === 'Momo' ? '1.5px solid #a50064' : '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: paymentMethod === 'Momo' ? 'rgba(165, 0, 100, 0.05)' : 'white', cursor: 'pointer' }}>
                   <input type="radio" name="payment" checked={paymentMethod === 'Momo'} onChange={() => setPaymentMethod('Momo')} style={{ width: '18px', height: '18px' }} />
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" style={{ height: '24px' }} />
                     <div>
                       <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-dark)' }}>Ví điện tử MoMo</strong>
                       <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Thanh toán nhanh qua ứng dụng MoMo</span>
                     </div>
                   </div>
                 </label>

                 <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: paymentMethod === 'Tiền mặt' ? '1.5px solid var(--text-dark)' : '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: paymentMethod === 'Tiền mặt' ? '#f8fafc' : 'white', cursor: 'pointer' }}>
                   <input type="radio" name="payment" checked={paymentMethod === 'Tiền mặt'} onChange={() => setPaymentMethod('Tiền mặt')} style={{ width: '18px', height: '18px' }} />
                   <div>
                     <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-dark)' }}>Thanh toán tại quầy</strong>
                     <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Quý khách vui lòng đến văn phòng để thanh toán và nhận vé</span>
                   </div>
                 </label>
              </div>
            </div>
          </div>

          {/* Tóm tắt */}
          <div>
             <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', position: 'sticky', top: '100px', boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--primary-blue)', marginBottom: '24px', fontWeight: 800 }}>TÓM TẮT ĐƠN HÀNG</h3>
                
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                  <img src={tour.image} alt={tour.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                  <div>
                    <h4 style={{ fontSize: '15px', lineHeight: 1.4, marginBottom: '8px', color: 'var(--text-dark)', fontWeight: 700 }}>{tour.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Mã: {tour.code}</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                    <span style={{ color: 'var(--text-gray)' }}>Người lớn x {adults}</span>
                    <strong style={{ color: 'var(--text-dark)' }}>{formatCurrency(tour.price * adults)}</strong>
                  </div>
                  {children > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                      <span style={{ color: 'var(--text-gray)' }}>Trẻ em x {children}</span>
                      <strong style={{ color: 'var(--text-dark)' }}>{formatCurrency((tour.price * 0.7) * children)}</strong>
                    </div>
                  )}
                </div>

                <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)' }}>TỔNG CỘNG</span>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-red)', lineHeight: 1 }}>{formatCurrency(total)}</span>
                </div>

                <button type="submit" style={{ width: '100%', backgroundColor: 'var(--accent-red)', color: 'white', padding: '16px', borderRadius: 'var(--radius-md)', fontWeight: 800, fontSize: '16px', textTransform: 'uppercase', cursor: 'pointer', border: 'none', transition: 'all 0.3s' }}>
                  {paymentMethod === 'Tiền mặt' ? 'XÁC NHẬN ĐẶT TOUR' : 'THANH TOÁN NGAY'}
                </button>
             </div>
          </div>

        </form>
      </div>
    </main>
  );
}
