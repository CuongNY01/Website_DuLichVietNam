import React from 'react';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ArticleDetailPage({ params }: { params: any }) {
  const { id } = await params;
  
  const article = await prisma.article.findUnique({
    where: { id }
  });

  if (!article) {
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Bài viết không tồn tại.</div>;
  }

  // Fetch related articles (same category, different id)
  const relatedArticles = await prisma.article.findMany({
    where: { 
      category: article.category,
      NOT: { id: article.id }
    },
    take: 2
  });

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'white', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px', color: 'var(--text-gray)', fontSize: '14px' }}>
          <Link href="/">Trang chủ</Link> {'>'} <Link href="/news">Tin tức</Link> {'>'} <span style={{ color: 'var(--text-dark)' }}>{article.title}</span>
        </div>

        {/* Article Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '16px', color: 'var(--accent-red)', fontWeight: 800, textTransform: 'uppercase', fontSize: '14px' }}>{article.category}</div>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-dark)', marginBottom: '16px', lineHeight: 1.3 }}>{article.title}</h1>
          <div style={{ fontSize: '15px', color: 'var(--text-gray)', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span>👤 Tác giả: {article.author}</span>
            <span>📅 Ngày đăng: {article.date}</span>
          </div>
        </div>

        {/* Featured Image */}
        <img src={article.image} alt={article.title} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', marginBottom: '40px', boxShadow: 'var(--shadow-lg)' }} />

        {/* Content Body */}
        <div 
          style={{ 
            fontSize: '17px', 
            lineHeight: 1.8, 
            color: 'var(--text-dark)',
            marginBottom: '64px' 
          }} 
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />

        {/* Social Share */}
        <div style={{ padding: '32px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 800, color: 'var(--text-dark)' }}>Chia sẻ bài viết ngay:</span>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Facebook', 'Twitter', 'Linked In', 'WhatsApp'].map(s => (
              <button key={s} style={{ padding: '8px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', background: 'white', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Related Articles list */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '32px' }}>Các bài viết liên quan bạn nên đọc</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {relatedArticles.map((a) => (
              <Link key={a.id} href={`/news/${a.id}`} style={{ display: 'flex', gap: '24px', alignItems: 'center', backgroundColor: '#f9fafb', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                <img src={a.image} alt={a.title} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '4px' }}>{a.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>📅 {a.date} · {a.category}</p>
                </div>
              </Link>
            ))}
            {relatedArticles.length === 0 && <p style={{ color: '#94a3b8' }}>Chưa có bài viết liên quan khác.</p>}
          </div>
        </div>

      </div>
    </main>
  );
}
