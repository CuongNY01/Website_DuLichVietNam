"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email hoặc mật khẩu không chính xác');
      } else {
        router.push('/profile');
        router.refresh();
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
           <h1 style={{ fontSize: '24px', color: 'var(--primary-blue)', fontWeight: 800, marginBottom: '8px' }}><span style={{ color: 'var(--accent-red)' }}>VongQuanh</span>TheGioi</h1>
           <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Đăng nhập để nhận nhiều ưu đãi dành cho hội viên</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '14px', textAlign: 'center', fontWeight: 600 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-gray)', marginBottom: '8px' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com" 
              style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} 
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-gray)' }}>Mật khẩu</label>
              <Link href="#" style={{ fontSize: '13px', color: 'var(--primary-blue)', fontWeight: 500 }}>Quên mật khẩu?</Link>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="123456" 
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
            {loading ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP'}
          </button>
        </form>

        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '24px' }}>
           <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', position: 'absolute', top: '50%', left: 0, right: 0, zIndex: 1 }} />
           <span style={{ backgroundColor: 'white', padding: '0 16px', position: 'relative', zIndex: 2, color: 'var(--text-gray)', fontSize: '13px' }}>Hoặc đăng nhập bằng</span>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
           <button 
            onClick={() => signIn('google', { callbackUrl: '/profile' })}
            style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'white', cursor: 'pointer', fontWeight: 600 }}
           >
            Google
           </button>
           <button 
            onClick={() => signIn('facebook', { callbackUrl: '/profile' })}
            style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'white', cursor: 'pointer', fontWeight: 600 }}
           >
            Facebook
           </button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-dark)' }}>
          Chưa có tài khoản? <Link href="/register" style={{ color: 'var(--accent-red)', fontWeight: 700 }}>Đăng ký ngay</Link>
        </div>
      </div>
    </main>
  );
}
