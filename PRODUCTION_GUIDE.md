# Hướng dẫn Triển khai Dự án lên Môi trường Thực tế (Production)

Tài liệu này cung cấp các bước chi tiết để đưa dự án **VongQuanhTheGioi / Du Lịch Việt Nam** vào hoạt động thực tế.

---

## Bước 1: Cấu hình Cơ sở dữ liệu Online (PostgreSQL)

Thay vì chạy database ở localhost, bạn cần một cơ sở dữ liệu online. Khuyên dùng **Supabase** hoặc **Neon** (cả hai đều có gói miễn phí/giá rẻ).

### Cách thiết lập trên Supabase:
1. Truy cập [supabase.com](https://supabase.com) và đăng ký tài khoản.
2. Tạo một dự án mới (New Project).
3. Đặt mật khẩu cho database (hãy lưu lại mật khẩu này). Chọn khu vực (Region) gần Việt Nam nhất (ví dụ: `Singapore` hoặc `Tokyo`).
4. Sau khi dự án tạo xong, vào mục **Project Settings** -> **Database**.
5. Tìm mục **Connection string** và chọn định dạng **URI**.
6. Đường dẫn kết nối sẽ có dạng:
   ```
   postgresql://postgres.[your-project-ref]:[your-password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
   ```
   *(Lưu ý: Thay thế `[your-password]` bằng mật khẩu database bạn đã đặt ở bước 3).*
7. Cập nhật chuỗi kết nối này vào biến `DATABASE_URL` trong file cấu hình môi trường khi deploy.

---

## Bước 2: Đồng bộ cơ sở dữ liệu (Database Migration)

Sau khi có `DATABASE_URL` mới, bạn cần khởi tạo cấu trúc bảng trên cơ sở dữ liệu online.
Chạy các lệnh sau từ máy tính cá nhân của bạn (hãy đảm bảo đã đổi `DATABASE_URL` trong file `.env` thành URL online tạm thời để chạy lệnh này):

1. Đồng bộ cấu trúc bảng lên cơ sở dữ liệu online:
   ```bash
   npx prisma db push
   ```
2. Nạp dữ liệu mẫu ban đầu (Tour, Khách sạn, Bài viết, Admin mặc định...):
   ```bash
   npx prisma db seed
   ```

---

## Bước 3: Cấu hình Gửi Email (SMTP)

Dự án hiện tại dùng tài khoản Gmail cá nhân để gửi thư. Để đảm bảo độ ổn định và chuyên nghiệp, bạn nên dùng các nhà cung cấp email giao dịch:

*   **Lựa chọn:** **Resend** (khuyên dùng, miễn phí 3,000 email/tháng, tích hợp cực nhanh với React/Next.js).
*   **Cấu hình Resend:**
    1. Đăng ký tài khoản tại [resend.com](https://resend.com).
    2. Xác thực tên miền của bạn (Domain Verification) để có thể gửi mail từ địa chỉ `noreply@tenmien.com`.
    3. Tạo API Key.
    4. Thay đổi cài đặt SMTP trong file cấu hình:
       *   `SMTP_USER` = `resend` (hoặc email gửi đi).
       *   `SMTP_PASS` = `re_xxxxxxxxxxxx` (API Key của Resend).

---

## Bước 4: Cấu hình Đăng nhập Google & Facebook

Khi chạy thực tế trên tên miền thật (ví dụ: `https://dulichvietnam.vn`), bạn cần cấu hình lại URL phản hồi (Redirect URI) trên trang quản trị nhà phát triển:

### Google Login:
1. Vào [Google Cloud Console](https://console.cloud.google.com).
2. Vào **APIs & Services** -> **Credentials**.
3. Chọn OAuth 2.0 Client ID bạn đã tạo.
4. Ở mục **Authorized redirect URIs**, thêm đường dẫn sau:
   ```
   https://ten-mien-cua-ban.com/api/auth/callback/google
   ```
5. Lưu lại.

### Facebook Login:
1. Vào [Facebook Developers](https://developers.facebook.com).
2. Chọn ứng dụng của bạn.
3. Vào **Facebook Login** -> **Settings**.
4. Ở mục **Valid OAuth Redirect URIs**, thêm đường dẫn sau:
   ```
   https://ten-mien-cua-ban.com/api/auth/callback/facebook
   ```
5. Lưu lại.

---

## Bước 5: Deploy ứng dụng Next.js

### Phương án 1: Triển khai lên Vercel (Khuyên dùng - Nhanh nhất)
1. Đẩy toàn bộ mã nguồn của bạn lên một repository riêng tư (Private) trên **GitHub**.
2. Truy cập [vercel.com](https://vercel.com) và kết nối tài khoản GitHub của bạn.
3. Chọn **Import** dự án này.
4. Ở phần **Environment Variables** (Biến môi trường), thêm đầy đủ các biến từ file `.env` của bạn:
   *   `DATABASE_URL` (Sử dụng URL kết nối online của Supabase/Neon)
   *   `AUTH_SECRET` (Chuỗi bảo mật NextAuth)
   *   `NEXTAUTH_SECRET` (Trùng với AUTH_SECRET)
   *   `NEXTAUTH_URL` = `https://ten-mien-cua-ban.vercel.app` (hoặc tên miền riêng của bạn)
   *   Các thông tin Google, Facebook, VNPAY, Cloudinary, SMTP...
5. Nhấp nút **Deploy**. Vercel sẽ tự động build ứng dụng và cung cấp tên miền HTTPS miễn phí.

### Phương án 2: Triển khai lên VPS riêng (Ubuntu / Debian)
Nếu tự vận hành máy chủ, bạn cần cài đặt **Node.js (v18+)**, **Nginx** và **PM2**.

1. Clone mã nguồn từ GitHub về VPS.
2. Tạo file `.env` trên VPS chứa đầy đủ biến môi trường.
3. Cài đặt thư viện:
   ```bash
   npm install --production
   ```
4. Build dự án:
   ```bash
   npm run build
   ```
5. Chạy ứng dụng dưới nền bằng PM2 để tránh bị dừng đột ngột:
   ```bash
   npm install -g pm2
   pm2 start npm --name "dulich-app" -- start
   ```
6. Cấu hình Nginx để làm Reverse Proxy trỏ từ tên miền cổng 80/443 về ứng dụng Next.js đang chạy ở cổng 3000.
7. Cài đặt chứng chỉ SSL bằng Let's Encrypt:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d ten-mien-cua-ban.com
   ```
