"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async (searchTerm = "") => {
    setLoading(true);
    const res = await fetch(`/api/admin/users?search=${searchTerm}`);
    const data = await res.json();
    if (Array.isArray(data)) {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(search);
  };

  const updateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    });
    if (res.ok) {
      setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    }
  };

  const updateRole = async (id: string, newRole: string) => {
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, role: newRole })
    });
    if (res.ok) {
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa người dùng này? Thao tác này không thể hoàn tác.")) return;
    
    const res = await fetch(`/api/admin/users?id=${id}`, {
      method: 'DELETE',
    });
    
    if (res.ok) {
      setUsers(users.filter(u => u.id !== id));
    } else {
      const data = await res.json();
      alert(data.error || "Không thể xóa người dùng này.");
    }
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Quản lý khách hàng & Nhân viên</h1>
      </div>

      <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', flex: 1 }}>
          <input 
            type="text" 
            placeholder="Tìm kiếm theo tên hoặc email..." 
            className={styles.adminInput}
            style={{ marginBottom: 0, flex: 1 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className={styles.actionBtn} style={{ backgroundColor: 'var(--primary-blue)', color: 'white' }}>
            Tìm kiếm
          </button>
        </form>
        <button 
          onClick={() => {setSearch(""); fetchUsers("");}} 
          className={styles.actionBtn}
          style={{ backgroundColor: '#f1f5f9', color: '#475569' }}
        >
          Làm mới
        </button>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải...</div>
        ) : (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Ngày tham gia</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ fontWeight: '600' }}>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select 
                      style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem', 
                        fontWeight: '700',
                        backgroundColor: user.role === 'ADMIN' ? '#dcfce7' : '#f1f5f9',
                        color: user.role === 'ADMIN' ? '#166534' : '#475569',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      value={user.role}
                      onChange={(e) => updateRole(user.id, e.target.value)}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</td>
                  <td>
                    <span style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: user.status === 'ACTIVE' ? '#ecfdf5' : '#fff1f2',
                      color: user.status === 'ACTIVE' ? '#059669' : '#e11d48'
                    }}>
                      <span style={{ 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%', 
                        backgroundColor: user.status === 'ACTIVE' ? '#10b981' : '#f43f5e' 
                      }}></span>
                      {user.status === 'ACTIVE' ? 'Đang hoạt động' : 'Đã bị khóa'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className={styles.actionBtn}
                        style={{ 
                          backgroundColor: user.status === 'ACTIVE' ? '#fff7ed' : '#f0fdf4',
                          color: user.status === 'ACTIVE' ? '#9a3412' : '#166534',
                          borderColor: user.status === 'ACTIVE' ? '#ffedd5' : '#dcfce7'
                        }}
                        onClick={() => updateStatus(user.id, user.status)}
                      >
                        {user.status === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}
                      </button>
                      <button 
                        className={styles.actionBtn}
                        style={{ 
                          backgroundColor: '#fef2f2',
                          color: '#991b1b',
                          borderColor: '#fee2e2'
                        }}
                        onClick={() => deleteUser(user.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    Không tìm thấy người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
