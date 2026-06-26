'use client';

import React, { useState, useEffect } from 'react';
import { exportToExcel, formatCurrency } from '@/lib/export-utils';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  AreaChart, Area
} from 'recharts';
import styles from '../admin.module.css';

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [exportType, setExportType] = useState<'bookings' | 'revenue' | 'users' | 'tours' | 'hotels'>('bookings');

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats', { cache: 'no-store' });
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type: 'tours' | 'hotels' | 'bookings' | 'revenue' | 'users') => {
    if (!data) return;
    
    let exportData: any[] = [];
    let name = '';
    
    if (type === 'tours') { 
      exportData = data.topTours.map((t: any) => ({
        'Mã Tour': t.id,
        'Tên Tour': t.title,
        'Điểm đến': t.destination,
        'Giá (VNĐ)': t.price,
        'Đánh giá': t.rating
      }));
      name = 'Danh-sach-Tours'; 
    }
    else if (type === 'hotels') { 
      alert("Chức năng đang được cập nhật cho Khách sạn");
      return;
    }
    else if (type === 'bookings') { 
      try {
        const res = await fetch('/api/admin/bookings', { cache: 'no-store' });
        const bookings = await res.json();
        
        exportData = bookings.map((b: any) => ({
          'Mã đơn': b.bookingCode,
          'Khách hàng': b.customerName,
          'Ngày đặt': b.date,
          'Số tiền (VNĐ)': b.amount,
          'Trạng thái': b.status,
          'Thanh toán': b.paymentStatus
        }));
        name = 'Danh-sach-Dat-Tour';
      } catch (err) {
        alert("Lỗi khi tải dữ liệu báo cáo!");
        return;
      }
    }
    else if (type === 'users') { 
      try {
        const res = await fetch('/api/admin/users', { cache: 'no-store' });
        const users = await res.json();
        
        exportData = users.map((u: any) => ({
          'Mã KH': u.id,
          'Tên KH': u.name,
          'Email': u.email,
          'SĐT': u.phone || 'Trống',
          'Vai trò': u.role,
          'Trạng thái': u.status,
          'Ngày tham gia': new Date(u.createdAt).toLocaleDateString('vi-VN')
        }));
        name = 'Danh-sach-Khach-hang';
      } catch (err) {
        alert("Lỗi khi tải dữ liệu báo cáo!");
        return;
      }
    }
    else if (type === 'revenue') { 
      if (data && data.revenueData) {
        exportData = data.revenueData.map((r: any) => ({
          'Thời gian': r.name,
          'Doanh thu (Triệu VNĐ)': r.revenue
        }));
        name = 'Bao-cao-Doanh-thu';
      }
    }
    
    exportToExcel(exportData, name, type.toUpperCase());
  };

  if (!mounted || loading) {
    return <div style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>Đang tải báo cáo dữ liệu thật...</div>;
  }

  if (!data) return <div style={{ padding: '32px', textAlign: 'center' }}>Không có dữ liệu.</div>;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Báo cáo & Thống kê</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select 
            className={styles.selectInput} 
            value={exportType}
            onChange={(e: any) => setExportType(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 600, color: '#334155' }}
          >
            <option value="bookings">Báo cáo Đặt tour</option>
            <option value="revenue">Báo cáo Doanh thu</option>
            <option value="users">Danh sách Khách hàng</option>
          </select>
          <button className={styles.addBtn} style={{ backgroundColor: '#166534' }} onClick={() => handleExport(exportType)}>
             📥 Xuất Excel
          </button>
        </div>
      </div>

      {/* Booking Performance Over 6 Months */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>Xu hướng doanh thu (6 tháng gần nhất)</h2>
      
      <div className={styles.statsGrid}>
        {data.stats.map((stat: any, index: number) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.statCard} style={{ marginBottom: '40px', height: '400px' }}>
        <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Biểu đồ tăng trưởng doanh thu (Triệu VNĐ)</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={data.revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip formatter={(value: any) => [`${value} Tr VNĐ`, 'Doanh thu']} />
            <Area type="monotone" dataKey="revenue" name="Doanh thu" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <div className={styles.statCard}>
          <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Tỷ trọng danh mục dịch vụ</h3>
          <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <PieChart width={350} height={250}>
                <Pie
                  data={data.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive={false}
                >
                  {data.categoryData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={["#3b82f6", "#10b981", "#f59e0b", "#ef4444"][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
          </div>
        </div>

        <div className={styles.statCard}>
          <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Trạng thái thanh toán đơn hàng</h3>
          <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <PieChart width={350} height={250}>
                <Pie
                  data={data.statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive={false}
                >
                  {data.statusData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={["#10b981", "#f59e0b", "#ef4444"][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
          </div>
        </div>
      </div>

      {/* Detailed Data Tables */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px' }}>Tour nổi bật & Đánh giá cao</h2>
        
        <div className={styles.tableContainer} style={{ marginBottom: '32px' }}>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Danh sách Tour tiêu biểu</h3>
            <button onClick={() => handleExport('tours')} style={{ fontSize: '0.875rem', color: '#166534', cursor: 'pointer', background: 'none', border: 'none', fontWeight: '600' }}>Xuất danh sách</button>
          </div>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Tên Tour</th>
                <th>Điểm đến</th>
                <th>Giá</th>
                <th>Đánh giá</th>
              </tr>
            </thead>
            <tbody>
              {data.topTours.map((t: any) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600 }}>{t.title}</td>
                  <td>{t.destination}</td>
                  <td style={{ color: '#2563eb', fontWeight: 700 }}>{formatCurrency(t.price)}</td>
                  <td>⭐ {t.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
