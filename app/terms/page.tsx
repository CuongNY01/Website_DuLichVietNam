import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  const sections = [
    { title: '1. Quy định chung', desc: 'Chào mừng quý khách đến với website của Du Lịch Việt Nam. Khi truy cập và sử dụng dịch vụ của chúng tôi, quý khách đồng ý tuân thủ các điều kiện và điều khoản dưới đây.' },
    { title: '2. Chính sách bảo mật', desc: 'Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn một cách tốt nhất. Mọi thông tin bạn cung cấp (Tên, SDT, Email) chỉ được dùng cho mục đích đặt tour và nâng cao chất lượng dịch vụ.' },
    { title: '3. Điều khoản đặt tour & Thanh toán', desc: 'Quý khách có thể thanh toán trực tuyến qua các cổng thanh toán được hỗ trợ hoặc chuyển khoản ngân hàng. Đơn hàng chỉ được xác nhận sau khi chúng tôi nhận được khoản đặt cọc theo quy định.' },
    { title: '4. Chính sách đổi trả & Hủy tour', desc: 'Việc hủy tour phải được thông báo bằng văn bản hoặc email. Tùy thuộc vào thời điểm hủy, quý khách sẽ chịu mức phí phạt tương ứng (Từ 10% đến 100% giá trị tour).' },
    { title: '5. Quyền và nghĩa vụ', desc: 'Du Lịch Việt Nam có trách nhiệm cung cấp dịch vụ đúng như cam kết. Khách hàng có nghĩa vụ tuân thủ các quy định về an toàn du lịch và pháp luật sở tại.' },
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", padding: "40px 0" }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--primary-blue)', marginBottom: '16px' }}>ĐIỀU KHOẢN & CHÍNH SÁCH</h1>
          <p style={{ color: 'var(--text-gray)', fontSize: '15px' }}>Cập nhật lần cuối: Tháng 4/2026</p>
        </div>

        {/* Content Wrapper */}
        <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
           {sections.map((sec, i) => (
             <div key={i} style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>{sec.title}</h3>
                <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-gray)' }}>{sec.desc}</p>
                {i < sections.length - 1 && <hr style={{ marginTop: '40px', border: 'none', borderTop: '1px solid #f1f5f9' }} />}
             </div>
           ))}

           {/* Call to action */}
           <div style={{ backgroundColor: '#f0f9ff', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid #bae0ff', marginTop: '64px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '12px' }}>Bạn có bất kỳ thắc mắc nào khác?</h4>
              <p style={{ color: 'var(--text-gray)', fontSize: '15px', marginBottom: '24px' }}>Chúng tôi luôn sẵn sàng giải đáp các câu hỏi từ Quý khách 24/7 qua đội ngũ tư vấn pháp lý.</p>
              <Link href="/contact" style={{ display: 'inline-block', backgroundColor: 'var(--primary-blue)', color: 'white', padding: '12px 32px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>LIÊN HỆ NGAY</Link>
           </div>
        </div>



      </div>
    </main>
  );
}
