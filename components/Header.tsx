"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/tours", label: "Tours" },
  { href: "/hotel", label: "Khách sạn" },
  { href: "/news", label: "Tin tức" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50 || !isHomePage);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className="container">
        <div className={styles.topbar}>
          <div className={styles.logo}>
            <Link href="/">
              <span>DU LỊCH VIỆT NAM</span>
            </Link>
          </div>

          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            {session ? (
              <>
                {(session.user as any)?.role === 'ADMIN' && (
                  <Link href="/admin" className={styles.navLink} style={{ color: 'var(--accent-red)', fontWeight: '600' }}>
                    Admin
                  </Link>
                )}
                <Link href="/profile" className={styles.navLink}>
                  {session.user?.name || "Tài khoản"}
                </Link>
                <button 
                  onClick={() => signOut()} 
                  className={styles.navLink}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Thoát
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className={styles.navLink}>
                  Đăng ký
                </Link>
                <Link href="/login" className={styles.navLink}>
                  Đăng nhập
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileDivider} />
          <Link href="/login" className={styles.mobileLoginBtn} onClick={() => setMenuOpen(false)}>
            Đăng nhập / Đăng ký
          </Link>
        </div>
      )}
    </header>
  );
}
