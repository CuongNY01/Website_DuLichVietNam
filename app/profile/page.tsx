"use client";

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });

  const handleChangePassword = async () => {
    if (!passwords.old || !passwords.new || !passwords.confirm) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert('Mật khẩu mới không khớp');
      return;
    }
    if (passwords.new.length < 6) {
      alert('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: passwords.old,
          newPassword: passwords.new
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
        signOut({ callbackUrl: '/login' });
      } else {
        alert(data.error || 'Lỗi đổi mật khẩu');
      }
    } catch (error) {
      alert('Lỗi hệ thống');
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/profile');
    }
    if (session?.user) {
      // Set initial data from session to avoid blank fields
      setFormData(prev => ({
        ...prev,
        name: session.user?.name || '',
        email: session.user?.email || '',
        phone: (session.user as any).phone || '',
      }));
      
      fetchProfile();
      fetchBookingStats();
    }
  }, [status, session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile');
      const data = await res.json();
      if (res.ok && data) {
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
        });
      } else {
        console.warn("Profile data is empty or request failed");
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const fetchBookingStats = async () => {
    try {
      const res = await fetch('/api/user/bookings');
      const data = await res.json();
      if (Array.isArray(data)) {
        setStats({
          total: data.length,
          pending: data.filter(b => b.status === 'Chờ xử lý').length,
          completed: data.filter(b => b.status === 'Hoàn tất').length,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name,
          phone: formData.phone 
        }),
      });
      if (res.ok) {
        await update({ 
          ...session?.user,
          name: formData.name,
          phone: formData.phone 
        });
        alert('Cập nhật thông tin thành công!');
      }
    } catch (error) {
      alert('Lỗi cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') return <div style={{ padding: '80px', textAlign: 'center', color: 'var(--primary-blue)', fontWeight: 700 }}>Đang xác thực tài khoản...</div>;
  if (!session) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)", padding: "60px 0" }}>
      <div className="container flex mobile-flex-col gap-8">

        {/* Sidebar */}
        <aside style={{ width: '100%', maxWidth: '300px', backgroundColor: 'white', padding: '32px 24px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              background: 'linear-gradient(135deg, var(--primary-blue), #1e40af)', 
              color: 'white', 
              borderRadius: '50%', 
              margin: '0 auto 20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '42px', 
              fontWeight: 800,
              boxShadow: '0 8px 16px rgba(10, 88, 163, 0.2)'
            }}>
              {session.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <h2 style={{ fontSize: '22px', color: 'var(--text-dark)', fontWeight: 900 }}>{session.user?.name}</h2>
            <div style={{ 
              display: 'inline-block',
              marginTop: '8px',
              padding: '4px 12px',
              borderRadius: '20px',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              fontSize: '12px',
              fontWeight: 700
            }}>
              {session.user?.role === 'ADMIN' ? '💎 QUẢN TRỊ VIÊN' : '🌟 HỘI VIÊN VÀNG'}
            </div>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="/profile" style={{ 
              padding: '14px 20px', 
              borderRadius: '12px', 
              backgroundColor: isActive('/profile') ? 'var(--primary-blue)' : 'transparent', 
              color: isActive('/profile') ? 'white' : 'var(--text-dark)', 
              fontWeight: 700,
              transition: 'all 0.2s'
            }}>👤 Hồ sơ cá nhân</Link>
            
            <Link href="/profile/orders" style={{ 
              padding: '14px 20px', 
              borderRadius: '12px', 
              backgroundColor: isActive('/profile/orders') ? 'var(--primary-blue)' : 'transparent', 
              color: isActive('/profile/orders') ? 'white' : 'var(--text-dark)', 
              fontWeight: 700,
              transition: 'all 0.2s'
            }}>🎫 Chuyến đi của tôi</Link>
            
            <button 
              onClick={() => alert('Tính năng Ví điện tử đang được bảo trì. Vui lòng quay lại sau!')}
              style={{ 
                padding: '14px 20px', 
                borderRadius: '12px', 
                color: 'var(--text-dark)', 
                fontWeight: 700,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >💳 Ví điện tử</button>
            
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              style={{ 
                marginTop: '20px',
                padding: '14px 20px', 
                borderRadius: '12px', 
                backgroundColor: '#fff1f2',
                color: '#e11d48', 
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%'
              }}
            >🚪 Đăng xuất</button>
          </nav>
        </aside>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-gray)', fontWeight: 700, marginBottom: '8px' }}>TỔNG CHUYẾN ĐI</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--primary-blue)' }}>{stats.total}</div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-gray)', fontWeight: 700, marginBottom: '8px' }}>ĐANG CHỜ</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#f59e0b' }}>{stats.pending}</div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-gray)', fontWeight: 700, marginBottom: '8px' }}>HOÀN THÀNH</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#10b981' }}>{stats.completed}</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '24px', color: 'var(--text-dark)', marginBottom: '32px', fontWeight: 900, letterSpacing: '-0.5px' }}>THÔNG TIN TÀI KHOẢN</h2>
            
            <form onSubmit={handleUpdate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="mobile-flex-col">
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-dark)', marginBottom: '10px', fontWeight: 800 }}>Địa chỉ Email</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  disabled
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', backgroundColor: '#f8fafc', color: '#64748b', cursor: 'not-allowed' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-dark)', marginBottom: '10px', fontWeight: 800 }}>Họ và tên khách hàng</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', outline: 'none', transition: 'border-color 0.2s' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-dark)', marginBottom: '10px', fontWeight: 800 }}>Số điện thoại</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', outline: 'none' }} 
                />
              </div>
              
              <div style={{ gridColumn: '1 / -1', marginTop: '16px', display: 'flex', gap: '16px' }}>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    padding: '16px 40px', 
                    backgroundColor: 'var(--primary-blue)', 
                    color: 'white', 
                    borderRadius: '14px', 
                    fontWeight: 800, 
                    border: 'none', 
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(10, 88, 163, 0.2)',
                    transition: 'transform 0.2s'
                  }}
                >
                  {loading ? 'ĐANG LƯU...' : 'LƯU THAY ĐỔI'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowPasswordModal(true)}
                  style={{ padding: '16px 32px', backgroundColor: 'transparent', color: 'var(--text-gray)', borderRadius: '14px', fontWeight: 700, border: '1px solid var(--border-color)', cursor: 'pointer' }}
                >
                  ĐỔI MẬT KHẨU
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '450px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '24px', textAlign: 'center' }}>ĐỔI MẬT KHẨU</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px' }}>Mật khẩu hiện tại</label>
                  <input 
                    type="password" 
                    value={passwords.old}
                    onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                    style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px' }}>Mật khẩu mới</label>
                  <input 
                    type="password" 
                    value={passwords.new}
                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                    style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px' }}>Xác nhận mật khẩu mới</label>
                  <input 
                    type="password" 
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                    style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} 
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button 
                    onClick={handleChangePassword}
                    disabled={loading}
                    style={{ flex: 1, padding: '14px', backgroundColor: 'var(--primary-blue)', color: 'white', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer' }}
                  >
                    {loading ? 'ĐANG XỬ LÝ...' : 'CẬP NHẬT'}
                  </button>
                  <button 
                    onClick={() => setShowPasswordModal(false)}
                    style={{ flex: 1, padding: '14px', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '12px', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                  >
                    HỦY
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
