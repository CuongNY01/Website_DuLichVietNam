export interface BookingData {
  date: string;
  bookingsCount: number;
  revenue: number;
}

// Generate last 7 days including today
const generateLast7Days = (): BookingData[] => {
  const data: BookingData[] = [];
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    
    // Formatting: 21/04
    const dateStr = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    
    // Random but realistic booking counts (5-20 per day)
    const count = Math.floor(Math.random() * 15) + 5;
    
    data.push({
      date: dateStr,
      bookingsCount: count,
      revenue: count * 3500000, // Avg price of 3.5M
    });
  }
  
  return data;
};

export const bookingHistory = generateLast7Days();

export const recentBookings = [
  { id: '1', bookingCode: 'BK-001', customer: 'Nguyễn Văn A', tour: 'Phú Quốc: Vinpearl Safari...', date: '21/04/2026', amount: 6990000, status: 'Hoàn tất', paymentMethod: 'VNPay', paymentStatus: 'Đã thanh toán' },
  { id: '2', bookingCode: 'BK-002', customer: 'Trần Thị B', tour: 'Hạ Long: Khách sạn 5 sao...', date: '21/04/2026', amount: 3500000, status: 'Chờ xử lý', paymentMethod: 'Tiền mặt', paymentStatus: 'Chưa thanh toán' },
  { id: '3', bookingCode: 'BK-003', customer: 'Lê Văn C', tour: 'Đà Nẵng - Hội An...', date: '20/04/2026', amount: 4490000, status: 'Hoàn tất', paymentMethod: 'VNPay', paymentStatus: 'Đã thanh toán' },
  { id: '4', bookingCode: 'BK-004', customer: 'Phạm Minh D', tour: 'Nha Trang: Đảo Khỉ...', date: '20/04/2026', amount: 5590000, status: 'Đã hủy', paymentMethod: 'Momo', paymentStatus: 'Chưa thanh toán' },
  { id: '5', bookingCode: 'BK-005', customer: 'Hoàng Anh E', tour: 'Đà Lạt: Langbiang...', date: '19/04/2026', amount: 3190000, status: 'Hoàn tất', paymentMethod: 'VNPay', paymentStatus: 'Đã thanh toán' },
];
