import React from 'react';
import Link from 'next/link';

import PageBanner from '../../components/PageBanner';

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <PageBanner 
        title="VỀ CHÚNG TÔI" 
        subtitle="Đồng hành cùng bạn trên mọi hành trình khám phá thế giới" 
      />
      
      <div className="container" style={{ padding: '40px 0' }}>

        {/* Story Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', marginBottom: '100px' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '24px' }}>Hành trình 30 năm kiến tạo niềm vui</h2>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--text-gray)', marginBottom: '24px' }}>Được thành lập từ năm 1995, Du Lịch Việt Nam đã không ngừng nỗ lực để trở thành thương hiệu du lịch hàng đầu không chỉ tại Việt Nam mà còn vươn tầm quốc tế. Với triết lý khách hàng là trung tâm, chúng tôi cam kết mang đến những giá trị và trải nghiệm du lịch khác biệt nhất.</p>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--text-gray)' }}>Chúng tôi tự hào là đơn vị tiên phong trong việc đổi mới sản phẩm, ứng dụng công nghệ để nâng cao chất lượng dịch vụ và bảo vệ môi trường thông qua các chương trình &quot;Du lịch xanh&quot;.</p>
          </div>
          <img src="/hero_bg.png" alt="About Du Lịch Việt Nam" style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} />
        </div>

        {/* Mission & Vision cards */}
        <div className="grid-systems col-3" style={{ marginBottom: '100px' }}>
          {[
            { title: 'Tầm nhìn', desc: 'Trở thành tập đoàn du lịch hàng đầu khu vực, là sự lựa chọn số 1 của du khách.' },
            { title: 'Sứ mệnh', desc: 'Mang lại cảm xúc thăng hoa cho du khách trong mỗi hành trình khám phá thế giới.' },
            { title: 'Giá trị cốt lõi', desc: 'Chuyên nghiệp, sáng tạo, không ngừng đổi mới và tôn trọng khách hàng.' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#f9fafb', padding: '40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '16px' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.6, fontSize: '15px' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={{ backgroundColor: 'var(--primary-blue)', color: 'white', padding: '80px 0', borderRadius: 'var(--radius-lg)', marginBottom: '100px', textAlign: 'center' }}>
          <div className="container">
            <div className="grid-systems col-4">
              {[
                { label: 'Năm thành lập', value: '1995' },
                { label: 'Khách hàng hài lòng', value: '10M+' },
                { label: 'Giải thưởng quốc tế', value: '150+' },
                { label: 'Đối tác chiến lược', value: '500+' },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: '48px', fontWeight: 900, marginBottom: '8px' }}>{stat.value}</div>
                  <div style={{ fontSize: '16px', opacity: 0.8, fontWeight: 700, textTransform: 'uppercase' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Awards list (mock images/icons) */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '48px' }}>Các giải thưởng tiêu biểu đã đạt được</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', opacity: 0.6 }}>
            {['World Travel Awards', 'TTG Travel Awards', 'The Guide Awards', 'Sao Vàng Đất Việt'].map(a => (
              <div key={a} style={{ fontWeight: 800, fontSize: '18px', border: '2px solid var(--border-color)', padding: '24px', borderRadius: '8px', minWidth: '180px' }}>{a}</div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
