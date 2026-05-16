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

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (type: 'tours' | 'hotels' | 'bookings') => {
    if (!data) return;
    
    let exportData: any[] = [];
    let name = '';
    
    if (type === 'tours') { 
      exportData = data.topTours; // Or fetch all tours
      name = 'Danh-sach-Tours'; 
    }
    else if (type === 'hotels') { 
      // Need hotels in stats or separate fetch
      alert("Chức năng đang được cập nhật cho Khách sạn");
      return;
    }
    else if (type === 'bookings') { 
      // Should fetch all bookings for a real report
      alert("Đang chuẩn bị dữ liệu xuất báo cáo...");
      return;
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className={styles.addBtn} style={{ backgroundColor: '#166534' }} onClick={() => handleExport('bookings')}>
             📥 Xuất Báo cáo Đặt tour
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
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.categoryData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={["#3b82f6", "#10b981", "#f59e0b", "#ef4444"][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.statCard}>
          <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Trạng thái thanh toán đơn hàng</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.statusData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={["#10b981", "#f59e0b", "#ef4444"][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
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
