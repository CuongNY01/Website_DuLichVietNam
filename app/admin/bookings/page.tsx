"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";
import { formatCurrency } from "@/lib/data";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Tất cả");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/bookings');
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  };

  const filteredBookings = filter === "Tất cả" 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const updateStatus = async (id: string, newStatus: string) => {
    const res = await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    });
    if (res.ok) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    }
  };

  const updatePaymentStatus = async (id: string, newStatus: string) => {
    const res = await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, paymentStatus: newStatus })
    });
    if (res.ok) {
      setBookings(bookings.map(b => b.id === id ? { ...b, paymentStatus: newStatus } : b));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoàn tất": return "#166534";
      case "Chờ xử lý": return "#9a3412";
      case "Đang xử lý": return "#1e40af";
      case "Đã hủy": return "#991b1b";
      default: return "#475569";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "Hoàn tất": return "#f0fdf4";
      case "Chờ xử lý": return "#fff7ed";
      case "Đang xử lý": return "#eff6ff";
      case "Đã hủy": return "#fef2f2";
      default: return "#f8fafc";
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải dữ liệu đơn hàng...</div>;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Quản lý đơn đặt Tour</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select 
            className={styles.addBtn} 
            style={{ backgroundColor: 'white', color: '#334155', border: '1px solid #e2e8f0' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Tất cả">Tất cả trạng thái</option>
            <option value="Chờ xử lý">Chờ xử lý</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Hoàn tất">Hoàn tất</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>PT Thanh toán</th>
              <th>Trạng thái TT</th>
              <th>Trạng thái ĐH</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td style={{ fontWeight: '600' }}>{booking.bookingCode}</td>
                <td>{booking.customerName}</td>
                <td>{booking.date}</td>
                <td>{formatCurrency(booking.amount)}</td>
                <td>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary-blue)', fontWeight: '600' }}>{booking.paymentMethod}</span>
                </td>
                <td>
                  <select 
                    style={{ 
                      fontSize: '0.75rem', 
                      padding: '4px', 
                      borderRadius: '4px', 
                      border: 'none',
                      backgroundColor: booking.paymentStatus === 'Đã thanh toán' ? '#dcfce7' : '#fee2e2',
                      color: booking.paymentStatus === 'Đã thanh toán' ? '#166534' : '#991b1b',
                      fontWeight: '700'
                    }}
                    value={booking.paymentStatus}
                    onChange={(e) => updatePaymentStatus(booking.id, e.target.value)}
                  >
                    <option value="Đã thanh toán">Đã thanh toán</option>
                    <option value="Chưa thanh toán">Chưa thanh toán</option>
                  </select>
                </td>
                <td>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    color: getStatusColor(booking.status),
                    backgroundColor: getStatusBg(booking.status)
                  }}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <select 
                    style={{ fontSize: '0.8rem', padding: '4px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                  >
                    <option value="Chờ xử lý">Chờ xử lý</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Hoàn tất">Hoàn tất</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
