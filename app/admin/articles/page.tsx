'use client';

import React, { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function ArticleManagement() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Tin tức',
    image: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    date: new Date().toLocaleDateString('vi-VN'),
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles', { cache: 'no-store' });
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      category: 'Tin tức',
      image: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      date: new Date().toLocaleDateString('vi-VN'),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (article: any) => {
    setEditingArticle(article);
    setFormData({
      title: article.title || '',
      category: article.category || 'Tin tức',
      image: article.image || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      author: article.author || 'Admin',
      date: article.date || new Date().toLocaleDateString('vi-VN'),
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
      const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData({ ...formData, image: data.url });
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingArticle ? 'PATCH' : 'POST';
      const body = editingArticle ? { id: editingArticle.id, ...formData } : formData;
      const res = await fetch('/api/admin/articles', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        fetchArticles();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Xóa bài viết này?')) {
      await fetch(`/api/admin/articles?id=${id}`, { method: 'DELETE' });
      fetchArticles();
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Quản lý bài viết & Tin tức</h1>
        <button className={styles.addBtn} onClick={openAddModal}>+ Viết bài mới</button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tiêu đề</th>
              <th>Chuyên mục</th>
              <th>Tác giả</th>
              <th>Ngày đăng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>
                  <img src={article.image} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td style={{ fontWeight: '600', maxWidth: '300px' }}>{article.title}</td>
                <td>{article.category}</td>
                <td>{article.author}</td>
                <td>{article.date}</td>
                <td>
                  <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openEditModal(article)}>Sửa</button>
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(article.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} style={{ maxWidth: '800px', width: '90%' }}>
            <h2 style={{ marginBottom: '20px' }}>{editingArticle ? 'Sửa bài viết' : 'Viết bài mới'}</h2>
            <form onSubmit={handleSave}>
              <div className={styles.formGroup}>
                <label>Tiêu đề bài viết</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Chuyên mục</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Tin tức">Tin tức</option>
                    <option value="Cẩm nang du lịch">Cẩm nang du lịch</option>
                    <option value="Mẹo hay">Mẹo hay</option>
                    <option value="Khám phá">Khám phá</option>
                    <option value="Ẩm thực">Ẩm thực</option>
                    <option value="Sự kiện">Sự kiện</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Tác giả</label>
                  <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Mô tả ngắn (Trích dẫn)</label>
                <textarea rows={2} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} required />
              </div>
              <div className={styles.formGroup}>
                <label>Nội dung bài viết (HTML/Text)</label>
                <textarea rows={8} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required />
              </div>
              <div className={styles.formGroup}>
                <label>Hình ảnh bài viết</label>
                <input type="file" onChange={handleImageChange} />
                {formData.image && <img src={formData.image} alt="" style={{ width: '100px', marginTop: '10px' }} />}
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Hủy</button>
                <button type="submit" className={styles.addBtn} disabled={isUploading}>Lưu bài viết</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
