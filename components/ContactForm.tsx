"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      alert('Cảm ơn ' + formData.name + '! Yêu cầu của bạn đã được gửi đến hệ thống. Chúng tôi sẽ phản hồi sớm nhất qua số điện thoại ' + formData.phone);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Họ và tên *</label>
          <input 
            type="text" 
            placeholder="Nhập tên của bạn" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Số điện thoại *</label>
          <input 
            type="text" 
            placeholder="Nhập số điện thoại" 
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} 
          />
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Email</label>
        <input 
          type="email" 
          placeholder="Nhập email phản hồi" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }} 
        />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-gray)', marginBottom: '8px' }}>Nội dung yêu cầu *</label>
        <textarea 
          placeholder="Chúng tôi có thể giúp gì cho bạn?" 
          required
          rows={5} 
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
        ></textarea>
      </div>
      <button 
        type="submit" 
        disabled={loading}
        style={{ 
          width: 'fit-content', 
          padding: '16px 48px', 
          backgroundColor: 'var(--primary-blue)', 
          color: 'white', 
          borderRadius: 'var(--radius-sm)', 
          border: 'none', 
          fontWeight: 800, 
          cursor: 'pointer', 
          transition: 'all 0.3s',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU NGAY'}
      </button>
    </form>
  );
}
