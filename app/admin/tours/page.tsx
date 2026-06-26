'use client';

import React, { useState } from 'react';
import { tours as initialTours, formatCurrency } from '@/lib/data';
import styles from '../admin.module.css';
import { useEffect } from 'react';

export default function ToursManagement() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Helper to generate random Tour Code
  const generateTourCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'TR-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Helpers to convert between JSON and Text
  const jsonToText = (jsonStr: string) => {
    try {
      const arr = JSON.parse(jsonStr);
      return Array.isArray(arr) ? arr.join('\n') : '';
    } catch (e) {
      return '';
    }
  };

  const textToJson = (text: string) => {
    const arr = text.split('\n').map(item => item.trim()).filter(item => item !== '');
    return JSON.stringify(arr);
  };

  const itineraryToText = (jsonStr: string) => {
    try {
      const arr = JSON.parse(jsonStr);
      if (!Array.isArray(arr)) return '';
      return arr.map(item => `${item.title} | ${item.desc || (Array.isArray(item.activities) ? item.activities.join(', ') : '')}`).join('\n');
    } catch (e) {
      return '';
    }
  };

  const textToItineraryJson = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const arr = lines.map((line, index) => {
      const [title, ...descParts] = line.split('|');
      return {
        day: `Ngày ${index + 1}`,
        title: title?.trim() || 'Chưa có tiêu đề',
        desc: descParts.join('|')?.trim() || 'Chưa có nội dung'
      };
    });
    return JSON.stringify(arr);
  };

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    destination: '',
    departurePoint: '',
    price: 0,
    oldPrice: 0,
    discount: '',
    seats: 0,
    departureDate: '',
    time: '',
    duration: '',
    category: 'Trong nước',
    rating: 5.0,
    image: '',
    description: '',
    featuresText: '', // Simplified text
    itineraryText: '', // Simplified text
    policiesText: '', // Simplified text
  });

  const filteredTours = tours.filter(t => 
    (t.title?.toLowerCase().includes(search.toLowerCase())) || 
    (t.destination?.toLowerCase().includes(search.toLowerCase())) ||
    (t.code?.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await fetch('/api/admin/tours', { cache: 'no-store' });
      const data = await res.json();
      setTours(data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingTour(null);
    setFormData({
      code: generateTourCode(), // Auto-generate code
      title: '',
      destination: '',
      departurePoint: '',
      price: 0,
      oldPrice: 0,
      discount: '',
      seats: 0,
      departureDate: '',
      time: '',
      duration: '',
      category: 'Trong nước',
      rating: 5.0,
      image: '',
      description: '',
      featuresText: '',
      itineraryText: '',
      policiesText: '',
    });
    setIsModalOpen(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData({ ...formData, image: data.url });
      } else {
        alert(data.error || 'Lỗi tải ảnh lên Cloudinary');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Lỗi kết nối khi tải ảnh');
    } finally {
      setIsUploading(false);
    }
  };

  const openEditModal = (tour: any) => {
    setEditingTour(tour);
    setFormData({
      code: tour.code || '',
      title: tour.title || '',
      destination: tour.destination || '',
      departurePoint: tour.departurePoint || '',
      price: tour.price || 0,
      oldPrice: tour.oldPrice || 0,
      discount: tour.discount || '',
      seats: tour.seats || 0,
      departureDate: tour.departureDate || '',
      time: tour.time || '',
      duration: tour.duration || '',
      category: tour.category || 'Trong nước',
      rating: tour.rating || 5.0,
      image: tour.image || '',
      description: tour.description || '',
      featuresText: jsonToText(tour.features),
      itineraryText: itineraryToText(tour.itinerary),
      policiesText: jsonToText(tour.policies),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare data for saving - exclude UI-only fields
    const { featuresText, itineraryText, policiesText, ...cleanData } = formData;
    const saveBody = {
      ...cleanData,
      features: textToJson(featuresText),
      policies: textToJson(policiesText),
      itinerary: textToItineraryJson(itineraryText),
    };

    try {
      const method = editingTour ? 'PATCH' : 'POST';
      const body = editingTour ? { id: editingTour.id, ...saveBody } : saveBody;
      
      const res = await fetch('/api/admin/tours', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        fetchTours();
        setIsModalOpen(false);
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Có lỗi xảy ra khi lưu tour.');
      }
    } catch (error) {
      console.error('Error saving tour:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tour này không?')) {
      try {
        const res = await fetch(`/api/admin/tours?id=${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchTours();
        }
      } catch (error) {
        console.error('Error deleting tour:', error);
      }
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Quản lý danh mục Tour</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className={styles.addBtn} 
            style={{ backgroundColor: '#10b981' }}
            onClick={() => alert('Đang đồng bộ dữ liệu Tour lên Vector Database...')}
          >
            🔄 Đồng bộ Vector DB
          </button>
          <button className={styles.addBtn} onClick={openAddModal}>+ Thêm Tour mới</button>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="Tìm kiếm tour theo mã, tên hoặc địa điểm..." 
          style={{ padding: '12px', width: '100%', maxWidth: '400px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Mã Tour</th>
              <th>Tên Tour</th>
              <th>Điểm đến</th>
              <th>Ngày khởi hành</th>
              <th>Giá</th>
              <th>Chỗ trống</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredTours.map((tour) => (
              <tr key={tour.id}>
                <td style={{ fontWeight: '600', color: '#64748b' }}>{tour.code}</td>
                <td style={{ fontWeight: '500' }}>{tour.title}</td>
                <td>{tour.destination}</td>
                <td>{tour.departureDate}</td>
                <td style={{ color: '#2563eb', fontWeight: '600' }}>{formatCurrency(tour.price)}</td>
                <td>{tour.seats}</td>
                <td>
                  <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openEditModal(tour)}>Sửa</button>
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(tour.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} style={{ maxWidth: '900px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
              {editingTour ? `Chỉnh sửa Tour: ${editingTour.code}` : 'Thêm Tour mới'}
            </h2>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Basic Info Group */}
                <div className={styles.formGroup}>
                  <label>Mã Tour (Tự động sinh)</label>
                  <input 
                    type="text" 
                    value={formData.code} 
                    readOnly
                    style={{ backgroundColor: '#f8fafc', color: '#64748b', fontWeight: 'bold' }}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Tiêu đề Tour</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Điểm khởi hành</label>
                  <input 
                    type="text" 
                    value={formData.departurePoint} 
                    onChange={(e) => setFormData({...formData, departurePoint: e.target.value})}
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Điểm đến</label>
                  <input 
                    type="text" 
                    value={formData.destination} 
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    required 
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Giá hiện tại (VNĐ)</label>
                  <input 
                    type="number" 
                    value={formData.price} 
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Giá cũ (VNĐ) - Để trống nếu không giảm giá</label>
                  <input 
                    type="number" 
                    value={formData.oldPrice} 
                    onChange={(e) => setFormData({...formData, oldPrice: Number(e.target.value)})}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Ngày khởi hành</label>
                  <input 
                    type="text" 
                    placeholder="VD: 15/05/2026"
                    value={formData.departureDate} 
                    onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Giờ khởi hành & Thời gian</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="Giờ (VD: 07:00)"
                      value={formData.time} 
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required 
                    />
                    <input 
                      type="text" 
                      placeholder="Thời gian (VD: 3 ngày 2 đêm)"
                      value={formData.duration} 
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      required 
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Số lượng chỗ</label>
                  <input 
                    type="number" 
                    value={formData.seats} 
                    onChange={(e) => setFormData({...formData, seats: Number(e.target.value)})}
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Danh mục & Đánh giá</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <select 
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="Trong nước">Trong nước</option>
                      <option value="Nước ngoài">Nước ngoài</option>
                      <option value="Miền Bắc">Miền Bắc</option>
                      <option value="Miền Trung">Miền Trung</option>
                      <option value="Miền Nam">Miền Nam</option>
                    </select>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating} 
                      onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '16px' }}>
                <label>Mô tả ngắn/tổng quan</label>
                <textarea 
                  rows={4}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
                <div className={styles.formGroup}>
                  <label>Đặc điểm nổi bật (Mỗi dòng một ý)</label>
                  <textarea 
                    rows={4}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'inherit', fontSize: '14px' }}
                    value={formData.featuresText} 
                    onChange={(e) => setFormData({...formData, featuresText: e.target.value})}
                    placeholder={"VD:\nXe đời mới\nKhách sạn 4 sao\nBảo hiểm du lịch"}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Chính sách (Mỗi dòng một ý)</label>
                  <textarea 
                    rows={4}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'inherit', fontSize: '14px' }}
                    value={formData.policiesText} 
                    onChange={(e) => setFormData({...formData, policiesText: e.target.value})}
                    placeholder={"VD:\nHoàn hủy trước 7 ngày\nTrẻ em dưới 2 tuổi miễn phí"}
                  />
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '16px' }}>
                <label>Lịch trình chi tiết (Tiêu đề | Nội dung - Mỗi ngày một dòng)</label>
                <textarea 
                  rows={6}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'inherit', fontSize: '14px' }}
                  value={formData.itineraryText} 
                  onChange={(e) => setFormData({...formData, itineraryText: e.target.value})}
                  placeholder={"VD:\nNgày khởi hành | Đón khách tại sân bay và ăn tối\nTham quan đảo | Đi tàu ra đảo và lặn ngắm san hô"}
                />
              </div>

              <div className={styles.formGroup} style={{ marginTop: '16px' }}>
                <label>Hình ảnh Tour</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ padding: '8px 0' }}
                />
                {isUploading && (
                  <div style={{ marginTop: '8px', color: '#2563eb', fontSize: '14px', fontWeight: 600 }}>
                    Đang tải ảnh lên Cloudinary...
                  </div>
                )}
                {formData.image && !isUploading && (
                  <img src={formData.image} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} />
                )}
              </div>

              <div className={styles.modalActions} style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Hủy</button>
                <button type="submit" className={styles.addBtn} disabled={isUploading}>
                  {isUploading ? 'Đang tải ảnh...' : 'Lưu dữ liệu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
