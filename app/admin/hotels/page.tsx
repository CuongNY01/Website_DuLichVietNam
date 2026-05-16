'use client';

import React, { useState } from 'react';
import { hotels as initialHotels, formatCurrency } from '@/lib/data';
import styles from '../admin.module.css';
import { useEffect } from 'react';

export default function HotelsManagement() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const roomsToText = (jsonStr: string) => {
    try {
      const arr = JSON.parse(jsonStr);
      if (!Array.isArray(arr)) return '';
      return arr.map(item => `${item.type} | ${item.price} | ${item.image || ''}`).join('\n');
    } catch (e) {
      return '';
    }
  };

  const textToRoomsJson = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const arr = lines.map(line => {
      const [type, price, image] = line.split('|');
      return {
        type: type?.trim() || 'Loại phòng mới',
        price: Number(price?.trim()) || 0,
        image: image?.trim() || ''
      };
    });
    return JSON.stringify(arr);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    stars: 5,
    price: 0,
    oldPrice: 0,
    discount: '',
    rating: 9.0,
    reviews: 0,
    image: '',
    description: '',
    amenitiesText: '',
    roomsText: '',
    featuresText: '',
  });

  const filteredHotels = hotels.filter(h => 
    (h.name?.toLowerCase().includes(search.toLowerCase())) || 
    (h.location?.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await fetch('/api/admin/hotels');
      const data = await res.json();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingHotel(null);
    setFormData({
      name: '',
      location: '',
      stars: 5,
      price: 0,
      oldPrice: 0,
      discount: '',
      rating: 9.0,
      reviews: 0,
      image: '',
      description: '',
      amenitiesText: '',
      roomsText: '',
      featuresText: '',
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

  const openEditModal = (hotel: any) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name || '',
      location: hotel.location || '',
      stars: hotel.stars || 5,
      price: hotel.price || 0,
      oldPrice: hotel.oldPrice || 0,
      discount: hotel.discount || '',
      rating: hotel.rating || 9.0,
      reviews: hotel.reviews || 0,
      image: hotel.image || '',
      description: hotel.description || '',
      amenitiesText: jsonToText(hotel.amenities),
      roomsText: roomsToText(hotel.rooms),
      featuresText: jsonToText(hotel.features),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const { amenitiesText, featuresText, roomsText, ...cleanData } = formData;
    const saveBody = {
      ...cleanData,
      amenities: textToJson(amenitiesText),
      features: textToJson(featuresText),
      rooms: textToRoomsJson(roomsText),
    };

    try {
      const method = editingHotel ? 'PATCH' : 'POST';
      const body = editingHotel ? { id: editingHotel.id, ...saveBody } : saveBody;
      
      const res = await fetch('/api/admin/hotels', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        fetchHotels();
        setIsModalOpen(false);
      } else {
        alert('Có lỗi xảy ra khi lưu khách sạn.');
      }
    } catch (error) {
      console.error('Error saving hotel:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa khách sạn này không?')) {
      try {
        const res = await fetch(`/api/admin/hotels?id=${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchHotels();
        }
      } catch (error) {
        console.error('Error deleting hotel:', error);
      }
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Quản lý Khách sạn</h1>
        <button className={styles.addBtn} onClick={openAddModal}>+ Thêm Khách sạn mới</button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="Tìm kiếm khách sạn theo tên hoặc địa điểm..." 
          style={{ padding: '12px', width: '100%', maxWidth: '400px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Tên Khách sạn</th>
              <th>Vị trí</th>
              <th>Hạng sao</th>
              <th>Đánh giá</th>
              <th>Giá phòng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredHotels.map((hotel) => (
              <tr key={hotel.id}>
                <td style={{ fontWeight: '500' }}>{hotel.name}</td>
                <td>{hotel.location}</td>
                <td>
                  {'⭐'.repeat(hotel.stars)}
                </td>
                <td>
                  <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                    {hotel.rating} ({hotel.reviews} đánh giá)
                  </span>
                </td>
                <td style={{ color: '#2563eb', fontWeight: '600' }}>{formatCurrency(hotel.price)}</td>
                <td>
                  <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openEditModal(hotel)}>Sửa</button>
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(hotel.id)}>Xóa</button>
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
              {editingHotel ? 'Chỉnh sửa Khách sạn' : 'Thêm Khách sạn mới'}
            </h2>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Tên Khách sạn</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Vị trí</label>
                  <input 
                    type="text" 
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
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
                  <label>Giá cũ (VNĐ)</label>
                  <input 
                    type="number" 
                    value={formData.oldPrice} 
                    onChange={(e) => setFormData({...formData, oldPrice: Number(e.target.value)})}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Hạng sao (1-5)</label>
                  <select 
                    value={formData.stars} 
                    onChange={(e) => setFormData({...formData, stars: Number(e.target.value)})}
                  >
                    {[1,2,3,4,5].map(s => <option key={s} value={s}>{s} sao</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Đánh giá & Số lượng đánh giá</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0"
                      max="10"
                      placeholder="Điểm (VD: 9.0)"
                      value={formData.rating} 
                      onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                      required 
                    />
                    <input 
                      type="number" 
                      placeholder="Số lượng (VD: 120)"
                      value={formData.reviews} 
                      onChange={(e) => setFormData({...formData, reviews: Number(e.target.value)})}
                      required 
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '16px' }}>
                <label>Mô tả khách sạn</label>
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
                  <label>Tiện ích (Mỗi dòng một ý)</label>
                  <textarea 
                    rows={4}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'inherit', fontSize: '14px' }}
                    value={formData.amenitiesText} 
                    onChange={(e) => setFormData({...formData, amenitiesText: e.target.value})}
                    placeholder={"VD:\nWifi miễn phí\nHồ bơi\nBữa sáng"}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Đặc điểm nổi bật (Mỗi dòng một ý)</label>
                  <textarea 
                    rows={4}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'inherit', fontSize: '14px' }}
                    value={formData.featuresText} 
                    onChange={(e) => setFormData({...formData, featuresText: e.target.value})}
                    placeholder={"VD:\nGần trung tâm\nView biển\nNhân viên thân thiện"}
                  />
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '16px' }}>
                <label>Các loại phòng (Tên | Giá | Link ảnh - Mỗi phòng một dòng)</label>
                <textarea 
                  rows={6}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'inherit', fontSize: '14px' }}
                  value={formData.roomsText} 
                  onChange={(e) => setFormData({...formData, roomsText: e.target.value})}
                  placeholder={"VD:\nPhòng Deluxe | 1200000 | https://...\nPhòng Suite | 2500000 | https://..."}
                />
              </div>

              <div className={styles.formGroup} style={{ marginTop: '16px' }}>
                <label>Hình ảnh Khách sạn</label>
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
