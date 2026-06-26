import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.col}>
            <Link href="/" className={styles.brand}>
              <span style={{ color: 'var(--primary-blue)' }}>Du Lịch</span> Việt Nam
            </Link>
            <p className={styles.desc}>
              Nhà tổ chức du lịch hàng đầu Việt Nam. Chúng tôi cung cấp các dịch vụ du lịch chuyên nghiệp, đa dạng và không ngừng đổi mới để mang lại trải nghiệm tuyệt vời nhất cho khách hàng.
            </p>
            <ul className={styles.linkList}>
              <li><span className={styles.link}>📞 1900 1839</span></li>
              <li><span className={styles.link}>✉️ 20220425@eaut.edu.vn</span></li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Khám phá</h4>
            <ul className={styles.linkList}>
              <li><Link href="/about" className={styles.link}>Về chúng tôi</Link></li>
              <li><Link href="/news" className={styles.link}>Tin tức & Cẩm nang</Link></li>
              <li><Link href="/contact" className={styles.link}>Liên hệ</Link></li>
              <li><Link href="/tours" className={styles.link}>Hệ thống Tour</Link></li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Chính sách</h4>
            <ul className={styles.linkList}>
              <li><Link href="/terms" className={styles.link}>Điều khoản chung</Link></li>
              <li><Link href="/terms" className={styles.link}>Chính sách bảo mật</Link></li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Dịch vụ khác</h4>
            <ul className={styles.linkList}>
              <li><Link href="/hotel" className={styles.link}>Đặt phòng khách sạn</Link></li>
              <li><Link href="/tours" className={styles.link}>Đặt tour du lịch</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© 2026 Du Lịch Việt Nam - Bản quyền nội dung đã được bảo hộ.</p>
        </div>
      </div>
    </footer>
  );
}
