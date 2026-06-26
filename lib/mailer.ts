import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendBookingConfirmationEmail = async (booking: any, userEmail: string) => {
  const isPaid = booking.paymentStatus === "Đã thanh toán";
  const isHotel = !!booking.hotelId;
  const serviceType = isHotel ? "Đặt Phòng Khách Sạn" : "Đặt Tour Du Lịch";
  
  const titleText = isPaid 
    ? `Xác Nhận Thanh Toán & Vé Điện Tử (${serviceType})` 
    : `Xác Nhận ${serviceType} (Chờ Thanh Toán)`;

  const noteContent = !isPaid 
    ? `Đơn hàng của Quý khách đang ở trạng thái chờ thanh toán. Vui lòng thanh toán sớm để đảm bảo giữ chỗ/phòng. Quý khách có thể vào mục "Chuyến đi của tôi" trên website để thanh toán trực tuyến.`
    : isHotel
      ? `Giao dịch thanh toán đã được xác nhận. Đây chính là Vé Đăng Ký Phòng Điện Tử của Quý khách. Vui lòng xuất trình email này khi nhận phòng tại khách sạn.`
      : `Giao dịch thanh toán đã được xác nhận. Đây cũng chính là Vé Điện Tử (E-Ticket) của Quý khách. Vui lòng xuất trình email này cho hướng dẫn viên vào ngày khởi hành.`;

  const itemDetailsRow = isHotel
    ? `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Khách sạn:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold; text-align: right;">${booking.hotel?.name || 'N/A'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Địa điểm:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; text-align: right;">${booking.hotel?.location || 'N/A'}</td>
      </tr>
    `
    : `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Tour:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold; text-align: right;">${booking.tour?.title || 'N/A'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Mã Tour:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; text-align: right;">${booking.tour?.code || 'N/A'}</td>
      </tr>
    `;

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #0a58a3; margin: 0;">Du Lịch Việt Nam</h1>
        <p style="color: #64748b; margin-top: 8px;">${titleText}</p>
      </div>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">Kính gửi Quý khách ${booking.customerName},</h2>
        <p style="color: #334155; line-height: 1.6;">Cảm ơn Quý khách đã tin tưởng và lựa chọn dịch vụ của Du Lịch Việt Nam. Dưới đây là thông tin chi tiết đơn hàng của Quý khách:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Mã đơn hàng:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold; text-align: right;">#${booking.bookingCode}</td>
          </tr>
          ${itemDetailsRow}
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Ngày đặt:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; text-align: right;">${booking.date}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Tổng tiền:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #e1191b; font-weight: bold; font-size: 18px; text-align: right;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.amount)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Trạng thái thanh toán:</td>
            <td style="padding: 8px 0; color: ${isPaid ? '#16a34a' : '#ea580c'}; font-weight: bold; text-align: right;">${booking.paymentStatus}</td>
          </tr>
        </table>
      </div>

      ${!isPaid ? `
      <div style="background-color: #fff7ed; border-left: 4px solid #ea580c; padding: 16px; margin-bottom: 24px; color: #9a3412;">
        <strong>Lưu ý:</strong> ${noteContent}
      </div>
      ` : `
      <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; margin-bottom: 24px; color: #166534;">
        <strong>Thành công:</strong> ${noteContent}
      </div>
      `}

      <div style="text-align: center; color: #94a3b8; font-size: 13px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
        <p>Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ tổng đài: <strong style="color: #0a58a3;">1900 1839</strong></p>
        <p>&copy; ${new Date().getFullYear()} Du Lịch Việt Nam. All rights reserved.</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Du Lịch Việt Nam" <${process.env.SMTP_USER}>`,
    to: userEmail,
    subject: `[Du Lịch Việt Nam] ${titleText} - #${booking.bookingCode}`,
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendPasswordResetEmail = async (email: string, name: string, resetLink: string) => {
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #0A58A3; text-align: center; margin-bottom: 20px;">VongQuanhTheGioi - Du Lịch Việt Nam</h2>
      <p>Xin chào <strong>${name}</strong>,</p>
      <p>Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản liên kết với email này.</p>
      <p>Vui lòng nhấp vào nút dưới đây để tiến hành đặt lại mật khẩu mới. Liên kết này có giá trị trong vòng 1 giờ:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #0A58A3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px rgba(10, 88, 163, 0.2);">Đặt lại mật khẩu</a>
      </div>
      <p>Nếu nút trên không hoạt động, bạn có thể sao chép và dán liên kết dưới đây vào trình duyệt:</p>
      <p style="word-break: break-all; color: #4b5563; background: #f3f4f6; padding: 12px; border-radius: 4px; font-size: 13px;">${resetLink}</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="font-size: 12px; color: #9ca3af;">Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
    </div>
  `;

  const mailOptions = {
    from: `"Du Lịch Việt Nam" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Đặt lại mật khẩu - Du Lịch Việt Nam",
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

