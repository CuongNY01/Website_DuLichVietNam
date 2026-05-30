"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [devLink, setDevLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setDevLink('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        if (data.devLink) {
          setDevLink(data.devLink);
        }
      } else {
        setError(data.error || 'Email không tồn tại hoặc có lỗi xảy ra.');
      }
    } catch (err) {
      setError('Lỗi kết nối đến máy chủ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '440px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>📧</div>
          <h2 style={{ color: 'var(--primary-blue)', marginBottom: '12px' }}>Đã gửi yêu cầu!</h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '24px' }}>
            Chúng tôi đã gửi một liên kết đặt lại mật khẩu đến <strong>{email}</strong>. Vui lòng kiểm tra hộp thư đến của bạn.
          </p>
          
          {devLink && (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px dashed #22c55e', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', textAlign: 'left' }}>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#15803d', marginBottom: '8px' }}>[MÔI TRƯỜNG PHÁT TRIỂN / DEMO]</span>
              <p style={{ fontSize: '13px', color: '#166534', marginBottom: '8px' }}>Nhấp vào liên kết bên dưới để đặt lại mật khẩu nhanh:</p>
              <Link href={devLink} style={{ fontSize: '13px', color: 'var(--primary-blue)', fontWeight: 600, wordBreak: 'break-all', textDecoration: 'underline' }}>
                {devLink}
              </Link>
            </div>
          )}

          <Link href="/login" style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '14px' }}>
            Quay lại trang đăng nhập
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', color: 'var(--primary-blue)', fontWeight: 800, marginBottom: '8px' }}>
            <span style={{ color: 'var(--accent-red)' }}>Quên</span> Mật Khẩu?
          </h1>
          <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '14px', textAlign: 'center', fontWeight: 600 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-gray)', marginBottom: '8px' }}>Email liên kết với tài khoản</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@gmail.com" 
              style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              backgroundColor: loading ? 'var(--text-gray)' : 'var(--primary-blue)', 
              color: 'white', 
              padding: '16px', 
              borderRadius: 'var(--radius-md)', 
              fontWeight: 700, 
              fontSize: '15px', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              border: 'none', 
              marginBottom: '24px',
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-dark)' }}>
          Nhớ lại mật khẩu? <Link href="/login" style={{ color: 'var(--accent-red)', fontWeight: 700 }}>Đăng nhập</Link>
        </div>
      </div>
    </main>
  );
}
