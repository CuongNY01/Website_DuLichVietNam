import React from 'react';

import PageBanner from '../../components/PageBanner';
import ContactForm from '../../components/ContactForm';

export default function ContactPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)" }}>
      <PageBanner 
        title="LIÊN HỆ" 
        subtitle="Chúng tôi luôn lắng nghe mọi ý kiến đóng góp và phản hồi từ Quý khách hàng" 
      />
      
      <div className="container" style={{ maxWidth: '1000px', padding: '40px 0' }}>

        {/* Contact Info Cards */}
        <div className="grid-systems col-3" style={{ marginBottom: '40px' }}>
          {[
            { icon: '📞', label: 'Điện thoại', value: '1900 1839', sub: 'Hỗ trợ 24/7' },
            { icon: '✉️', label: 'Email', value: 'hotro@dulichvietnam.vn', sub: 'Phản hồi trong 24h' },
            { icon: '📍', label: 'Trụ sở chính', value: 'Đường Phan Tây Nhạc, Xuân Phương', sub: 'Nam Từ Liêm, Hà Nội' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: 'white', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px' }}>{item.label}</h3>
              <p style={{ fontSize: '16px', fontWeight: 900, color: 'var(--primary-blue)', marginBottom: '4px' }}>{item.value}</p>
              <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Form and Map Placeholder */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }} className="mobile-flex-col">
          
          {/* Contact Form */}
          <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
             <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '32px', borderLeft: '4px solid var(--primary-blue)', paddingLeft: '16px' }}>GỬI THÔNG TIN YÊU CẦU</h2>
             <ContactForm />
          </div>

          {/* Location Map Placeholder */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
             <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '350px' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8638!2d105.7416!3d21.0382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x1030e4612e49c71a!2zWHXDom4gUGjGsMahbmcsIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1715844855000!5m2!1svi!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
             </div>

             <div style={{ backgroundColor: 'var(--primary-blue)', color: 'white', padding: '40px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Kết nối với Du Lịch Việt Nam</h3>
                <p style={{ opacity: 0.8, fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>Nhà tổ chức du lịch hàng đầu Việt Nam hiện có mặt tại 20+ chi nhánh trên toàn quốc và quốc tế.</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                   {['FB', 'IG', 'YT', 'TK'].map(s => (
                     <div key={s} style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>{s}</div>
                   ))}
                </div>
             </div>
          </div>

        </div>

      </div>
    </main>
  );
}
