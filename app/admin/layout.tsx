import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./admin.module.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  if ((session.user as any)?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span style={{ fontSize: '24px' }}>🌍</span>
          <span>Admin Du Lịch Việt Nam</span>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={styles.navLink}>
             Bảng điều khiển
          </Link>
          <Link href="/admin/tours" className={styles.navLink}>
             Quản lý danh mục Tour
          </Link>
          <Link href="/admin/bookings" className={styles.navLink}>
             Quản lý đơn đặt Tour
          </Link>
          <Link href="/admin/users" className={styles.navLink}>
             Quản lý khách hàng
          </Link>
          <Link href="/admin/hotels" className={styles.navLink}>
             Quản lý Khách sạn
          </Link>
          <Link href="/admin/articles" className={styles.navLink}>
             Quản lý bài viết
          </Link>
          <Link href="/admin/reviews" className={styles.navLink}>
             Quản lý đánh giá
          </Link>

          <Link href="/admin/reports" className={styles.navLink}>
             Báo cáo & Thống kê
          </Link>
          <div style={{ marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
             <Link href="/" className={styles.navLink}>
               Trở về Trang chủ
             </Link>
          </div>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <div className={styles.userProfile}>
            <span className={styles.userName}>{session.user?.name}</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600' }}>
               {session.user?.name?.charAt(0)}
            </div>
          </div>
        </header>
        <div className={styles.contentBody}>
          {children}
        </div>
      </main>
    </div>
  );
}
