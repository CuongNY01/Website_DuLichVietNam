"use client";

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Mock API call
    setTimeout(() => {
      alert('Cảm ơn bạn đã đăng ký nhận bản tin của Du Lịch Việt Nam! Chúng tôi sẽ gửi những ưu đãi mới nhất đến ' + email);
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '500px' }}>
      <input 
        type="email" 
        placeholder="Nhập email của bạn..." 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ 
          flex: 1, 
          padding: '14px 20px', 
          borderRadius: 'var(--radius-sm)', 
          border: '1px solid var(--border-color)', 
          outline: 'none',
          fontSize: '15px'
        }} 
      />
      <button 
        type="submit" 
        disabled={loading}
        style={{ 
          padding: '14px 28px', 
          backgroundColor: 'var(--primary-blue)', 
          color: 'white', 
          borderRadius: 'var(--radius-sm)', 
          fontWeight: 700, 
          border: 'none', 
          cursor: 'pointer',
          transition: 'opacity 0.2s'
        }}
      >
        {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ NGAY'}
      </button>
    </form>
  );
}
