"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Mã xác thực không hợp lệ hoặc đã bị thiếu.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Thiếu mã xác thực (token).');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu mới phải chứa ít nhất 6 ký tự.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.error || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError('Lỗi kết nối đến máy chủ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '440px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
        <h2 style={{ color: 'var(--primary-blue)', marginBottom: '12px' }}>Đặt lại mật khẩu thành công!</h2>
        <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>
          Mật khẩu của bạn đã được thay đổi. Đang tự động chuyển hướng về trang đăng nhập...
        </p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '440px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--primary-blue)', fontWeight: 800, marginBottom: '8px' }}>
          Đặt Lại <span style={{ color: 'var(--accent-red)' }}>Mật Khẩu</span>
        </h1>
        <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>
          Nhập mật khẩu mới cho tài khoản của bạn
        </p>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '14px', textAlign: 'center', fontWeight: 600 }}>
          {error}
        </div>
      )}

      {!token ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '24px' }}>
            Liên kết không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu lại liên kết mới.
          </p>
          <Link href="/forgot-password" style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '14px', textDecoration: 'underline' }}>
            Yêu cầu liên kết mới
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-gray)', marginBottom: '8px' }}>Mật khẩu mới</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập ít nhất 6 ký tự" 
              style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} 
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-gray)', marginBottom: '8px' }}>Xác nhận mật khẩu mới</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Nhập lại mật khẩu mới" 
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
            {loading ? 'ĐANG CẬP NHẬT...' : 'ĐỔI MẬT KHẨU'}
          </button>
        </form>
      )}

      <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-dark)', marginTop: '8px' }}>
        Quay lại <Link href="/login" style={{ color: 'var(--accent-red)', fontWeight: 700 }}>Đăng nhập</Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <Suspense fallback={
        <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '440px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-gray)' }}>Đang tải form...</p>
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
