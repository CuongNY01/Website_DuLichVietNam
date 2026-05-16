"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.error || 'Có lỗi xảy ra khi đăng ký');
      }
    } catch (error) {
      console.error('Register error:', error);
      setError('Lỗi kết nối đến máy chủ');
    }
  };

  if (success) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '440px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
          <h2 style={{ color: 'var(--primary-blue)', marginBottom: '12px' }}>Đăng ký thành công!</h2>
          <p style={{ color: 'var(--text-gray)' }}>Đang chuyển hướng về trang đăng nhập...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
           <h1 style={{ fontSize: '24px', color: 'var(--primary-blue)', fontWeight: 800, marginBottom: '8px' }}><span style={{ color: 'var(--accent-red)' }}>VongQuanh</span>TheGioi</h1>
           <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Tạo tài khoản để bắt đầu hành trình của bạn</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '14px', textAlign: 'center', fontWeight: 600 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-gray)', marginBottom: '8px' }}>Họ và tên</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nhập họ và tên" 
              style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} 
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-gray)', marginBottom: '8px' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@gmail.com" 
              style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} 
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-gray)', marginBottom: '8px' }}>Mật khẩu</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu" 
              style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} 
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-gray)', marginBottom: '8px' }}>Xác nhận mật khẩu</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Nhập lại mật khẩu" 
              style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} 
            />
          </div>

          <button type="submit" style={{ width: '100%', backgroundColor: 'var(--primary-blue)', color: 'white', padding: '16px', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '15px', cursor: 'pointer', border: 'none', marginBottom: '24px' }}>ĐĂNG KÝ NGAY</button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-dark)' }}>
          Đã có tài khoản? <Link href="/login" style={{ color: 'var(--accent-red)', fontWeight: 700 }}>Đăng nhập</Link>
        </div>
      </div>
    </main>
  );
}
