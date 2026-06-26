"use client";

import React, { useState, use, useEffect, Suspense } from 'react';
import { hotels, formatCurrency, Hotel } from '../../../lib/data';
import Link from 'next/link';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

function BookingForm({ resolvedParams }: { resolvedParams: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomName = searchParams.get('roomName');
  
  const hotel = hotels.find(h => h.id === resolvedParams.id) || null;
  const [roomType, setRoomType] = useState('Phòng Đơn');
  const [numRooms, setNumRooms] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("VNPay");
  const [bookingCode, setBookingCode] = useState("");

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=/book-hotel/${resolvedParams.id}?roomName=${roomName || ''}`);
    }
  }, [status, router, resolvedParams.id, roomName]);

  let nights = 1;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    nights = diffDays > 0 ? diffDays : 1;
  }

  if (status === 'loading') return <div style={{ padding: '40px', textAlign: 'center' }}>Đang xác thực...</div>;
  if (!session) return null;

  if (!hotel) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải thông tin...</div>;

  let roomPrice = hotel.price;
  if (roomType === 'Phòng Đôi') roomPrice = hotel.price * 1.5;
  if (roomType === 'Phòng Gia Đình') roomPrice = hotel.price * 2.5;

  const total = roomPrice * numRooms * nights;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // 1. Create Booking in DB
      const resBooking = await fetch('/api/user/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId: hotel.id,
          amount: total,
          paymentMethod: paymentMethod
        })
      });
      
      const bookingData = await resBooking.json();
      
      if (!resBooking.ok) {
        alert(bookingData.error || 'Lỗi đặt phòng');
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
      <div style={{ minHeight: "100vh", backgroundColor: "white", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              <p style={{ color: 'var(--text-gray)', marginTop: '8px' }}>Hệ thống đang kiểm tra tình trạng phòng.</p>
            </>
          )}
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: '700px', backgroundColor: 'white', padding: '64px', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
           <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
           <h1 style={{ fontSize: '28px', color: 'var(--primary-blue)', marginBottom: '16px', fontWeight: 800 }}>THANH TOÁN THÀNH CÔNG!</h1>
           
           <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: 'var(--radius-md)', marginBottom: '32px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-gray)' }}>Mã đơn hàng:</span>
                <strong style={{ color: 'var(--text-dark)' }}>{bookingCode}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-gray)' }}>Khách sạn:</span>
                <strong style={{ color: 'var(--text-dark)' }}>{hotel.name} ({roomType})</strong>
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
                <strong style={{ color: '#16a34a' }}>Đã xác nhận đặt phòng</strong>
              </div>
           </div>

           <p style={{ color: 'var(--text-gray)', marginBottom: '32px', lineHeight: 1.6 }}>Cảm ơn bạn đã tin tưởng dịch vụ của Vietravel Premium. Xác nhận đặt phòng đã được gửi đến email của bạn.</p>
           
           <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/profile/orders" style={{ display: 'inline-block', border: '2px solid var(--primary-blue)', color: 'var(--primary-blue)', padding: '14px 32px', borderRadius: 'var(--radius-full)', fontWeight: 700, textTransform: 'uppercase' }}>Quản Lý Chuyến Đi</Link>
            <Link href="/" style={{ display: 'inline-block', backgroundColor: 'var(--primary-blue)', color: 'white', padding: '14px 32px', borderRadius: 'var(--radius-full)', fontWeight: 700, textTransform: 'uppercase' }}>Về Trang Chủ</Link>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '24px', color: 'var(--text-gray)', fontSize: '14px' }}>
          <Link href="/">Trang chủ</Link> {'>'} <Link href={`/hotel/${hotel.id}`}>{hotel.name}</Link> {'>'} <span style={{ color: 'var(--text-dark)' }}>Đặt phòng</span>
      </div>

      <h1 style={{ fontSize: '28px', color: 'var(--primary-blue)', marginBottom: '32px', fontWeight: 800 }}>XÁC NHẬN ĐẶT PHÒNG</h1>

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
            <h2 style={{ fontSize: '18px', marginBottom: '24px', color: 'var(--text-dark)', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>2. THÔNG TIN PHÒNG & THỜI GIAN</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Loại phòng *</label>
                <select value={roomType} onChange={(e) => setRoomType(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'white' }}>
                  <option value="Phòng Đơn">Phòng Đơn</option>
                  <option value="Phòng Đôi">Phòng Đôi</option>
                  <option value="Phòng Gia Đình">Phòng Gia Đình</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Số lượng phòng *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '6px 0' }}>
                  <button type="button" onClick={() => setNumRooms(Math.max(1, numRooms - 1))} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', background: 'white', fontSize: '20px', cursor: 'pointer' }}>-</button>
                  <span style={{ width: '20px', textAlign: 'center', fontWeight: 800, fontSize: '18px' }}>{numRooms}</span>
                  <button type="button" onClick={() => setNumRooms(numRooms + 1)} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', background: 'white', fontSize: '20px', cursor: 'pointer' }}>+</button>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Ngày nhận phòng *</label>
                <input required type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Ngày trả phòng *</label>
                <input required type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} />
              </div>
            </div>
            
            {checkIn && checkOut && (
              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px', fontSize: '14px', color: 'var(--text-dark)' }}>
                <strong>Thời gian lưu trú:</strong> {nights} đêm
              </div>
            )}
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

                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: paymentMethod === 'Tiền mặt' ? '1.5px solid var(--text-dark)' : '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: paymentMethod === 'Tiền mặt' ? '#f8fafc' : 'white', cursor: 'pointer' }}>
                  <input type="radio" name="payment" checked={paymentMethod === 'Tiền mặt'} onChange={() => setPaymentMethod('Tiền mặt')} style={{ width: '18px', height: '18px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-dark)' }}>Thanh toán tại quầy</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Quý khách vui lòng đến khách sạn để thanh toán và nhận phòng</span>
                  </div>
                </label>
            </div>
          </div>
        </div>

        {/* Tóm tắt */}
        <div>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', position: 'sticky', top: '100px', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--primary-blue)', marginBottom: '24px', fontWeight: 800 }}>TÓM TẮT ĐẶT PHÒNG</h3>
              
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <img src={hotel.image} alt={hotel.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                <div>
                  <h4 style={{ fontSize: '15px', lineHeight: 1.4, marginBottom: '8px', color: 'var(--text-dark)', fontWeight: 700 }}>{hotel.name}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>📍 {hotel.location}</p>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                  <span style={{ color: 'var(--text-gray)' }}>Loại phòng:</span>
                  <strong style={{ color: 'var(--text-dark)', textAlign: 'right' }}>{roomType}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                  <span style={{ color: 'var(--text-gray)' }}>Đơn giá/đêm:</span>
                  <strong style={{ color: 'var(--text-dark)' }}>{formatCurrency(roomPrice)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                  <span style={{ color: 'var(--text-gray)' }}>Số lượng:</span>
                  <strong style={{ color: 'var(--text-dark)' }}>{numRooms} phòng x {nights} đêm</strong>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)' }}>TỔNG CỘNG</span>
                <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-red)', lineHeight: 1 }}>{formatCurrency(total)}</span>
              </div>

              <button type="submit" style={{ width: '100%', backgroundColor: 'var(--accent-red)', color: 'white', padding: '16px', borderRadius: 'var(--radius-md)', fontWeight: 800, fontSize: '16px', textTransform: 'uppercase', cursor: 'pointer', border: 'none', transition: 'all 0.3s' }}>
                {paymentMethod === 'Tiền mặt' ? 'XÁC NHẬN ĐẶT PHÒNG' : 'THANH TOÁN NGAY'}
              </button>
            </div>
        </div>

      </form>
    </div>
  );
}

export default function HotelBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", padding: "40px 0" }}>
      <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Đang tải...</div>}>
        <BookingForm resolvedParams={resolvedParams} />
      </Suspense>
    </main>
  );
}
