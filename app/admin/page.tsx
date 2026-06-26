"use client";

import styles from "./admin.module.css";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from "recharts";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/data";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
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
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải dữ liệu báo cáo...</div>;
  if (!data) return <div style={{ padding: '40px', textAlign: 'center' }}>Không có dữ liệu.</div>;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Bảng điều khiển</h1>
        <p className={styles.subtitle}>Chào mừng bạn trở lại, Admin!</p>
      </div>

      <div className={styles.statsGrid}>
        {data.stats.map((stat: any, index: number) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statInfo}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div className={styles.chartCard} style={{ gridColumn: '1 / -1' }}>
          <h3 className={styles.chartTitle}>Thống kê doanh thu 6 tháng gần nhất (Triệu VNĐ)</h3>
          <div style={{ width: '100%', height: 300, minWidth: 0, minHeight: 0 }}>
            {mounted && (
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={data.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}Tr`} />
                  <Tooltip 
                    formatter={(value: any) => [`${(value || 0).toLocaleString('vi-VN')} Triệu VNĐ`, 'Doanh thu']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>


      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Tour được đánh giá cao nhất</h2>
        </div>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Tour</th>
              <th>Điểm đến</th>
              <th>Thời gian</th>
              <th>Giá</th>
              <th>Đánh giá</th>
            </tr>
          </thead>
          <tbody>
            {data.topTours.map((tour: any, index: number) => (
              <tr key={index}>
                <td style={{ fontWeight: '600' }}>{tour.title}</td>
                <td>{tour.destination}</td>
                <td>{tour.duration}</td>
                <td style={{ color: 'var(--accent-red)', fontWeight: '700' }}>{formatCurrency(tour.price)}</td>
                <td>⭐ {tour.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
