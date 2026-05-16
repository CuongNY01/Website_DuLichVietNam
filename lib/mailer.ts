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
  const titleText = isPaid ? "Xác Nhận Thanh Toán & Vé Điện Tử" : "Xác Nhận Đặt Tour (Chờ Thanh Toán)";
  
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
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Mã Tour:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; text-align: right;">${booking.tour?.code || 'N/A'}</td>
          </tr>
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
        <strong>Lưu ý:</strong> Đơn hàng của Quý khách đang ở trạng thái chờ thanh toán. Vui lòng thanh toán sớm để đảm bảo giữ chỗ. Quý khách có thể vào mục "Chuyến đi của tôi" trên website để thanh toán trực tuyến.
      </div>
      ` : `
      <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; margin-bottom: 24px; color: #166534;">
        <strong>Thành công:</strong> Giao dịch thanh toán đã được xác nhận. Đây cũng chính là Vé Điện Tử (E-Ticket) của Quý khách. Vui lòng xuất trình email này cho hướng dẫn viên vào ngày khởi hành.
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
