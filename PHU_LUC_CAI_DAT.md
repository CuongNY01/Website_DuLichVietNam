**PHỤ LỤC: HƯỚNG DẪN CÀI ĐẶT VÀ TRIỂN KHAI DỰ ÁN**

**1. Cơ sở dữ liệu (PostgreSQL)**

Hệ thống sử dụng PostgreSQL làm nơi lưu trữ dữ liệu tập trung cho toàn bộ ứng dụng Website.

**Bước 1: Cài đặt hệ quản trị CSDL**

*   Tải và cài đặt **PostgreSQL** (bản 14 hoặc mới hơn).
*   Tải và cài đặt **pgAdmin 4** (hoặc DBeaver) để quản lý giao diện cơ sở dữ liệu.

**Bước 2: Khởi tạo dữ liệu**

*   Mở pgAdmin 4, kết nối vào Server và tạo một Database mới (ví dụ: `travel_db`).
*   Mở Terminal trong thư mục dự án, chạy lệnh `npx prisma db push` để hệ thống tự động khởi tạo các bảng, quan hệ (Relations) dựa trên file Schema.
*   (Tùy chọn) Chạy lệnh `npx prisma db seed` để nạp dữ liệu mẫu ban đầu vào cơ sở dữ liệu.

**Bước 3: Cấu hình quyền truy cập**

*   Đảm bảo dịch vụ PostgreSQL đang hoạt động.
*   Kiểm tra cổng mặc định của PostgreSQL là **5432**.

**2. Môi trường phát triển (Node.js & Next.js) — Dùng Visual Studio Code**

Đây là nền tảng để chạy mã nguồn của dự án, bao gồm cả giao diện Khách hàng và bảng điều khiển Admin.

**Bước 1: Chuẩn bị môi trường**

*   Tải và cài đặt **Node.js** (khuyến nghị bản LTS 18.x trở lên, đi kèm với `npm`).
*   Tải và cài đặt trình soạn thảo mã nguồn **Visual Studio Code (VS Code)**.

**Bước 2: Mở và cấu hình Project**

*   Mở VS Code, chọn **Open Folder** và trỏ đến thư mục gốc của dự án.
*   Mở Terminal trong VS Code (phím tắt `Ctrl` + `~`), chạy lệnh `npm install` để đợi hệ thống tải tất cả các thư viện (Dependencies) cần thiết.

**Bước 3: Cấu hình kết nối CSDL (Tùy chọn)**

*   Mở file `.env` (trong thư mục gốc dự án) và cập nhật thông tin chuỗi kết nối:
    *   `DATABASE_URL="postgresql://<User>:<Password>@localhost:5432/<Database_Name>?schema=public"`

**3. Chạy và Triển khai Website — Giao diện Khách hàng & Admin**

Đây là bước để khởi động hệ thống cho khách hàng đặt tour, phòng khách sạn và admin quản trị.

**Bước 1: Cấu hình API và AI**

*   Trong file `.env`, cập nhật thêm các cấu hình bảo mật và API bên thứ ba:
    *   Cấu hình xác thực (NextAuth): `NEXTAUTH_SECRET` và `NEXTAUTH_URL="http://localhost:3000"`.
    *   Mở file cấu hình để kiểm tra/cập nhật Gemini API Key (nhận từ Google AI Studio) cho biến `GOOGLE_GENERATIVE_AI_API_KEY`.

**Bước 2: Chạy ứng dụng**

*   Trong Terminal của VS Code, chạy lệnh `npm run dev` để khởi động máy chủ cục bộ.
*   Đợi hệ thống biên dịch mã nguồn thành công (thông báo "Ready in..." xuất hiện).

**Bước 3: Truy cập**

*   Mở trình duyệt Web (Chrome/Edge/Cốc Cốc).
*   Truy cập địa chỉ dành cho khách hàng: `http://localhost:3000`
*   Truy cập địa chỉ trang quản trị: `http://localhost:3000/admin` (yêu cầu đăng nhập tài khoản quản trị).

**4. Cấu hình dịch vụ tích hợp**

Để hệ thống vận hành đầy đủ các tính năng hiện đại, cần đảm bảo:

*   **Internet:** Phải có kết nối mạng ổn định để Chatbot AI (Gemini), hệ thống bản đồ trực tuyến và các tài nguyên Cloud hoạt động bình thường.
*   **Thanh toán:** Cấu hình đúng các khóa bí mật (Secret Key) và URL của cổng thanh toán (như VNPay) trong file `.env` để khách hàng thanh toán thành công.
*   **Lưu trữ đám mây:** Nếu sử dụng dịch vụ lưu trữ ảnh ngoài (Cloudinary, AWS S3), cần cấu hình các Key tương ứng để tính năng upload ảnh của Admin hoạt động.
