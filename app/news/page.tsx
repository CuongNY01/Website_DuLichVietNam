import React from 'react';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import PageBanner from '../../components/PageBanner';
import NewsletterForm from '../../components/NewsletterForm';

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const currentCat = typeof params.cat === 'string' ? params.cat : 'Tất cả';

  const where: any = {};
  if (currentCat !== 'Tất cả') {
    where.category = currentCat;
  }

  const articlesData = await prisma.article.findMany({
    where,
    orderBy: { date: 'desc' }
  });

  const categories = ['Tất cả', 'Cẩm nang du lịch', 'Mẹo hay', 'Khám phá', 'Ẩm thực', 'Sự kiện'];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)" }}>
      <PageBanner 
        title="TIN TỨC DU LỊCH" 
        subtitle={currentCat !== 'Tất cả' ? `Chuyên mục: ${currentCat}` : "Chia sẻ những kinh nghiệm, mẹo hay và những khám phá mới lạ từ mọi miền đất nước"} 
      />
      
      <div className="container" style={{ padding: '40px 0' }}>

        {/* Categories Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginBottom: '40px', 
          flexWrap: 'wrap' 
        }}>
          {categories.map((cat, i) => (
            <Link 
              key={i} 
              href={cat === 'Tất cả' ? '/news' : `/news?cat=${encodeURIComponent(cat)}`}
              style={{ 
                padding: '10px 24px', 
                borderRadius: 'var(--radius-full)', 
                border: `1.5px solid ${currentCat === cat ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                background: currentCat === cat ? 'var(--primary-blue)' : 'white',
                color: currentCat === cat ? 'white' : 'var(--text-dark)',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        {articlesData.length > 0 ? (
          <div className="grid-systems col-3">
            {articlesData.map((article: any) => (
              <Link key={article.id} href={`/news/${article.id}`} style={{ 
                backgroundColor: 'white', 
                borderRadius: 'var(--radius-md)', 
                overflow: 'hidden', 
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                textDecoration: 'none'
              }}>
                <div style={{ position: 'relative' }}>
                  <img src={article.image} alt={article.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 12, 
                    left: 12, 
                    backgroundColor: 'var(--accent-red)', 
                    color: 'white', 
                    padding: '4px 12px', 
                    borderRadius: 'var(--radius-sm)', 
                    fontSize: '11px', 
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}>{article.category}</div>
                </div>
                
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '12px' }}>📅 {article.date} · ✍️ {article.author}</div>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-dark)', marginBottom: '12px', fontWeight: 800, lineHeight: 1.4, flex: 1 }}>{article.title}</h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '20px', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{article.excerpt}</p>
                  <div style={{ marginTop: 'auto', fontWeight: 700, color: 'var(--primary-blue)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Đọc tiếp <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0', backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📰</div>
            <h3 style={{ color: 'var(--text-dark)', fontWeight: 800 }}>Chưa có bài viết nào trong chuyên mục này</h3>
            <Link href="/news" style={{ color: 'var(--primary-blue)', display: 'inline-block', marginTop: '12px' }}>Quay lại tất cả bài viết</Link>
          </div>
        )}

        {/* Newsletter Section */}
        <div style={{ 
          marginTop: '80px', 
          backgroundColor: 'white', 
          padding: '48px', 
          borderRadius: 'var(--radius-lg)', 
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: 'linear-gradient(to bottom, #ffffff, #f9fafb)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>✉️</div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '12px' }}>Đồng hành cùng cộng đồng Du Lịch Việt Nam</h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '15px', marginBottom: '32px', maxWidth: '500px' }}>Đăng ký nhận những tin bài mới nhất và các ưu đãi độc quyền dành riêng cho hội viên nhận qua email hàng tuần.</p>
          
          <NewsletterForm />
        </div>

      </div>
    </main>
  );
}
