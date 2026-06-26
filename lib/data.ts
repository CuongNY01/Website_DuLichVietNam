export interface Tour {
  id: string;
  code: string;
  title: string;
  destination: string;
  departurePoint: string;
  image: string;
  departureDate: string;
  time: string;
  duration: string;
  oldPrice: number;
  price: number;
  discount: string;
  seats: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  itinerary: { day: string; title: string; desc: string }[];
  category?: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  stars: number;
  price: number;
  oldPrice: number;
  image: string;
  gallery?: string[];
  description?: string;
  amenities?: { name: string; icon: string }[];
  rooms?: { name: string; price: number; capacity: string; amenities: string[] }[];
  features: string[];
  reviews: number;
}


export const tours: Tour[] = [
  {
    id: "vn-01",
    code: "VNHL789",
    title: "Hạ Long: Khách sạn 5 sao cao cấp và Du thuyền",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/hero_bg.png",
    departureDate: "10/05/2026",
    time: "08:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 4500000,
    price: 3500000,
    discount: "1tr",
    seats: 12,
    rating: 8.8,
    reviews: 80,
    category: "Trong nước",
    description: "Tận hưởng không gian nghỉ dưỡng cao cấp trên du thuyền ngắm nhìn di sản kỳ quan thiên nhiên thế giới Vịnh Hạ Long.",
    features: ["Du thuyền 5 sao", "Ăn Buffet hải sản", "Xe đưa đón tận nơi"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Hạ Long", desc: "Xe limousine đón khách đi Hạ Long. Nhận phòng du thuyền 5 sao." },
      { day: "Ngày 2", title: "Vịnh Hạ Long", desc: "Tham quan hang Sửng Sốt, chèo thuyền Kayak tại khu vực hang Luồn." },
      { day: "Ngày 3", title: "Hạ Long - Hà Nội", desc: "Thăm đảo Titop, ăn trưa trên du thuyền. Chiều lên xe về lại Hà Nội." }
    ]
  },
  {
    id: "vn-02",
    code: "VNDN002",
    title: "Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/hero_bg.png",
    departureDate: "01/06/2026",
    time: "06:30",
    duration: "4 ngày 3 đêm",
    oldPrice: 5990000,
    price: 4490000,
    discount: "1.5tr",
    seats: 20,
    rating: 9.1,
    reviews: 560,
    category: "Trong nước",
    description: "Hành trình khám phá miền Trung xinh đẹp: Đà Nẵng sôi động, Hội An cổ kính và Bà Nà Hills huyền bí.",
    features: ["Khách sạn 3-4 sao", "Vé máy bay khứ hồi", "Cáp treo Bà Nà"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Đà Nẵng", desc: "Bay đến Đà Nẵng, thăm Làng Chài Mỹ Khê và tắm biển." },
      { day: "Ngày 2", title: "Bà Nà Hills", desc: "Cáp treo lên Bà Nà Hills, tham quan Cầu Vàng nổi tiếng." },
      { day: "Ngày 3", title: "Hội An cổ trấn", desc: "Khám phá phố cổ Hội An, đêm thả đèn hoa đăng sông Hoài." },
      { day: "Ngày 4", title: "Đà Nẵng - TP.HCM", desc: "Mua đặc sản, ra sân bay trở về TP.HCM." }
    ]
  },
  {
    id: "vn-03",
    code: "VNSP003",
    title: "Sapa - Cát Cát - Fansipan Hùng Vĩ 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/destinations/sapa.png",
    departureDate: "15/06/2026",
    time: "07:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 3890000,
    price: 2990000,
    discount: "900k",
    seats: 15,
    rating: 9.0,
    reviews: 145,
    category: "Trong nước",
    description: "Chinh phục đỉnh Fansipan - nóc nhà Đông Dương và khám phá nét đẹp văn hóa bản Cát Cát thơ mộng giữa sương mù Sapa.",
    features: ["Vé cáp treo Fansipan", "Khách sạn 3 sao view núi", "HDV bản địa chuyên nghiệp"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Sapa - Bản Cát Cát", desc: "Di chuyển bằng xe giường nằm cao cấp từ Hà Nội lên Sapa. Chiều tham quan bản Cát Cát của người H’Mông." },
      { day: "Ngày 2", title: "Chinh phục đỉnh Fansipan", desc: "Đi cáp treo Fansipan ngắm toàn cảnh thung lũng Mường Hoa, chinh phục đỉnh cao 3.143m." },
      { day: "Ngày 3", title: "Sapa - Hàm Rồng - Hà Nội", desc: "Thăm núi Hàm Rồng, ngắm vườn lan, cổng trời. Chiều đón xe về lại Hà Nội." }
    ]
  },
  {
    id: "vn-04",
    code: "VNHG004",
    title: "Hà Giang - Lũng Cú - Cao Nguyên Đá Đồng Văn 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/destinations/sapa.png",
    departureDate: "18/06/2026",
    time: "06:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 4200000,
    price: 3250000,
    discount: "950k",
    seats: 12,
    rating: 9.3,
    reviews: 98,
    category: "Trong nước",
    description: "Hành trình khám phá địa đầu Tổ quốc: Cột cờ Lũng Cú hùng vĩ, Dinh thự họ Vương cổ kính và đèo Mã Pí Lèng kỳ vĩ bên sông Nho Quế.",
    features: ["Xe du lịch chất lượng cao", "Du thuyền sông Nho Quế", "Khách sạn trung tâm Đồng Văn"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Quản Bạ - Đồng Văn", desc: "Khởi hành đi Hà Giang, dừng chân chụp ảnh Cổng trời Quản Bạ, núi đôi Cô Tiên. Nhận phòng tại Đồng Văn." },
      { day: "Ngày 2", title: "Cột cờ Lũng Cú - Mã Pí Lèng - Sông Nho Quế", desc: "Chinh phục cột cờ Lũng Cú cực Bắc. Vượt đèo Mã Pí Lèng hùng vĩ và đi thuyền ngắm hẻm vực Tu Sản trên sông Nho Quế." },
      { day: "Ngày 3", title: "Chợ phiên Đồng Văn - Hà Nội", desc: "Trải nghiệm chợ phiên Đồng Văn rực rỡ sắc màu vùng cao. Khởi hành về Hà Nội." }
    ]
  },
  {
    id: "vn-05",
    code: "VNNB005",
    title: "Ninh Bình - Tràng An - Bái Đính - Hang Múa 2N1Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/hero_bg.png",
    departureDate: "12/06/2026",
    time: "08:00",
    duration: "2 ngày 1 đêm",
    oldPrice: 2400000,
    price: 1890000,
    discount: "510k",
    seats: 18,
    rating: 8.9,
    reviews: 210,
    category: "Trong nước",
    description: "Khám phá danh thắng Tràng An được UNESCO công nhận, chiêm bái ngôi chùa Bái Đính kỷ lục và check-in Hang Múa ngoạn mục.",
    features: ["Thuyền nan Tràng An", "Vé xe điện chùa Bái Đính", "Resort sinh thái nghỉ dưỡng"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Chùa Bái Đính - Hang Múa", desc: "Khởi hành đi Ninh Bình. Thăm Chùa Bái Đính quy mô lớn nhất Đông Nam Á. Chiều leo 486 bậc đá chinh phục đỉnh Hang Múa ngắm toàn cảnh Tam Cốc." },
      { day: "Ngày 2", title: "Khu sinh thái Tràng An - Hà Nội", desc: "Đi đò Tràng An xuyên qua các hang động tự nhiên và thăm phim trường Kong: Skull Island. Chiều trở về Hà Nội." }
    ]
  },
  {
    id: "vn-06",
    code: "VNPH006",
    title: "Quảng Bình: Phong Nha - Động Thiên Đường 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Đà Nẵng",
    image: "/hero_bg_danang.png",
    departureDate: "20/06/2026",
    time: "07:30",
    duration: "3 ngày 2 đêm",
    oldPrice: 4390000,
    price: 3490000,
    discount: "900k",
    seats: 14,
    rating: 9.2,
    reviews: 65,
    category: "Trong nước",
    description: "Thám hiểm vương quốc hang động Quảng Bình: Động Phong Nha huyền ảo kỳ vĩ và Động Thiên Đường - cung điện trong lòng đất.",
    features: ["Thuyền rồng sông Son", "Xe điện Động Thiên Đường", "Khách sạn sát biển Nhật Lệ"],
    itinerary: [
      { day: "Ngày 1", title: "Đà Nẵng - Đồng Hới", desc: "Di chuyển đến Quảng Bình qua Vĩ tuyến 17 - Cầu Hiền Lương. Nhận phòng khách sạn và tự do tắm biển Nhật Lệ." },
      { day: "Ngày 2", title: "Động Phong Nha - Động Thiên Đường", desc: "Đi thuyền trên sông Son vào thăm Động Phong Nha. Chiều khám phá Động Thiên Đường với hệ thống thạch nhũ tráng lệ bậc nhất thế giới." },
      { day: "Ngày 3", title: "Vũng Chùa Đảo Yến - Đà Nẵng", desc: "Dâng hương tại nơi an nghỉ của Đại tướng Võ Nguyên Giáp ở Vũng Chùa - Đảo Yến. Trở về Đà Nẵng." }
    ]
  },
  {
    id: "vn-07",
    code: "VNHU007",
    title: "Cố Đô Huế - Đại Nội - Chùa Thiên Mụ 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Đà Nẵng",
    image: "/hero_bg_danang.png",
    departureDate: "10/06/2026",
    time: "08:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 3500000,
    price: 2790000,
    discount: "710k",
    seats: 25,
    rating: 9.0,
    reviews: 130,
    category: "Trong nước",
    description: "Hành trình di sản tìm về nét hoài cổ của Cố đô Huế: Đại Nội nguy nga, các lăng tẩm triều Nguyễn và thưởng thức ca Huế trên sông Hương.",
    features: ["Khách sạn 4 sao trung tâm", "Thưởng thức ẩm thực cung đình", "Nghe ca Huế trên sông Hương"],
    itinerary: [
      { day: "Ngày 1", title: "Đà Nẵng - Lăng Cô - Huế", desc: "Khởi hành ra Huế qua hầm Hải Vân. Dừng chân tại vịnh Lăng Cô thơ mộng. Chiều thăm Chùa Thiên Mụ và nghe Ca Huế trên sông Hương về đêm." },
      { day: "Ngày 2", title: "Đại Nội - Lăng Khải Định - Lăng Minh Mạng", desc: "Khám phá Hoàng Thành Huế (Đại Nội) cổ kính. Chiều tham quan Lăng Khải Định độc đáo và Lăng Minh Mạng uy nghiêm." },
      { day: "Ngày 3", title: "Chợ Đông Ba - Đà Nẵng", desc: "Mua sắm đặc sản trà cung đình, kẹo mè xửng tại Chợ Đông Ba. Khởi hành về lại Đà Nẵng." }
    ]
  },
  {
    id: "vn-08",
    code: "VNNT008",
    title: "Nha Trang - Vịnh San Hô - VinWonders 4N3Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/promo_japan.png",
    departureDate: "25/06/2026",
    time: "06:00",
    duration: "4 ngày 3 đêm",
    oldPrice: 5190000,
    price: 3990000,
    discount: "1.2tr",
    seats: 22,
    rating: 9.1,
    reviews: 320,
    category: "Trong nước",
    description: "Tận hưởng kỳ nghỉ hè sôi động tại thiên đường biển Nha Trang, khám phá thế giới giải trí VinWonders và lặn ngắm san hô tại Vịnh San Hô.",
    features: ["Cano cao tốc tham quan đảo", "Tắm bùn khoáng nóng", "Thưởng thức tiệc hải sản"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Nha Trang", desc: "Khởi hành đi Nha Trang bằng xe giường nằm VIP. Tối tự do khám phá phố biển hoặc chợ đêm Nha Trang." },
      { day: "Ngày 2", title: "Khám phá Vịnh Nha Trang - Vịnh San Hô", desc: "Đi cano cao tốc tham quan Vịnh San Hô, tắm biển, chèo SUP và lặn ngắm san hô thiên nhiên nhiều màu sắc." },
      { day: "Ngày 3", title: "Thiên đường giải trí VinWonders", desc: "Trải nghiệm cáp treo vượt biển dài nhất thế giới và vui chơi cả ngày tại VinWonders Nha Trang với show diễn Tata lộng lẫy." },
      { day: "Ngày 4", title: "Tháp Bà Ponagar - TP.HCM", desc: "Thăm tháp Chăm Ponagar cổ kính, mua sắm đặc sản yến sào, chả cá Nha Trang trước khi khởi hành về TP.HCM." }
    ]
  },
  {
    id: "vn-09",
    code: "VNDL009",
    title: "Đà Lạt - Thành Phố Ngàn Hoa Lãng Mạn 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/destinations/da-lat.png",
    departureDate: "14/06/2026",
    time: "05:30",
    duration: "3 ngày 2 đêm",
    oldPrice: 3490000,
    price: 2690000,
    discount: "800k",
    seats: 28,
    rating: 8.8,
    reviews: 412,
    category: "Trong nước",
    description: "Trốn nóng Sài Gòn tại Đà Lạt mộng mơ: Check-in Hồ Vô Cực, thung lũng tình yêu, thưởng thức lẩu gà lá é và cà phê view thung lũng rừng thông.",
    features: ["Khách sạn phong cách châu Âu", "Xe Limousine êm ái", "Check-in các vườn hoa lớn"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Đà Lạt - Quảng Trường Lâm Viên", desc: "Khởi hành lên Đà Lạt. Chiều check-in Quảng trường Lâm Viên, dạo mát quanh Hồ Xuân Hương và dạo chợ đêm." },
      { day: "Ngày 2", title: "Thung Lũng Tình Yêu - Langbiang", desc: "Khám phá Thung lũng Tình Yêu lãng mạn. Chiều chinh phục đỉnh núi Langbiang bằng xe Jeep và giao lưu cồng chiêng Tây Nguyên." },
      { day: "Ngày 3", title: "Chùa Linh Phước - Ga Đà Lạt - TP.HCM", desc: "Thăm chùa Ve Chai độc đáo làm từ mảnh sành, nhà ga cổ Đà Lạt. Chiều lên xe khởi hành về lại TP.HCM." }
    ]
  },
  {
    id: "vn-10",
    code: "VNPQ010",
    title: "Phú Quốc: Grand World - Địa Trung Hải 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/destinations/phu-quoc.png",
    departureDate: "28/06/2026",
    time: "07:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 6390000,
    price: 4890000,
    discount: "1.5tr",
    seats: 16,
    rating: 9.4,
    reviews: 280,
    category: "Trong nước",
    description: "Khám phá đảo ngọc Phú Quốc thời thượng: Venice thu nhỏ tại Grand World, check-in Cầu Hôn lãng mạn tại Thị trấn Hoàng Hôn Địa Trung Hải.",
    features: ["Vé máy bay khứ hồi khứ hồi", "Resort 4 sao sát biển", "Tour 3 đảo lặn ngắm san hô"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Phú Quốc - Grand World", desc: "Bay tới Phú Quốc. Chiều check-in Grand World - thành phố không ngủ sôi động với show diễn Sắc màu Venice." },
      { day: "Ngày 2", title: "Cano 3 đảo hoang sơ - Sunset Town", desc: "Đi cano khám phá Hòn Móng Tay, Hòn Gầm Ghì, Hòn Mây Rút. Chiều ngắm hoàng hôn rực rỡ tại Thị trấn Hoàng Hôn." },
      { day: "Ngày 3", title: "Chùa Hộ Quốc - Bãi Sao - TP.HCM", desc: "Thăm Thiền viện Trúc Lâm Hộ Quốc, tắm biển cát trắng tại Bãi Sao nổi tiếng. Ra sân bay về lại TP.HCM." }
    ]
  },
  {
    id: "vn-11",
    code: "VNMT011",
    title: "Hương Sắc Miền Tây: Mỹ Tho - Cần Thơ 2N1Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/hero_bg_sunset.png",
    departureDate: "13/06/2026",
    time: "07:30",
    duration: "2 ngày 1 đêm",
    oldPrice: 1990000,
    price: 1590000,
    discount: "400k",
    seats: 30,
    rating: 8.7,
    reviews: 180,
    category: "Trong nước",
    description: "Trải nghiệm văn hóa sông nước Miền Tây nam bộ đậm chất mộc mạc: Đi xuồng ba lá len lỏi rạch dừa nước, thăm chợ nổi Cái Răng.",
    features: ["Nghe đờn ca tài tử Nam Bộ", "Trải nghiệm hái trái cây tại vườn", "Thưởng thức cá lóc nướng trui"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Mỹ Tho - Bến Tre - Cần Thơ", desc: "Khởi hành đi Mỹ Tho. Đi thuyền trên sông Tiền ghé cồn Thới Sơn ngắm vườn trái cây, nghe đờn ca tài tử. Tối ngủ Cần Thơ." },
      { day: "Ngày 2", title: "Chợ nổi Cái Răng - Nhà cổ Bình Thủy", desc: "Dậy sớm đi thuyền khám phá chợ nổi Cái Răng tấp nập mua bán. Ghé thăm Nhà cổ Bình Thủy hơn 100 năm tuổi. Về TP.HCM." }
    ]
  },
  {
    id: "vn-12",
    code: "VNCB012",
    title: "Cao Bằng - Thác Bản Giốc hùng vĩ 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/destinations/sapa.png",
    departureDate: "26/06/2026",
    time: "06:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 3990000,
    price: 3190000,
    discount: "800k",
    seats: 12,
    rating: 9.1,
    reviews: 74,
    category: "Trong nước",
    description: "Chiêm ngưỡng vẻ đẹp ngoạn mục của Thác Bản Giốc - thác nước biên giới lớn thứ 4 thế giới, thăm động Ngườm Ngao và suối Lê-nin.",
    features: ["Chèo bè tre áp sát chân thác", "Thăm suối Lê-nin - hang Pác Bó", "Trải nghiệm ẩm thực người Tày"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Cao Bằng - Trùng Khánh", desc: "Khởi hành từ Hà Nội đi Cao Bằng qua những cung đường đèo tuyệt đẹp. Dừng chân nhận phòng tại huyện Trùng Khánh." },
      { day: "Ngày 2", title: "Thác Bản Giốc - Động Ngườm Ngao - Chùa Phật Tích", desc: "Tham quan Thác Bản Giốc rực rỡ bọt trắng xóa, đi bè tre chụp ảnh. Chiều thăm động Ngườm Ngao huyền ảo đầy nhũ đá kỳ lạ." },
      { day: "Ngày 3", title: "Khu di tích Pác Bó - Hà Nội", desc: "Thăm suối Lê-nin trong xanh như ngọc và hang Pác Bó lịch sử. Trở về Hà Nội." }
    ]
  },
  {
    id: "vn-13",
    code: "VNCS013",
    title: "Côn Đảo: Tâm Linh Côn Sơn & Nghỉ Dưỡng Hoang Sơ 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/destinations/phu-quoc.png",
    departureDate: "05/06/2026",
    time: "08:30",
    duration: "3 ngày 2 đêm",
    oldPrice: 7990000,
    price: 6290000,
    discount: "1.7tr",
    seats: 10,
    rating: 9.5,
    reviews: 110,
    category: "Trong nước",
    description: "Hành trình linh thiêng viếng nghĩa trang Hàng Dương mộ cô Sáu và nghỉ dưỡng tại thiên đường đảo Côn Sơn hoang sơ tuyệt mỹ.",
    features: ["Vé máy bay khứ hồi", "Viếng mộ cô Sáu về đêm", "Tắm biển Bãi Nhát hoang sơ"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Côn Đảo - Miếu Bà Phi Yến", desc: "Bay ra Côn Đảo. Viếng Miếu Bà Phi Yến thanh tịnh. Tối tham gia tour tâm linh dâng hương mộ cô Sáu tại nghĩa trang Hàng Dương." },
      { day: "Ngày 2", title: "Nhà tù Côn Đảo - Bãi Nhát - Đỉnh Tình Yêu", desc: "Tìm hiểu lịch sử hào hùng tại di tích nhà tù Côn Đảo (chuồng cọp Pháp - Mỹ). Chiều check-in Bãi Nhát, ngắm đỉnh Tình Yêu." },
      { day: "Ngày 3", title: "Chợ Côn Đảo - TP.HCM", desc: "Mua đặc sản hạt bàng rang muối tại chợ Côn Đảo. Đáp chuyến bay trở lại TP.HCM." }
    ]
  },
  {
    id: "vn-14",
    code: "VNPT014",
    title: "Phan Thiết - Mũi Né - Đồi Cát Bay 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/promo_japan.png",
    departureDate: "09/06/2026",
    time: "07:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 2890000,
    price: 2290000,
    discount: "600k",
    seats: 24,
    rating: 8.6,
    reviews: 195,
    category: "Trong nước",
    description: "Tận hưởng nắng vàng biển xanh Mũi Né, trượt cát thỏa thích tại đồi cát bay hồng và check-in Bàu Trắng tựa sa mạc Sahara.",
    features: ["Resort 3 sao sát biển", "Xe Jeep khám phá Bàu Trắng", "Thưởng thức lẩu thả hải sản"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Phan Thiết - Đồi Cát Bay", desc: "Di chuyển đến Phan Thiết bằng xe Limousine cao cấp. Nhận phòng resort. Chiều check-in và trượt cát tại Đồi Cát Bay." },
      { day: "Ngày 2", title: "Suối Tiên - Bàu Trắng Địa Điểm Sống Ảo", desc: "Khám phá Suối Tiên Mũi Né với nhũ cát đỏ độc đáo. Chiều đi xe Jeep vượt cát trắng tại đồi cát Bàu Trắng tựa tiểu sa mạc." },
      { day: "Ngày 3", title: "Lâu đài rượu vang RD - TP.HCM", desc: "Thăm quan Lâu đài rượu vang chuẩn Âu, thưởng thức vang đỏ miễn phí. Khởi hành về TP.HCM." }
    ]
  },
  {
    id: "vn-15",
    code: "VNPB015",
    title: "Quy Nhơn - Eo Gió - Kỳ Co Biển Xanh 4N3Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/hero_bg_danang.png",
    departureDate: "11/06/2026",
    time: "06:30",
    duration: "4 ngày 3 đêm",
    oldPrice: 5390000,
    price: 4190000,
    discount: "1.2tr",
    seats: 18,
    rating: 9.1,
    reviews: 142,
    category: "Trong nước",
    description: "Khám phá Maldives phiên bản Việt Nam tại bãi biển Kỳ Co trong vắt tận đáy, ngắm hoàng hôn quyến rũ bậc nhất tại Eo Gió.",
    features: ["Cano vượt biển đi đảo Kỳ Co", "Thăm Tịnh xá Ngọc Hòa cầu may", "Khách sạn view biển Quy Nhơn"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Quy Nhơn - Tháp Đôi", desc: "Khởi hành đi Quy Nhơn bằng xe giường nằm hạng sang. Chiều ghé thăm Tháp Đôi kiến trúc Champa kỳ lạ." },
      { day: "Ngày 2", title: "Đảo Kỳ Co - Eo Gió Kỳ Vĩ", desc: "Đón cano sang Kỳ Co tắm biển, lặn ngắm san hô Bãi Dứa. Chiều check-in Eo Gió lộng gió hoang sơ." },
      { day: "Ngày 3", title: "Ghềnh Ráng Tiên Sa - Khu mộ Hàn Mặc Tử", desc: "Khám phá Ghềnh Ráng, viếng mộ nhà thơ Hàn Mặc Tử, check-in bãi trứng Hoàng Hậu độc đáo." },
      { day: "Ngày 4", title: "Chùa Thiên Hưng - TP.HCM", desc: "Thăm Chùa Thiên Hưng - Phượng Hoàng Cổ Trấn của Quy Nhơn cổ kính trước khi di chuyển về lại TP.HCM." }
    ]
  },
  {
    id: "vn-16",
    code: "VNTX016",
    title: "Tuy Hòa - Phú Yên: Hoa Vàng Trên Cỏ Xanh 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/hero_bg_danang.png",
    departureDate: "16/06/2026",
    time: "06:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 4490000,
    price: 3590000,
    discount: "900k",
    seats: 15,
    rating: 8.9,
    reviews: 86,
    category: "Trong nước",
    description: "Khám phá xứ hoa vàng cỏ xanh Phú Yên hoang sơ: Gành Đá Đĩa độc nhất vô nhị, Bãi Xép ngập sắc xương rồng và mũi Điện đón bình minh đầu tiên.",
    features: ["Khách sạn sát sông Đà Rằng", "Ăn đặc sản mắt cá ngừ đại dương", "Check-in ngọn hải đăng Mũi Điện"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Tuy Hòa - Tháp Nhạn", desc: "Khởi hành đi Phú Yên. Chiều check-in Tháp Nhạn kiến trúc cổ sừng sững bên bờ sông Đà Rằng." },
      { day: "Ngày 2", title: "Gành Đá Đĩa Độc Đáo - Bãi Xép lãng mạn", desc: "Khám phá Gành Đá Đĩa kỳ quan thạch đá đen xếp lớp. Thăm Bãi Xép - nơi đóng phim Hoa vàng trên cỏ xanh tuyệt đẹp." },
      { day: "Ngày 3", title: "Mũi Điện cực Đông - TP.HCM", desc: "Đón bình minh sớm tại ngọn Hải đăng Mũi Điện - nơi đón ánh nắng đầu tiên trên đất liền Việt Nam. Khởi hành về TP.HCM." }
    ]
  },
  {
    id: "vn-17",
    code: "VNCB017",
    title: "Hải Phòng: Đảo Cát Bà - Vịnh Lan Hạ 2N1Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/destinations/ha-long.png",
    departureDate: "20/06/2026",
    time: "07:30",
    duration: "2 ngày 1 đêm",
    oldPrice: 2590000,
    price: 2090000,
    discount: "500k",
    seats: 20,
    rating: 8.8,
    reviews: 104,
    category: "Trong nước",
    description: "Khám phá đảo ngọc Cát Bà hoang sơ xanh mướt, chèo thuyền kayak khám phá Vịnh Lan Hạ thơ mộng và thăm đảo khỉ tự nhiên.",
    features: ["Vé phà khứ hồi ra đảo", "Tắm biển Cát Cò 1, 2, 3", "Du thuyền Lan Hạ"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Hải Phòng - Cát Bà", desc: "Khởi hành từ Hà Nội đi Cát Bà qua cầu Tân Vũ vượt biển. Chiều tắm biển tại cụm bãi tắm Cát Cò trong xanh." },
      { day: "Ngày 2", title: "Du thuyền Vịnh Lan Hạ - Hà Nội", desc: "Đi thuyền tham quan Vịnh Lan Hạ thơ mộng ngắm làng chài cổ Cái Bèo, chèo kayak qua hang Luồn. Chiều về Hà Nội." }
    ]
  },
  {
    id: "vn-18",
    code: "VNYB018",
    title: "Mù Cang Chải - Ruộng Bậc Thang Vàng Ruộm 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/destinations/sapa.png",
    departureDate: "25/09/2026",
    time: "06:30",
    duration: "3 ngày 2 đêm",
    oldPrice: 3190000,
    price: 2490000,
    discount: "700k",
    seats: 16,
    rating: 9.4,
    reviews: 82,
    category: "Trong nước",
    description: "Ngắm mùa vàng Mù Cang Chải: Chiêm ngưỡng ruộng bậc thang đèo Khau Phạ, thung lũng Lìm Mông chín vàng rực rỡ.",
    features: ["Xe đưa đón Hà Nội", "Khách sạn trung tâm thị trấn", "Giao lưu văn nghệ dân tộc Thái"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Tú Lệ - Mù Cang Chải", desc: "Khởi hành đi Yên Bái, dừng chân thưởng thức xôi nếp Tú Lệ nổi tiếng. Nhận phòng khách sạn." },
      { day: "Ngày 2", title: "Đèo Khau Phạ - Ruộng bậc thang La Pán Tẩn", desc: "Chinh phục đèo Khau Phạ - tứ đại đỉnh đèo. Chiều ngắm ruộng bậc thang móng ngựa tại La Pán Tẩn mùa lúa chín." },
      { day: "Ngày 3", title: "Bản Lìm Mông - Hà Nội", desc: "Đón bình minh tại thung lũng Cao Phạ bản Lìm Mông, ngắm dù lượn bay trên sóng vàng lúa chín. Trở về Hà Nội." }
    ]
  },
  {
    id: "vn-19",
    code: "VNDB019",
    title: "Điện Biên Phủ - Hào Hùng Lịch Sử Tây Bắc 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/destinations/sapa.png",
    departureDate: "07/05/2026",
    time: "06:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 4390000,
    price: 3590000,
    discount: "800k",
    seats: 12,
    rating: 9.2,
    reviews: 64,
    category: "Trong nước",
    description: "Hành trình tìm lại dấu ấn lịch sử hào hùng: Đồi A1, Hầm De Castries và tượng đài chiến thắng Điện Biên Phủ hào hùng.",
    features: ["Vé tham quan các di tích", "HDV thuyết minh lịch sử", "Thưởng thức ẩm thực Tây Bắc"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Sơn La - Điện Biên", desc: "Vượt đèo Pha Đin hùng vĩ lên Điện Biên. Dừng chân thăm nhà tù Sơn La lịch sử." },
      { day: "Ngày 2", title: "Di tích Điện Biên Phủ lừng lẫy", desc: "Thăm đồi A1, hầm chỉ huy De Castries, Bảo tàng Chiến thắng lịch sử Điện Biên Phủ với bức tranh Panorama khổng lồ." },
      { day: "Ngày 3", title: "Hồ Pa Khoang - Hà Nội", desc: "Thăm sở chỉ huy chiến dịch Mường Phăng, ngắm cảnh hồ Pa Khoang thơ mộng trước khi khởi hành về Hà Nội." }
    ]
  },
  {
    id: "vn-20",
    code: "VNTV020",
    title: "Trà Vinh - Khám Phá Văn Hóa Khmer Độc Đáo 2N1Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/hero_bg_sunset.png",
    departureDate: "20/06/2026",
    time: "07:00",
    duration: "2 ngày 1 đêm",
    oldPrice: 1890000,
    price: 1490000,
    discount: "400k",
    seats: 25,
    rating: 8.8,
    reviews: 58,
    category: "Trong nước",
    description: "Khám phá vùng đất xanh Trà Vinh với hàng trăm ngôi chùa cổ kính mang đậm kiến trúc Khmer Nam Bộ và ao Bà Om lịch sử.",
    features: ["Thăm các ngôi chùa Khmer cổ", "Thưởng thức bún nước lèo đặc sản", "Khách sạn trung tâm Trà Vinh"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Chùa Hang - Ao Bà Om", desc: "Khởi hành đi Trà Vinh. Chiều tham quan chùa Hang (chùa Kompông Chrây) độc đáo và danh thắng Ao Bà Om thanh tịnh." },
      { day: "Ngày 2", title: "Chùa Âng - Chùa Vàm Ray - TP.HCM", desc: "Chiêm bái Chùa Âng cổ kính và Chùa Vàm Ray thếp vàng lộng lẫy chuẩn Angkor. Khởi hành về lại TP.HCM." }
    ]
  },
  {
    id: "vn-21",
    code: "VNBT021",
    title: "Bến Tre - Xứ Dừa Thơ Mộng & Trải Nghiệm Dân Dã 1N",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/hero_bg_sunset.png",
    departureDate: "14/06/2026",
    time: "07:30",
    duration: "1 ngày",
    oldPrice: 990000,
    price: 790000,
    discount: "200k",
    seats: 40,
    rating: 8.9,
    reviews: 125,
    category: "Trong nước",
    description: "Trải nghiệm một ngày làm người dân miền Tây sông nước đích thực: đi xuồng ba lá, uống nước dừa xiêm, tự tay làm kẹo dừa thơm ngon.",
    features: ["Ăn trưa cá tai tượng chiên xù", "Tham quan lò kẹo dừa truyền thống", "Đi xe lôi dạo mát quanh làng"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Bến Tre - Sông nước miệt vườn", desc: "07h30 khởi hành đi Bến Tre. Đi thuyền trên sông Bến Tre xem lò gạch thủ công, cơ sở chế biến dừa. Chèo xuồng ba lá len lỏi trong rạch dừa nước rợp bóng mát. Trở về TP.HCM chiều tối." }
    ]
  },
  {
    id: "vn-22",
    code: "VNAG022",
    title: "An Giang: Miếu Bà Chúa Xứ - Rừng Tràm Trà Sư 2N1Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/hero_bg_sunset.png",
    departureDate: "27/06/2026",
    time: "06:00",
    duration: "2 ngày 1 đêm",
    oldPrice: 2290000,
    price: 1790000,
    discount: "500k",
    seats: 20,
    rating: 9.1,
    reviews: 167,
    category: "Trong nước",
    description: "Hành trình hành hương linh thiêng về vùng Thất Sơn: Viếng Miếu Bà Chúa Xứ núi Sam lừng danh, chèo xuồng ngắm bèo xanh phủ kín Rừng tràm Trà Sư.",
    features: ["Xuồng máy lướt rừng tràm Trà Sư", "Viếng Miếu Bà Chúa Xứ linh thiêng", "Lẩu mắm đặc sản Châu Đốc"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Châu Đốc - Miếu Bà Chúa Xứ", desc: "Khởi hành đi An Giang. Tối đến Châu Đốc, viếng Miếu Bà Chúa Xứ Núi Sam lừng danh cầu bình an tài lộc." },
      { day: "Ngày 2", title: "Rừng tràm Trà Sư - Thất Sơn - TP.HCM", desc: "Thăm rừng tràm Trà Sư hoang dã, đi xuồng chèo lướt trên thảm bèo xanh mát rượi. Khởi hành về TP.HCM." }
    ]
  },
  {
    id: "vn-23",
    code: "VNKG023",
    title: "Đảo Nam Du - Thiên Đường Hoang Sơ Biển Khơi 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/destinations/phu-quoc.png",
    departureDate: "19/06/2026",
    time: "05:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 3990000,
    price: 3190000,
    discount: "800k",
    seats: 14,
    rating: 9.0,
    reviews: 88,
    category: "Trong nước",
    description: "Đắm chìm trong làn nước biển trong vắt tại quần đảo Nam Du xinh đẹp: Check-in bãi Mến, hòn Dầu, thưởng thức nhum nướng mỡ hành tuyệt ngon.",
    features: ["Vé tàu cao tốc khứ hồi", "Cano tham quan quanh các đảo nhỏ", "Tiệc hải sản nướng ngon tuyệt"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Rạch Giá - Đảo Nam Du", desc: "Di chuyển đến Rạch Giá bằng xe giường nằm, đi tàu cao tốc ra đảo Nam Du. Chiều tắm biển Bãi Mến hoang sơ rợp bóng dừa." },
      { day: "Ngày 2", title: "Cano khám phá các hòn đảo hoang dã", desc: "Đi cano câu cá, lặn ngắm san hô tại hòn Dầu, hòn Hai Bờ Đập thơ mộng. Ăn tối tiệc BBQ hải sản nướng." },
      { day: "Ngày 3", title: "Hải đăng Nam Du - TP.HCM", desc: "Thăm ngọn hải đăng Nam Du ngắm nhìn toàn cảnh quần đảo hoang sơ tuyệt đẹp từ trên cao. Trở về đất liền và về TP.HCM." }
    ]
  },
  {
    id: "vn-24",
    code: "VNCM024",
    title: "Cà Mau - Check-in Đất Mũi Cực Nam Tổ Quốc 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/hero_bg_sunset.png",
    departureDate: "26/06/2026",
    time: "05:30",
    duration: "3 ngày 2 đêm",
    oldPrice: 4290000,
    price: 3490000,
    discount: "800k",
    seats: 18,
    rating: 9.2,
    reviews: 95,
    category: "Trong nước",
    description: "Hành trình linh thiêng chinh phục cột mốc tọa độ quốc gia GPS 0001 tại Đất Mũi Cà Mau, ngắm mặt trời mọc và lặn cùng một địa điểm cực Nam.",
    features: ["Cano len lỏi rừng ngập mặn", "Thưởng thức cua Cà Mau ngon tuyệt", "Khách sạn trung tâm Cà Mau"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Sóc Trăng - Bạc Liêu", desc: "Khởi hành đi Cà Mau. Dừng chân chiêm bái chùa Dơi Sóc Trăng, thăm Nhà Công tử Bạc Liêu hào hoa. Tối ngủ Cà Mau." },
      { day: "Ngày 2", title: "Chinh phục Đất Mũi Cà Mau cực Nam", desc: "Đi vỏ lãi xuyên rừng ngập mặn Năm Căn ra Đất Mũi. Chụp ảnh cột mốc GPS 0001 biểu tượng con tàu vươn khơi." },
      { day: "Ngày 3", title: "Cà Mau - Bạc Liêu điện gió - TP.HCM", desc: "Check-in cánh đồng điện gió Bạc Liêu khổng lồ ven biển cực đẹp. Khởi hành về lại TP.HCM." }
    ]
  },
  {
    id: "vn-25",
    code: "VNDN025",
    title: "Đồng Nai: Trải Nghiệm Sinh Thái Suối Mơ 1N",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/hero_bg.png",
    departureDate: "13/06/2026",
    time: "07:00",
    duration: "1 ngày",
    oldPrice: 850000,
    price: 690000,
    discount: "160k",
    seats: 35,
    rating: 8.5,
    reviews: 144,
    category: "Trong nước",
    description: "Trốn khói bụi thành phố cuối tuần tại Công viên Suối Mơ xanh mát: Tắm hồ nước ngọt tự nhiên lớn nhất miền Nam.",
    features: ["Vé cổng Suối Mơ", "Xe du lịch đời mới", "Ăn trưa buffet phong phú"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Công viên Suối Mơ cuối tuần", desc: "Khởi hành sớm đi Đồng Nai. Tự do tắm suối mát lạnh ngắm từng đàn cá bơi lội dưới làn nước trong suốt, tham gia các trò chơi phao nổi trên nước sôi động. Chiều tối khởi hành về lại TP.HCM." }
    ]
  },
  {
    id: "vn-26",
    code: "VNVT026",
    title: "Vũng Tàu - Biển Xanh Nắng Vàng Cuối Tuần 2N1Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/promo_japan.png",
    departureDate: "20/06/2026",
    time: "08:00",
    duration: "2 ngày 1 đêm",
    oldPrice: 1790000,
    price: 1390000,
    discount: "400k",
    seats: 30,
    rating: 8.7,
    reviews: 240,
    category: "Trong nước",
    description: "Tận hưởng kỳ nghỉ ngắn ngày tại thành phố biển Vũng Tàu xinh đẹp: Thăm Tượng Chúa Kito Vua, ngọn Hải đăng cổ kính và tắm biển thoải mái.",
    features: ["Khách sạn sát biển Bãi Sau", "Thưởng thức bánh khọt nổi tiếng", "Cáp treo Hồ Mây mạo hiểm"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Vũng Tàu - Tượng Chúa Kito", desc: "Khởi hành đi Vũng Tàu. Chinh phục Tượng Chúa Kito dang tay trên đỉnh Tao Phùng ngắm biển rộng lớn. Tự do tắm biển Bãi Sau." },
      { day: "Ngày 2", title: "Bạch Dinh - Hải đăng Vũng Tàu - TP.HCM", desc: "Khám phá biệt điện Bạch Dinh kiến trúc Pháp, ngọn Hải đăng cổ ngắm toàn cảnh thành phố biển cực đẹp. Về lại TP.HCM." }
    ]
  },
  {
    id: "vn-27",
    code: "VNBS027",
    title: "Đảo Phú Quý - Kỳ Quan Hoang Sơ Ven Biển 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/destinations/phu-quoc.png",
    departureDate: "12/06/2026",
    time: "04:30",
    duration: "3 ngày 2 đêm",
    oldPrice: 4890000,
    price: 3890000,
    discount: "1tr",
    seats: 12,
    rating: 9.3,
    reviews: 94,
    category: "Trong nước",
    description: "Đột kích đảo Phú Quý xinh đẹp và hoang sơ: Check-in Dốc Phượt ngoạn mục, vịnh Triều Dương trong xanh cát mịn, chiêm ngưỡng núi Cao Cát kỳ bí.",
    features: ["Vé tàu cao tốc khứ hồi VIP", "Xe máy dạo quanh đảo tự do", "Tour cano ngắm san hô Bãi Nhỏ"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Phan Thiết - Đảo Phú Quý", desc: "Di chuyển bằng xe limousine ra Phan Thiết, đi tàu cao tốc lướt sóng ra đảo Phú Quý. Check-in ngắm hoàng hôn tại Vịnh Triều Dương xanh ngắt." },
      { day: "Ngày 2", title: "Khám phá núi Cao Cát - Dốc Phượt hoang sơ", desc: "Chinh phục núi Cao Cát ngắm vách đá địa chất độc đáo. Check-in Dốc Phượt ven biển cực lãng mạn. Đi cano tắm hồ vô cực tự nhiên." },
      { day: "Ngày 3", title: "Gành Hang - Cột mốc chủ quyền - TP.HCM", desc: "Thăm khe nước Gành Hang trong veo và cột mốc chủ quyền thiêng liêng. Đi tàu cao tốc trở về đất liền và về TP.HCM." }
    ]
  },
  {
    id: "vn-28",
    code: "VNDN028",
    title: "Đà Nẵng - Ngũ Hành Sơn - Sơn Trà 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/destinations/da-nang.png",
    departureDate: "24/06/2026",
    time: "07:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 4790000,
    price: 3690000,
    discount: "1.1tr",
    seats: 20,
    rating: 9.1,
    reviews: 165,
    category: "Trong nước",
    description: "Hành trình khám phá thành phố đáng sống bậc nhất Việt Nam: Viếng chùa Linh Ứng Sơn Trà linh thiêng, khám phá động Huyền Không kỳ ảo.",
    features: ["Vé máy bay khứ hồi", "Khách sạn 4 sao biển Mỹ Khê", "Bữa tối hải sản tươi ngon"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Đà Nẵng - Bán Đảo Sơn Trà", desc: "Bay tới Đà Nẵng. Viếng Chùa Linh Ứng Sơn Trà ngắm Tượng Phật Bà Quan Âm cao 67m ngự tọa hướng biển lớn." },
      { day: "Ngày 2", title: "Ngũ Hành Sơn - Phố cổ Hội An", desc: "Tham quan danh thắng Ngũ Hành Sơn, lội các hang động kỳ bí. Chiều tối dạo bước lãng mạn trong phố cổ Hội An rực rỡ đèn lồng." },
      { day: "Ngày 3", title: "Chợ Hàn sầm uất - Hà Nội", desc: "Tự do tắm biển Mỹ Khê sáng sớm. Mua sắm đặc sản chả bò Đà Nẵng tại Chợ Hàn sầm uất. Bay về lại Hà Nội." }
    ]
  },
  {
    id: "vn-29",
    code: "VNHA029",
    title: "Hội An Hoài Cổ - Thánh Địa Mỹ Sơn 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/destinations/da-nang.png",
    departureDate: "17/06/2026",
    time: "08:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 4590000,
    price: 3490000,
    discount: "1.1tr",
    seats: 15,
    rating: 9.0,
    reviews: 112,
    category: "Trong nước",
    description: "Trải nghiệm không gian hoài niệm xưa cũ tại Phố cổ Hội An thanh bình và chiêm ngưỡng thánh địa cổ Mỹ Sơn huyền bí của vương quốc Champa cổ.",
    features: ["Thuyền thả đèn sông Hoài", "Vé xem biểu diễn nghệ thuật", "Khách sạn phong cách Indochine"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Đà Nẵng - Hội An", desc: "Bay đến Đà Nẵng, xe đưa về Phố cổ Hội An. Tối đi thuyền thả hoa đăng ước nguyện trên dòng sông Hoài thơ mộng lung linh." },
      { day: "Ngày 2", title: "Thần điện Mỹ Sơn kỳ bí", desc: "Tham quan khu thánh địa cổ Mỹ Sơn chìm giữa núi rừng hùng vĩ, chiêm ngưỡng điệu múa Apsara quyến rũ độc đáo." },
      { day: "Ngày 3", title: "Làng rau Trà Quế - TP.HCM", desc: "Trải nghiệm một ngày làm nông dân trồng rau sạch tại làng Trà Quế yên bình. Xe đưa ra sân bay bay về TP.HCM." }
    ]
  },
  {
    id: "vn-30",
    code: "VNQB030",
    title: "Phong Nha: Sông Chày Hang Tối - Động Thiên Đường 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/hero_bg_sunset.png",
    departureDate: "26/06/2026",
    time: "07:30",
    duration: "3 ngày 2 đêm",
    oldPrice: 4890000,
    price: 3890000,
    discount: "1tr",
    seats: 12,
    rating: 9.3,
    reviews: 58,
    category: "Trong nước",
    description: "Trải nghiệm mạo hiểm tuyệt vời tại Phong Nha Kẻ Bàng: Đu dây zipline sông Chày xanh ngọc bích, tắm bùn tự nhiên tại Hang Tối độc đáo.",
    features: ["Trọn gói đu zipline - tắm bùn", "Cano lướt sông Chày mát rượi", "Resort sinh thái cao cấp"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Quảng Bình - Biển Nhật Lệ", desc: "Khởi hành đi Quảng Bình. Nhận phòng và thoải mái tắm biển Nhật Lệ hoang sơ sóng vỗ êm đềm." },
      { day: "Ngày 2", title: "Zipline Sông Chày - Thám hiểm Hang Tối", desc: "Đu dây zipline trên sông Chày trong xanh, thám hiểm Hang Tối hoang sơ và trải nghiệm tắm bùn khoáng mát lạnh trong hang sâu." },
      { day: "Ngày 3", title: "Động Thiên Đường kỳ tráng - Hà Nội", desc: "Khám phá Động Thiên Đường tráng lệ như một mê cung nhũ đá lộng lẫy dưới lòng đất sâu. Khởi hành về lại Hà Nội." }
    ]
  },
  {
    id: "vn-31",
    code: "VNLB031",
    title: "Lạng Sơn: Đỉnh Mẫu Sơn - Kỳ Lừa Sầm Uất 2N1Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/destinations/sapa.png",
    departureDate: "20/06/2026",
    time: "07:30",
    duration: "2 ngày 1 đêm",
    oldPrice: 2190000,
    price: 1690000,
    discount: "500k",
    seats: 22,
    rating: 8.7,
    reviews: 79,
    category: "Trong nước",
    description: "Săn mây mát rượi trên đỉnh núi Mẫu Sơn quanh năm sương mù gió thổi, thăm động Tam Thanh linh thiêng và mua sắm tại chợ Tân Thanh biên giới.",
    features: ["Thưởng thức lợn quay lá mác mật", "Khách sạn trung tâm xứ Lạng", "HDV nhiệt tình chu đáo"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Đỉnh Mẫu Sơn gió ngàn", desc: "Khởi hành từ Hà Nội lên Mẫu Sơn ở độ cao hơn 1500m. Ngắm biệt thự cổ kiến trúc Pháp chìm trong mây mờ se lạnh cực đẹp." },
      { day: "Ngày 2", title: "Động Tam Thanh - Chợ Kỳ Lừa - Hà Nội", desc: "Thăm động Tam Thanh chùa cổ trang nghiêm, check-in ải Chi Lăng anh hùng. Mua sắm biên giới trước khi khởi hành về Hà Nội." }
    ]
  },
  {
    id: "vn-32",
    code: "VNLC032",
    title: "Lào Cai: Chợ Phiên Bắc Hà Rực Rỡ Sắc Màu 2N1Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/destinations/sapa.png",
    departureDate: "13/06/2026",
    time: "06:30",
    duration: "2 ngày 1 đêm",
    oldPrice: 2490000,
    price: 1990000,
    discount: "500k",
    seats: 18,
    rating: 8.9,
    reviews: 62,
    category: "Trong nước",
    description: "Khám phá chợ phiên Bắc Hà lớn nhất vùng cao Tây Bắc rực rỡ sắc màu, chiêm ngưỡng dinh thự Hoàng A Tưởng kiến trúc độc lạ cổ kính.",
    features: ["Dinh thự cổ Hoàng A Tưởng", "Thưởng thức thắng cố và rượu ngô", "Tự do dạo chơi bản Phố thanh bình"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Bắc Hà - Bản Phố", desc: "Di chuyển từ Hà Nội lên thung lũng trắng Bắc Hà. Chiều dạo bản Phố của người Mông hoa tìm hiểu cách ủ rượu ngô Bắc Hà ngọt lịm." },
      { day: "Ngày 2", title: "Chợ Phiên Bắc Hà rực rỡ sắc màu - Hà Nội", desc: "Khám phá không gian rực rỡ sắc váy áo tại chợ phiên Bắc Hà tổ chức vào Chủ Nhật hàng tuần. Khởi hành về lại Hà Nội." }
    ]
  },
  {
    id: "vn-33",
    code: "VNTG033",
    title: "Tiền Giang: Chùa Vĩnh Tràng - Cồn Phụng 1N",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/hero_bg_sunset.png",
    departureDate: "21/06/2026",
    time: "07:30",
    duration: "1 ngày",
    oldPrice: 990000,
    price: 750000,
    discount: "240k",
    seats: 45,
    rating: 8.6,
    reviews: 130,
    category: "Trong nước",
    description: "Chiêm bái Chùa Vĩnh Tràng - ngôi chùa cổ đẹp nhất Tiền Giang kết hợp Á - Âu hài hòa, đi thuyền thăm di tích Cồn Phụng lịch sử.",
    features: ["Ăn đặc sản hủ tiếu Mỹ Tho", "Thuyền lớn tham quan cồn sông", "Ghé vườn nuôi ong lấy mật ngọt"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Tiền Giang - Thăm cồn sông Tiền", desc: "07h30 khởi hành đi Mỹ Tho. Chiêm bái chùa Vĩnh Tràng trang nghiêm lộng lẫy. Đi thuyền rồng dạo cồn Lân cồn Phụng thưởng thức mật ong nóng, trái cây bốn mùa ngọt mát. Về lại Sài Gòn chiều tối." }
    ]
  },
  {
    id: "vn-34",
    code: "VNBK034",
    title: "Bắc Kạn: Hồ Ba Bể - Động Puông Thơ Mộng 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/destinations/sapa.png",
    departureDate: "19/06/2026",
    time: "06:30",
    duration: "3 ngày 2 đêm",
    oldPrice: 3490000,
    price: 2790000,
    discount: "700k",
    seats: 14,
    rating: 9.0,
    reviews: 65,
    category: "Trong nước",
    description: "Thả hồn trong cảnh sắc thiên nhiên hoang sơ yên ả của Hồ Ba Bể - viên ngọc xanh giữa đại ngàn Đông Bắc hùng vĩ rộng lớn.",
    features: ["Thuyền máy dạo quanh hồ nước ngọt", "Ngủ homestay nhà sàn gỗ người Tày", "Thưởng thức cá hồ nướng thơm phức"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Động Puông - Bản Pác Ngòi", desc: "Khởi hành đi Bắc Kạn. Đi thuyền máy dọc sông Năng, ngắm Động Puông kỳ vĩ xuyên núi. Nhận phòng homestay nhà sàn bản Pác Ngòi." },
      { day: "Ngày 2", title: "Hồ Ba Bể - Đảo Bà Góa - Ao Tiên", desc: "Dạo hồ nước ngọt khổng lồ xanh biếc mây trời lồng lộng, thăm Ao Tiên mộng ảo giữa rừng xanh, đảo Bà Góa thần thoại." },
      { day: "Ngày 3", title: "Đền An Mạ - Chợ Bản - Hà Nội", desc: "Thăm đền cổ An Mạ giữa lòng hồ linh thiêng mộc mạc trước khi đón xe khởi hành trở lại Hà Nội." }
    ]
  },
  {
    id: "vn-35",
    code: "VNTG035",
    title: "Tuyên Quang: Na Hang - Lâm Bình Sơn Thủy 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hà Nội",
    image: "/destinations/sapa.png",
    departureDate: "12/06/2026",
    time: "06:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 3290000,
    price: 2590000,
    discount: "700k",
    seats: 15,
    rating: 9.1,
    reviews: 54,
    category: "Trong nước",
    description: "Hành trình khám phá Na Hang - nơi ngọn núi gặp dòng sông xanh ngọc, chiêm ngưỡng núi đá Cọc Vài Phạ sừng sững kỳ tráng độc đáo.",
    features: ["Thuyền dạo hồ Na Hang thơ mộng", "Thăm thác Khuổi Nhi massage cá tự nhiên", "Tắm thác nước ngọt mát lạnh"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội - Na Hang - Khu di tích Lâm Bình", desc: "Khởi hành từ Hà Nội đi Tuyên Quang. Nhận phòng homestay gỗ truyền thống ấm cúng tại Lâm Bình." },
      { day: "Ngày 2", title: "Lòng hồ Na Hang - Cọc Vài Phạ hùng vĩ", desc: "Đi thuyền dạo hồ ngắm 99 ngọn núi tựa Hạ Long trên cạn, check-in Cọc Vài Phạ kỳ vĩ. Đi bộ tắm thác và trải nghiệm massage cá tự nhiên tại thác Khuổi Nhi." },
      { day: "Ngày 3", title: "Đền Pác Tạ - Hà Nội", desc: "Chiêm bái Đền Pác Tạ thiêng liêng cổ kính sát hồ xanh biếc trước khi lên xe trở về lại Hà Nội." }
    ]
  },
  {
    id: "vn-36",
    code: "VNĐN036",
    title: "Đắk Nông: Hồ Tà Đùng - Hạ Long Trên Tây Nguyên 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/destinations/da-lat.png",
    departureDate: "05/06/2026",
    time: "06:30",
    duration: "3 ngày 2 đêm",
    oldPrice: 3590000,
    price: 2890000,
    discount: "700k",
    seats: 20,
    rating: 9.2,
    reviews: 80,
    category: "Trong nước",
    description: "Đắm chìm trong vẻ đẹp choáng ngợp của Hồ Tà Đùng - kiệt tác tự nhiên với hàng chục đảo nhỏ nổi lên xanh rì giữa hồ nước bao la vô bờ.",
    features: ["Thuyền dạo hồ Tà Đùng xanh mát", "Check-in cầu kính vô cực ngắm cảnh", "Ăn gà nướng cơm lam thơm bùi"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Đắk Nông - Hồ Tà Đùng", desc: "Khởi hành đi Tây Nguyên. Nhận phòng homestay sát hồ Tà Đùng view toàn cảnh đảo nhấp nhô tuyệt hảo." },
      { day: "Ngày 2", title: "Đi thuyền lòng hồ Tà Đùng hoang dã", desc: "Đi thuyền lội qua các đảo nhỏ ngắm mây trời hồ nước bao la hoang dã. Check-in ngắm cảnh từ cầu kính vô cực ngoạn mục." },
      { day: "Ngày 3", title: "Thác Gia Long hoang sơ - TP.HCM", desc: "Thăm thác Gia Long hùng vĩ giữa rừng nguyên sinh Tây Nguyên róc rách nước chảy trước khi về lại Sài Gòn." }
    ]
  },
  {
    id: "vn-37",
    code: "VNDL037",
    title: "Đắk Lắk: Buôn Ma Thuột - Thác Dray Nur - Bản Đôn 3N2Đ",
    destination: "Việt Nam",
    departurePoint: "Hồ Chí Minh",
    image: "/destinations/da-lat.png",
    departureDate: "19/06/2026",
    time: "06:00",
    duration: "3 ngày 2 đêm",
    oldPrice: 3790000,
    price: 2990000,
    discount: "800k",
    seats: 18,
    rating: 9.0,
    reviews: 104,
    category: "Trong nước",
    description: "Trải nghiệm văn hóa đại ngàn Tây Nguyên hùng vĩ: Đi cầu treo qua sông Serepok tại Bản Đôn, ngắm thác Dray Nur đổ bọt tuyết trắng xóa.",
    features: ["Thử hương vị cà phê Trung Nguyên bản gốc", "Đi cầu treo Bản Đôn gỗ cheo leo", "Giao lưu lửa trại cồng chiêng"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM - Buôn Ma Thuột - Chùa Sắc Tứ Khải Đoan", desc: "Khởi hành lên Buôn Ma Thuột. Viếng Chùa cổ Khải Đoan kiến trúc nhà sàn gỗ kết hợp cổ lầu hoàng cung lộng lẫy." },
      { day: "Ngày 2", title: "Khu du lịch Bản Đôn - Thác Dray Nur", desc: "Thăm Bản Đôn, đi dạo trên những nhịp cầu treo tre cheo leo qua dòng sông Serepok cuồn cuộn. Chiều ngắm thác Dray Nur hùng vĩ bọt tung trắng xóa đại ngàn." },
      { day: "Ngày 3", title: "Làng cà phê Trung Nguyên - TP.HCM", desc: "Thưởng thức cà phê Tây Nguyên thơm lừng tại Làng cà phê Trung Nguyên đậm đà khó quên trước khi về TP.HCM." }
    ]
  }
];

export const hotels: Hotel[] = [
  {
    id: "ht-01",
    name: "Vinpearl Luxury Nha Trang",
    location: "Nha Trang, Khánh Hòa",
    rating: 9.2,
    stars: 5,
    price: 3500000,
    oldPrice: 4200000,
    image: "/promo_japan.png",
    gallery: ["/promo_japan.png", "/promo_europe.png", "/hero_bg.png"],
    description: "Vinpearl Luxury Nha Trang tọa lạc tại vị trí riêng biệt trên đảo Hòn Tre, mang đến không gian nghỉ dưỡng sang trọng bậc nhất với các biệt thự có hồ bơi riêng và tầm nhìn tuyệt đẹp ra biển xanh.",
    amenities: [
      { name: "Hồ bơi vô cực", icon: "🏊" },
      { name: "Bãi biển riêng", icon: "🏖️" },
      { name: "Spa cao cấp", icon: "💆" },
      { name: "Wifi miễn phí", icon: "📶" },
      { name: "Nhà hàng 5 sao", icon: "🍽️" }
    ],
    rooms: [
      { name: "Biệt thự trước biển", price: 5500000, capacity: "2 Người lớn, 2 Trẻ em", amenities: ["Hồ bơi riêng", "Bồn tắm nằm", "View biển"] },
      { name: "Phòng Premiere Deluxe", price: 3500000, capacity: "2 Người lớn", amenities: ["Điều hòa", "Minibar", "Ban công"] }
    ],
    features: ["Hồ bơi vô cực", "Bãi biển riêng", "Spa cao cấp"],
    reviews: 1240
  },
  {
    id: "ht-02",
    name: "InterContinental Danang Sun Peninsula",
    location: "Sơn Trà, Đà Nẵng",
    rating: 9.5,
    stars: 5,
    price: 8900000,
    oldPrice: 10500000,
    image: "/promo_europe.png",
    gallery: ["/promo_europe.png", "/hero_bg.png", "/promo_japan.png"],
    description: "Nằm nép mình bên bán đảo Sơn Trà thơ mộng, khu nghỉ dưỡng là kiệt tác kiến trúc của Bill Bensley, nơi hòa quyện giữa văn hóa Việt truyền thống và sự sang trọng hiện đại.",
    amenities: [
      { name: "Nhà hàng La Maison 1888", icon: "🥂" },
      { name: "Vị trí đỉnh núi", icon: "⛰️" },
      { name: "Bể bơi vô cực", icon: "🏊" },
      { name: "Cáp treo riêng", icon: "🚠" }
    ],
    rooms: [
      { name: "Club InterContinental Room", price: 12500000, capacity: "2 Người lớn", amenities: ["Club Lounge access", "Quản gia riêng"] },
      { name: "Son Tra Terrace Suite", price: 8900000, capacity: "2 Người lớn", amenities: ["Sân hiên rộng", "Hồ bơi riêng"] }
    ],
    features: ["Vị trí đỉnh núi", "Nhà hàng La Maison 1888", "Bể bơi vô cực"],
    reviews: 890
  },
  {
    id: "ht-03",
    name: "Flamingo Đại Lải Resort",
    location: "Vĩnh Phúc",
    rating: 8.8,
    stars: 5,
    price: 2100000,
    oldPrice: 2800000,
    image: "/hero_bg.png",
    gallery: ["/hero_bg.png", "/promo_japan.png", "/promo_europe.png"],
    description: "Khu du lịch sinh thái đẳng cấp quốc tế với kiến trúc 'Tòa nhà xanh nhất hành tinh', mang đến không gian sống hài hòa với thiên nhiên.",
    amenities: [
      { name: "Hồ nước lớn", icon: "🌊" },
      { name: "Khu vui chơi trẻ em", icon: "🎠" },
      { name: "Golf", icon: "⛳" }
    ],
    rooms: [
      { name: "Forest In The Sky", price: 2100000, capacity: "2 Người lớn", amenities: ["Ban công xanh", "Bếp nhỏ"] }
    ],
    features: ["Hồ nước lớn", "Khu vui chơi trẻ em", "Golf"],
    reviews: 460
  },
  {
    id: "ht-04",
    name: "Mia Resort Mũi Né",
    location: "Mũi Né, Bình Thuận",
    rating: 8.6,
    stars: 4,
    price: 1800000,
    oldPrice: 2300000,
    image: "/promo_japan.png",
    gallery: ["/promo_japan.png", "/promo_europe.png", "/hero_bg.png"],
    description: "Mia Resort Mũi Né là lựa chọn hoàn hảo cho những ai tìm kiếm sự yên bình và phong cách sống tinh tế bên bờ biển Phan Thiết.",
    amenities: [
      { name: "Resort bãi biển", icon: "🏖️" },
      { name: "Lướt ván diều", icon: "🏄" },
      { name: "Ẩm thực Pháp", icon: "🥐" }
    ],
    rooms: [
      { name: "Sapa House", price: 1800000, capacity: "2 Người lớn", amenities: ["Đồ gỗ thủ công", "Wifi"] }
    ],
    features: ["Resort bãi biển", "Lướt ván diều", "Ẩm thực Pháp"],
    reviews: 720
  },
  {
    id: "ht-05",
    name: "Sofitel Legend Metropole Hanoi",
    location: "Hoàn Kiếm, Hà Nội",
    rating: 9.6,
    stars: 5,
    price: 6500000,
    oldPrice: 7800000,
    image: "/hero_bg.png",
    gallery: ["/hero_bg.png", "/promo_japan.png"],
    description: "Khách sạn cổ kính mang đậm dấu ấn lịch sử kiến trúc Pháp thế kỷ 20, nằm ngay tại trung tâm thủ đô Hà Nội gần Hồ Gươm.",
    amenities: [
      { name: "Hồ bơi nước nóng", icon: "🏊" },
      { name: "Spa kiểu Pháp", icon: "💆" },
      { name: "Quán bar sân vườn", icon: "🍸" }
    ],
    rooms: [
      { name: "Luxury Room", price: 6500000, capacity: "2 Người lớn", amenities: ["Bồn tắm nằm", "Máy pha cà phê"] }
    ],
    features: ["Kiến trúc cổ điển", "Hồ bơi nước nóng", "Vị trí trung tâm"],
    reviews: 2150
  },
  {
    id: "ht-06",
    name: "Hotel de la Coupole - Mgallery",
    location: "Sa Pa, Lào Cai",
    rating: 9.4,
    stars: 5,
    price: 3200000,
    oldPrice: 3800000,
    image: "/destinations/sapa.png",
    gallery: ["/destinations/sapa.png", "/hero_bg.png"],
    description: "Sự kết hợp độc đáo giữa thời trang Pháp cổ điển và văn hóa dân tộc thiểu số Sa Pa rực rỡ sắc màu vẽ nên một tuyệt tác.",
    amenities: [
      { name: "Hồ bơi nước ấm", icon: "🏊" },
      { name: "Nhà hàng chuẩn Âu", icon: "🍽️" },
      { name: "Cáp treo trực tiếp", icon: "🚠" }
    ],
    rooms: [
      { name: "Classic Room", price: 3200000, capacity: "2 Người lớn", amenities: ["View núi Sapa", "Điều hòa sưởi"] }
    ],
    features: ["Cầu cáp treo Fansipan", "Bể bơi nước ấm", "Kiến trúc nghệ thuật"],
    reviews: 1460
  },
  {
    id: "ht-07",
    name: "Paradise Elegance Cruise Halong",
    location: "Vịnh Hạ Long, Quảng Ninh",
    rating: 9.3,
    stars: 5,
    price: 5800000,
    oldPrice: 6900000,
    image: "/destinations/ha-long.png",
    gallery: ["/destinations/ha-long.png", "/hero_bg.png"],
    description: "Trải nghiệm du thuyền sang trọng 5 sao trôi trên kỳ quan thiên nhiên thế giới Vịnh Hạ Long thơ mộng quyến rũ.",
    amenities: [
      { name: "Boong tàu ngắm cảnh", icon: "🚢" },
      { name: "Bể sục jacuzzi", icon: "🛁" },
      { name: "Nhà hàng ẩm thực hải sản", icon: "🦞" }
    ],
    rooms: [
      { name: "Deluxe Balcony Cabin", price: 5800000, capacity: "2 Người lớn", amenities: ["Ban công riêng", "View vịnh 100%"] }
    ],
    features: ["Ngủ đêm trên vịnh", "Chèo thuyền kayak", "Show trình diễn nấu ăn"],
    reviews: 620
  },
  {
    id: "ht-08",
    name: "Emeralda Resort Ninh Binh",
    location: "Gia Viễn, Ninh Bình",
    rating: 8.9,
    stars: 5,
    price: 2400000,
    oldPrice: 3000000,
    image: "/hero_bg.png",
    gallery: ["/hero_bg.png", "/promo_japan.png"],
    description: "Tái hiện không gian làng quê Bắc Bộ xưa thanh bình mộc mạc với ngói đỏ, gạch nung bên cạnh thiên nhiên hoang dã Ninh Bình.",
    amenities: [
      { name: "Sân golf mini", icon: "⛳" },
      { name: "Resort biệt lập sinh thái", icon: "🌳" },
      { name: "Hồ bơi trong nhà và ngoài trời", icon: "🏊" }
    ],
    rooms: [
      { name: "Superior Room", price: 2400000, capacity: "2 Người lớn", amenities: ["Sân hiên vườn", "Wifi tốc độ cao"] }
    ],
    features: ["Resort sinh thái biệt lập", "Phong cách Bắc Bộ cổ", "Hồ bơi đôi độc đáo"],
    reviews: 840
  },
  {
    id: "ht-09",
    name: "Banyan Tree Lang Co",
    location: "Lăng Cô, Thừa Thiên Huế",
    rating: 9.6,
    stars: 5,
    price: 9500000,
    oldPrice: 11500000,
    image: "/hero_bg_danang.png",
    gallery: ["/hero_bg_danang.png", "/promo_europe.png"],
    description: "Khu nghỉ dưỡng biệt thự có hồ bơi riêng biệt nằm nép mình bên vịnh Lăng Cô xanh ngắt tuyệt đẹp thơ mộng bậc nhất miền Trung.",
    amenities: [
      { name: "Biệt thự hồ bơi riêng biệt", icon: "🏊" },
      { name: "Sân golf 18 hố chuẩn quốc tế", icon: "🏌️" },
      { name: "Bãi biển biệt lập hoang sơ", icon: "🏖️" }
    ],
    rooms: [
      { name: "Pool Villa", price: 9500000, capacity: "2 Người lớn", amenities: ["Hồ bơi riêng", "Quản gia riêng"] }
    ],
    features: ["Hồ bơi riêng tư", "Sân golf 18 hố", "Biệt thự biệt lập"],
    reviews: 430
  },
  {
    id: "ht-10",
    name: "Four Seasons Resort The Nam Hai",
    location: "Điện Bàn, Quảng Nam",
    rating: 9.7,
    stars: 5,
    price: 15000000,
    oldPrice: 18000000,
    image: "/destinations/da-nang.png",
    gallery: ["/destinations/da-nang.png", "/promo_europe.png"],
    description: "Được mệnh danh là resort bãi biển sang trọng bậc nhất thế giới tọa lạc ngay ven bờ biển miền Trung thanh bình hoang sơ.",
    amenities: [
      { name: "Bể bơi vô cực bên bờ biển", icon: "🏊" },
      { name: "Lớp học thiền & yoga bay", icon: "🧘" },
      { name: "Nhà hàng 5 sao chuẩn sao Michelin", icon: "🍽️" }
    ],
    rooms: [
      { name: "One Bedroom Villa", price: 15000000, capacity: "2 Người lớn", amenities: ["Vòi sen ngoài trời", "Hệ thống âm thanh hi-end"] }
    ],
    features: ["Bể bơi vô cực ba tầng", "Nằm cạnh bãi biển riêng", "Thiền định trên hồ sen"],
    reviews: 580
  },
  {
    id: "ht-11",
    name: "Six Senses Ninh Van Bay",
    location: "Ninh Hòa, Khánh Hòa",
    rating: 9.8,
    stars: 5,
    price: 18000000,
    oldPrice: 22000000,
    image: "/promo_japan.png",
    gallery: ["/promo_japan.png", "/hero_bg.png"],
    description: "Trốn vào ốc đảo thiên đường biệt lập bên vịnh Ninh Vân hoang dã thơ mộng, nơi chỉ có biển xanh cát trắng nắng vàng rực rỡ.",
    amenities: [
      { name: "Biệt thự trên ghềnh đá", icon: "🧗" },
      { name: "Rạp chiếu phim bãi biển đêm", icon: "🎬" },
      { name: "Trải nghiệm leo núi tự nhiên", icon: "⛰️" }
    ],
    rooms: [
      { name: "Hilltop Pool Villa", price: 18000000, capacity: "2 Người lớn", amenities: ["Hồ bơi tràn viền đá tự nhiên", "Hầm rượu mini"] }
    ],
    features: ["Độc bản biệt thự ghềnh đá", "Sản phẩm thuần hữu cơ tự nhiên", "Cano đưa đón riêng biệt"],
    reviews: 340
  },
  {
    id: "ht-12",
    name: "Ana Mandara Villas Dalat Resort & Spa",
    location: "Đà Lạt, Lâm Đồng",
    rating: 9.0,
    stars: 5,
    price: 2600000,
    oldPrice: 3200000,
    image: "/destinations/da-lat.png",
    gallery: ["/destinations/da-lat.png", "/promo_japan.png"],
    description: "Hệ thống biệt thự kiến trúc cổ kiểu Pháp từ những năm 1920-1930 nằm ẩn mình dưới những rặng thông già Đà Lạt rì rào.",
    amenities: [
      { name: "Hồ bơi nước ấm ngoài trời", icon: "🏊" },
      { name: "Spa thảo mộc thiên nhiên", icon: "💆" },
      { name: "Lò sưởi củi cổ điển trong phòng", icon: "🔥" }
    ],
    rooms: [
      { name: "Le Petit Room", price: 2600000, capacity: "2 Người lớn", amenities: ["Lò sưởi củi cổ", "Bồn tắm đồng cổ"] }
    ],
    features: ["Biệt thự Pháp cổ cổ điển", "Bể bơi nước ấm rừng thông", "Spa thảo mộc"],
    reviews: 970
  },
  {
    id: "ht-13",
    name: "Anantara Mui Ne Resort",
    location: "Mũi Né, Bình Thuận",
    rating: 9.1,
    stars: 5,
    price: 3800000,
    oldPrice: 4500000,
    image: "/promo_japan.png",
    gallery: ["/promo_japan.png", "/promo_europe.png"],
    description: "Ốc đảo sang trọng hòa quyện hoàn hảo giữa văn hóa Việt cổ điển và phong cách thiết kế hiện đại bên bờ biển Phan Thiết quyến rũ.",
    amenities: [
      { name: "Hồ bơi vô cực ngắm hoàng hôn biển", icon: "🏊" },
      { name: "Nhà hàng ẩm thực ven biển", icon: "🍽️" },
      { name: "Lớp dạy nấu ăn ẩm thực Việt", icon: "🍳" }
    ],
    rooms: [
      { name: "Deluxe Ocean View", price: 3800000, capacity: "2 Người lớn", amenities: ["View biển trực diện", "Ban công lộng gió"] }
    ],
    features: ["Hồ bơi ngắm hoàng hôn", "Lớp học ẩm thực Việt", "Resort bãi biển riêng"],
    reviews: 670
  },
  {
    id: "ht-14",
    name: "The Reverie Saigon",
    location: "Quận 1, TP.HCM",
    rating: 9.5,
    stars: 5,
    price: 7500000,
    oldPrice: 9000000,
    image: "/hero_bg_sunset.png",
    gallery: ["/hero_bg_sunset.png", "/promo_europe.png"],
    description: "Khách sạn vương giả chuẩn hoàng gia bậc nhất Sài Gòn mang đậm dấu ấn phong cách thiết kế nội thất quý tộc xa hoa nước Ý.",
    amenities: [
      { name: "Bể bơi có nhạc nước ngầm nghệ thuật", icon: "🏊" },
      { name: "Xe đưa đón siêu sang Rolls-Royce", icon: "🚗" },
      { name: "Spa cao cấp thượng lưu", icon: "💆" }
    ],
    rooms: [
      { name: "Deluxe King Room", price: 7500000, capacity: "2 Người lớn", amenities: ["Nội thất Ý dát vàng", "View sông Sài Gòn cực rộng"] }
    ],
    features: ["Khách sạn siêu sang xa hoa", "Xe đưa đón Rolls-Royce", "Hồ bơi nhạc nước nghệ thuật"],
    reviews: 520
  },
  {
    id: "ht-15",
    name: "JW Marriott Phu Quoc Emerald Bay",
    location: "An Thới, Phú Quốc",
    rating: 9.6,
    stars: 5,
    price: 8200000,
    oldPrice: 9800000,
    image: "/destinations/phu-quoc.png",
    gallery: ["/destinations/phu-quoc.png", "/promo_europe.png"],
    description: "Tuyệt tác kiến trúc học đường độc nhất vô nhị của Bill Bensley trên bờ cát trắng mịn như kem của bãi Khem đảo ngọc Phú Quốc.",
    amenities: [
      { name: "Bể bơi hình con sò độc lạ", icon: "🏊" },
      { name: "Chèo thuyền Kayak & ván chèo SUP", icon: "🏄" },
      { name: "Nhà hàng chuẩn ẩm thực Pink Pearl", icon: "🥂" }
    ],
    rooms: [
      { name: "Emerald Bay View", price: 8200000, capacity: "2 Người lớn", amenities: ["View biển ngập tràn ánh nắng", "Giường ngủ êm ái hoàng gia"] }
    ],
    features: ["Kiến trúc trường học cổ độc lạ", "Hồ bơi con sò tuyệt mỹ", "Nằm cạnh Bãi Khem cát trắng"],
    reviews: 1340
  },
  {
    id: "ht-16",
    name: "Six Senses Con Dao",
    location: "Côn Đảo, Bà Rịa - Vũng Tàu",
    rating: 9.7,
    stars: 5,
    price: 16500000,
    oldPrice: 19500000,
    image: "/destinations/phu-quoc.png",
    gallery: ["/destinations/phu-quoc.png", "/hero_bg.png"],
    description: "Khu nghỉ dưỡng sinh thái cao cấp biệt lập, giao hòa hoàn hảo cùng thiên nhiên biển xanh ngút ngàn và rặng núi đá Côn Đảo.",
    amenities: [
      { name: "Hồ bơi tràn bờ biệt thự riêng", icon: "🏊" },
      { name: "Khu bảo tồn rùa biển sinh sản", icon: "🐢" },
      { name: "Spa chăm sóc trị liệu chuyên sâu", icon: "💆" }
    ],
    rooms: [
      { name: "Ocean Front Pool Villa", price: 16500000, capacity: "2 Người lớn", amenities: ["Hồ bơi sát biển", "Phòng tắm ngoài trời lãng mạn"] }
    ],
    features: ["Spa trị liệu cao cấp", "Bảo tồn rùa biển tự nhiên", "Cano đưa đón biệt lập"],
    reviews: 260
  },
  {
    id: "ht-17",
    name: "Azerai Can Tho",
    location: "Cồn Ấu, Cần Thơ",
    rating: 9.3,
    stars: 5,
    price: 4500000,
    oldPrice: 5300000,
    image: "/hero_bg_sunset.png",
    gallery: ["/hero_bg_sunset.png", "/promo_japan.png"],
    description: "Ốc đảo xanh yên bình nằm biệt lập trên cồn Ấu rợp bóng cây bàng di sản, mang đậm dấu ấn kiến trúc Đông Dương hoài cổ tinh tế.",
    amenities: [
      { name: "Hồ bơi trung tâm rợp bóng mát", icon: "🏊" },
      { name: "Sân tennis cao cấp", icon: "🎾" },
      { name: "Nhà hàng ẩm thực sông nước miền Tây", icon: "🍽️" }
    ],
    rooms: [
      { name: "Garden Room", price: 4500000, capacity: "2 Người lớn", amenities: ["Ban công hướng vườn xanh mát", "Hệ thống âm thanh hi-end"] }
    ],
    features: ["Ốc đảo cồn Ấu biệt lập", "Kiến trúc Indochine tinh tế", "Chăm sóc spa thảo mộc"],
    reviews: 310
  },
  {
    id: "ht-18",
    name: "Pullman Vung Tau",
    location: "Vũng Tàu, Bà Rịa - Vũng Tàu",
    rating: 8.8,
    stars: 5,
    price: 2300000,
    oldPrice: 2800000,
    image: "/promo_japan.png",
    gallery: ["/promo_japan.png", "/promo_europe.png"],
    description: "Khách sạn trung tâm hội nghị quốc tế chuẩn 5 sao với thiết kế hình mái vòm độc đáo rực rỡ sắc màu ngay trung tâm thành phố Vũng Tàu.",
    amenities: [
      { name: "Bể bơi lớn ngoài trời", icon: "🏊" },
      { name: "Trung tâm Fitness hiện đại", icon: "🏋️" },
      { name: "Bar phục vụ cocktail đêm", icon: "🍸" }
    ],
    rooms: [
      { name: "Superior Room", price: 2300000, capacity: "2 Người lớn", amenities: ["View toàn cảnh thành phố biển cực rộng", "Bàn làm việc thông minh"] }
    ],
    features: ["Kiến trúc mái vòm độc lạ", "Trung tâm thể thao hiện đại", "Hồ bơi ngoài trời cực rộng"],
    reviews: 1450
  },
  {
    id: "ht-19",
    name: "Avani Quy Nhon Resort",
    location: "Quy Nhơn, Bình Định",
    rating: 9.0,
    stars: 5,
    price: 3100000,
    oldPrice: 3800000,
    image: "/hero_bg_danang.png",
    gallery: ["/hero_bg_danang.png", "/promo_japan.png"],
    description: "Khu nghỉ dưỡng sát bãi biển Kỳ Co hoang sơ trong vắt với ban công lộng gió ngắm toàn cảnh bình minh biển Quy Nhơn.",
    amenities: [
      { name: "Lớp thiền khí công & Yoga sớm", icon: "🧘" },
      { name: "Spa ghềnh đá độc đáo mát rượi", icon: "💆" },
      { name: "Nhà hàng ẩm thực hải sản trên cao", icon: "🍽️" }
    ],
    rooms: [
      { name: "Avani Deluxe Room", price: 3100000, capacity: "2 Người lớn", amenities: ["Ban công ngắm biển trực diện", "Minibar đầy đủ"] }
    ],
    features: ["Trị liệu spa ghềnh đá", "Resort bãi biển riêng biệt", "Thiền khí công sáng"],
    reviews: 580
  },
  {
    id: "ht-20",
    name: "Zannier Hotels Bai San Ho",
    location: "Sông Cầu, Phú Yên",
    rating: 9.8,
    stars: 5,
    price: 12000000,
    oldPrice: 14500000,
    image: "/hero_bg_danang.png",
    gallery: ["/hero_bg_danang.png", "/promo_europe.png"],
    description: "Khu resort độc bản được bao bọc bởi những rặng đồi xanh mướt ngắm nhìn vịnh biển hoang sơ tuyệt mỹ xứ hoa vàng cỏ xanh.",
    amenities: [
      { name: "Bể bơi vô cực vô cực sát biển", icon: "🏊" },
      { name: "Chèo ván buồm & lặn ống thở ngắm san hô", icon: "⛵" },
      { name: "Spa thảo dược cung đình Việt", icon: "💆" }
    ],
    rooms: [
      { name: "Paddy Field Villa", price: 12000000, capacity: "2 Người lớn", amenities: ["Thiết kế nhà sàn cổ bằng tre nứa", "Bồn tắm bằng gỗ cổ"] }
    ],
    features: ["Thiết kế nhà sàn mộc mạc", "Bảo tồn thiên nhiên hoang dã", "Bể bơi tràn bờ sát biển"],
    reviews: 210
  },
  {
    id: "ht-21",
    name: "Silk Sense Hoi An River Resort",
    location: "Cẩm An, Hội An",
    rating: 9.1,
    stars: 5,
    price: 2200000,
    oldPrice: 2700000,
    image: "/destinations/da-nang.png",
    gallery: ["/destinations/da-nang.png", "/hero_bg.png"],
    description: "Khu resort sinh thái cao cấp nép mình bên bờ sông Cổ Cò lộng gió mát mẻ, cam kết 100% không sử dụng rác thải nhựa một lần.",
    amenities: [
      { name: "Hồ bơi nước muối sinh học tốt cho da", icon: "🏊" },
      { name: "Vườn rau hữu cơ cung cấp bếp ăn", icon: "🌱" },
      { name: "Spa massage lụa tơ tằm cổ", icon: "💆" }
    ],
    rooms: [
      { name: "Superior River View", price: 2200000, capacity: "2 Người lớn", amenities: ["View sông Cổ Cò mát mẻ", "Nước uống thảo mộc mỗi ngày"] }
    ],
    features: ["Hồ bơi nước muối sinh học", "Resort không rác thải nhựa", "Vườn rau hữu cơ"],
    reviews: 460
  },
  {
    id: "ht-22",
    name: "Victoria Nui Sam Lodge",
    location: "Châu Đốc, An Giang",
    rating: 8.9,
    stars: 4,
    price: 1600000,
    oldPrice: 2000000,
    image: "/hero_bg_sunset.png",
    gallery: ["/hero_bg_sunset.png", "/promo_japan.png"],
    description: "Tọa lạc trên sườn núi Sam lộng gió hoang dã, sở hữu bể bơi tràn bờ ngắm toàn cảnh cánh đồng lúa xanh ngút ngàn An Giang.",
    amenities: [
      { name: "Bể bơi tràn bờ núi Sam cực đỉnh", icon: "🏊" },
      { name: "Đường mòn đi bộ leo núi tự nhiên", icon: "🥾" },
      { name: "Nhà hàng ẩm thực Tây Nam Bộ mộc mạc", icon: "🍽️" }
    ],
    rooms: [
      { name: "Superior Room", price: 1600000, capacity: "2 Người lớn", amenities: ["Ban công ngắm toàn cảnh đồng lúa rộng", "Điều hòa mát mẻ"] }
    ],
    features: ["Bể bơi view cánh đồng cực đỉnh", "Nằm sừng sững trên sườn núi", "Ẩm thực miền Tây hoài cổ"],
    reviews: 640
  },
  {
    id: "ht-23",
    name: "Topas Ecolodge Sapa",
    location: "Sa Pa, Lào Cai",
    rating: 9.5,
    stars: 4,
    price: 4900000,
    oldPrice: 5800000,
    image: "/destinations/sapa.png",
    gallery: ["/destinations/sapa.png", "/hero_bg.png"],
    description: "Khu nghỉ dưỡng sinh thái hàng đầu nằm biệt lập trên đỉnh đồi tròn sâu trong thung lũng Mường Hoa Sa Pa mờ sương.",
    amenities: [
      { name: "Hồ bơi vô cực sưởi nước nóng view núi", icon: "🏊" },
      { name: "Tắm lá thuốc người Dao đỏ truyền thống", icon: "🛁" },
      { name: "Nhà hàng lẩu rau xanh hữu cơ", icon: "🍽️" }
    ],
    rooms: [
      { name: "Premium Executive Bungalow", price: 4900000, capacity: "2 Người lớn", amenities: ["Xây dựng đá granite tự nhiên", "Ban công ngắm mây núi lộng gió"] }
    ],
    features: ["Bungalow đá granite biệt lập", "Bể bơi vô cực sưởi ấm", "Tắm lá thuốc Dao Đỏ cổ truyền"],
    reviews: 780
  },
  {
    id: "ht-24",
    name: "Vinpearl Resort & Spa Ha Long",
    location: "Vịnh Hạ Long, Quảng Ninh",
    rating: 9.3,
    stars: 5,
    price: 2900000,
    oldPrice: 3500000,
    image: "/destinations/ha-long.png",
    gallery: ["/destinations/ha-long.png", "/hero_bg.png"],
    description: "Lâu đài kiến trúc hoàng gia châu Âu nằm sừng sững lộng lẫy biệt lập trên đảo Rều ngắm nhìn 360 độ vịnh kỳ quan Hạ Long.",
    amenities: [
      { name: "Bể bơi ngoài trời khổng lồ", icon: "🏊" },
      { name: "Bãi biển nhân tạo cát trắng", icon: "🏖️" },
      { name: "Tàu cano đưa đón 24/7", icon: "🚤" }
    ],
    rooms: [
      { name: "Deluxe King Room", price: 2900000, capacity: "2 Người lớn", amenities: ["View biển Hạ Long tuyệt đẹp", "Bồn tắm sang trọng"] }
    ],
    features: ["Nằm trọn vẹn trên Đảo Rều", "Kiến trúc hoàng gia châu Âu", "Cano đón tiễn miễn phí"],
    reviews: 1890
  },
  {
    id: "ht-25",
    name: "Ninh Binh Hidden Charm Hotel & Resort",
    location: "Hoa Lư, Ninh Bình",
    rating: 8.8,
    stars: 4,
    price: 1500000,
    oldPrice: 1900000,
    image: "/hero_bg.png",
    gallery: ["/hero_bg.png", "/promo_japan.png"],
    description: "Khách sạn nằm yên bình sát khu bến thuyền Tam Cốc, rợp bóng rặng tre xanh ngắt mang kiến trúc gốm sứ Bát Tràng độc đáo.",
    amenities: [
      { name: "Bể bơi lớn ngoài trời", icon: "🏊" },
      { name: "Nhà hàng ẩm thực dê núi Tam Cốc", icon: "🍽️" },
      { name: "Phòng gym trang bị đầy đủ", icon: "🏋️" }
    ],
    rooms: [
      { name: "Superior Room", price: 1500000, capacity: "2 Người lớn", amenities: ["Wifi tốc độ cao", "View đồi núi đá vôi"] }
    ],
    features: ["Vị trí đắc địa Tam Cốc", "Trang trí gốm Bát Tràng nghệ thuật", "Nhà hàng ẩm thực dê núi"],
    reviews: 760
  },
  {
    id: "ht-26",
    name: "Victory Coastal Resort Vung Tau",
    location: "Vũng Tàu, Bà Rịa - Vũng Tàu",
    rating: 8.5,
    stars: 4,
    price: 1200000,
    oldPrice: 1500000,
    image: "/promo_japan.png",
    gallery: ["/promo_japan.png", "/promo_europe.png"],
    description: "Khu resort thiết kế phòng nghỉ hướng biển tọa lạc yên tĩnh dưới bóng ngọn hải đăng Vũng Tàu hoài cổ ven bãi Trước.",
    amenities: [
      { name: "Bể bơi nước mặn", icon: "🏊" },
      { name: "Spa chăm sóc thảo dược", icon: "💆" },
      { name: "Cho thuê xe đạp đôi dạo biển", icon: "🚲" }
    ],
    rooms: [
      { name: "Deluxe Ocean View", price: 1200000, capacity: "2 Người lớn", amenities: ["Ban công ngắm hoàng hôn vịnh biển", "Minibar đa dạng"] }
    ],
    features: ["Cho thuê xe đạp dạo biển", "Vị trí yên bình bãi Trước", "Hồ bơi nước mặn"],
    reviews: 540
  },
  {
    id: "ht-27",
    name: "Muong Thanh Luxury Da Nang Hotel",
    location: "Ngũ Hành Sơn, Đà Nẵng",
    rating: 8.9,
    stars: 5,
    price: 1400000,
    oldPrice: 1800000,
    image: "/destinations/da-nang.png",
    gallery: ["/destinations/da-nang.png", "/promo_japan.png"],
    description: "Tòa nhà khách sạn 5 sao cao cấp tọa lạc đắc địa ngay sát bờ cát trắng mịn màng của bãi biển Mỹ Khê Đà Nẵng xinh đẹp.",
    amenities: [
      { name: "Bể bơi trong nhà lớn ngắm cảnh trên cao", icon: "🏊" },
      { name: "Spa chăm sóc xông hơi đá muối", icon: "💆" },
      { name: "Nhà hàng phục vụ đặc sản vùng cao", icon: "🍽️" }
    ],
    rooms: [
      { name: "Deluxe King Room", price: 1400000, capacity: "2 Người lớn", amenities: ["View biển Mỹ Khê lộng gió", "Wifi miễn phí"] }
    ],
    features: ["Vị trí đắc địa biển Mỹ Khê", "Bể bơi trên cao ngắm cảnh", "Xông hơi trị liệu đá muối"],
    reviews: 1280
  },
  {
    id: "ht-28",
    name: "Imperial Hotel Hue",
    location: "Huế, Thừa Thiên Huế",
    rating: 9.0,
    stars: 5,
    price: 1800000,
    oldPrice: 2200000,
    image: "/hero_bg_danang.png",
    gallery: ["/hero_bg_danang.png", "/promo_japan.png"],
    description: "Khách sạn 5 sao cao cấp đầu tiên tại Huế tái hiện lộng lẫy cung điện cung đình triều Nguyễn xưa nằm ngay sát bờ sông Hương.",
    amenities: [
      { name: "Nhà hàng cung đình phục vụ nhạc triều Nguyễn", icon: "👑" },
      { name: "Bể bơi lớn ngoài trời rợp bóng cây", icon: "🏊" },
      { name: "Spa chăm sóc thảo mộc cung đình cổ", icon: "💆" }
    ],
    rooms: [
      { name: "Deluxe King", price: 1800000, capacity: "2 Người lớn", amenities: ["Bồn tắm sứ cổ điển", "View sông Hương và cầu Tràng Tiền"] }
    ],
    features: ["Kiến trúc triều Nguyễn vương giả", "Bữa tối ẩm thực cung đình", "View sông Hương cầu Tràng Tiền"],
    reviews: 950
  },
  {
    id: "ht-29",
    name: "Sheraton Nha Trang Hotel & Spa",
    location: "Nha Trang, Khánh Hòa",
    rating: 9.2,
    stars: 5,
    price: 2500000,
    oldPrice: 3100000,
    image: "/promo_japan.png",
    gallery: ["/promo_japan.png", "/hero_bg.png"],
    description: "Khách sạn 5 sao mang thương hiệu Sheraton danh tiếng, sở hữu bể bơi vô cực ngắm trọn vẹn vịnh biển Nha Trang thơ mộng xinh đẹp.",
    amenities: [
      { name: "Bể bơi vô cực ngắm biển trên cao cực đẹp", icon: "🏊" },
      { name: "Trường dạy nấu ăn của đầu bếp cao cấp", icon: "🍳" },
      { name: "Lounge bar phục vụ nhạc Jazz trực tiếp", icon: "🎷" }
    ],
    rooms: [
      { name: "Deluxe Ocean View", price: 2500000, capacity: "2 Người lớn", amenities: ["View biển xanh ngắt 100%", "Giường ngủ cao cấp Sheraton Sweet Sleeper"] }
    ],
    features: ["Bể bơi vô cực lộng gió cực đẹp", "Học nấu ăn đầu bếp 5 sao", "Giường ngủ êm ái cao cấp"],
    reviews: 1420
  },
  {
    id: "ht-30",
    name: "Dalat Palace Heritage Hotel",
    location: "Đà Lạt, Lâm Đồng",
    rating: 9.3,
    stars: 5,
    price: 3600000,
    oldPrice: 4200000,
    image: "/destinations/da-lat.png",
    gallery: ["/destinations/da-lat.png", "/promo_europe.png"],
    description: "Khách sạn hoàng gia Pháp cổ kính có tuổi đời hơn 100 năm tọa lạc trên ngọn đồi rộng ngắm thẳng xuống Hồ Xuân Hương mộng mơ.",
    amenities: [
      { name: "Sân tennis bao quanh bởi thông xanh", icon: "🎾" },
      { name: "Hầm rượu vang Pháp quý hiếm", icon: "🍷" },
      { name: "Nhà hàng ẩm thực chuẩn Pháp cổ điển", icon: "🍽️" }
    ],
    rooms: [
      { name: "Superior Heritage", price: 3600000, capacity: "2 Người lớn", amenities: ["Nội thất Pháp cổ dát vàng", "Lò sưởi củi sưởi ấm"] }
    ],
    features: ["Dinh thự hoàng gia Pháp cổ xưa hơn 100 năm", "View trực diện Hồ Xuân Hương thơ mộng", "Hầm rượu vang quý hiếm"],
    reviews: 620
  },
  {
    id: "ht-31",
    name: "The Cliff Resort & Residences Mui Ne",
    location: "Mũi Né, Bình Thuận",
    rating: 8.9,
    stars: 4,
    price: 1900000,
    oldPrice: 2400000,
    image: "/promo_japan.png",
    gallery: ["/promo_japan.png", "/hero_bg.png"],
    description: "Resort mang phong cách Địa Trung Hải xinh đẹp nằm sừng sững trên mỏm đá dốc độc đáo dạo thẳng xuống bờ biển Mũi Né lộng gió.",
    amenities: [
      { name: "Bể bơi lớn có quầy bar nước chìm", icon: "🏊" },
      { name: "Rạp chiếu phim mini trong nhà", icon: "🎬" },
      { name: "Cho thuê ván chèo SUP & thuyền Kayak", icon: "🏄" }
    ],
    rooms: [
      { name: "Azul Garden View", price: 1900000, capacity: "2 Người lớn", amenities: ["Ban công rộng ngắm vườn hoa", "Wifi tốc độ cao"] }
    ],
    features: ["Phong cách Địa Trung Hải", "Bể bơi quầy bar nước chìm", "Nằm sừng sững dốc ghềnh đá"],
    reviews: 1100
  },
  {
    id: "ht-32",
    name: "Rex Hotel Saigon",
    location: "Quận 1, TP.HCM",
    rating: 9.1,
    stars: 5,
    price: 2700000,
    oldPrice: 3300000,
    image: "/hero_bg_sunset.png",
    gallery: ["/hero_bg_sunset.png", "/promo_japan.png"],
    description: "Khách sạn mang tính biểu tượng lịch sử lâu đời của Sài Gòn, sở hữu Rooftop Bar lừng danh ngắm toàn cảnh phố đi bộ Nguyễn Huệ.",
    amenities: [
      { name: "Rooftop Bar lừng danh ngắm phố đêm", icon: "🍸" },
      { name: "Hồ bơi ngoài trời trên cao mát mẻ", icon: "🏊" },
      { name: "Nhà hàng phục vụ múa rối nước", icon: "🎭" }
    ],
    rooms: [
      { name: "Deluxe King Room", price: 2700000, capacity: "2 Người lớn", amenities: ["Wifi tốc độ cao", "Phòng khách biệt lập rộng"] }
    ],
    features: ["Rooftop Bar biểu tượng lịch sử", "Nhìn thẳng xuống phố Nguyễn Huệ", "Show trình diễn rối nước nghệ thuật"],
    reviews: 1650
  },
  {
    id: "ht-33",
    name: "Novotel Phu Quoc Resort",
    location: "Dương Tơ, Phú Quốc",
    rating: 9.1,
    stars: 5,
    price: 2100000,
    oldPrice: 2600000,
    image: "/destinations/phu-quoc.png",
    gallery: ["/destinations/phu-quoc.png", "/promo_japan.png"],
    description: "Khu resort cao cấp thiết kế hài hòa cùng thiên nhiên bãi Trường biển xanh cát mịn Phú Quốc, thích hợp cho kỳ nghỉ gia đình.",
    amenities: [
      { name: "Bể bơi đôi vô cực lớn sát biển", icon: "🏊" },
      { name: "Khu vui chơi trẻ em Kid Club phong phú", icon: "🎠" },
      { name: "Đạp xe đạp đôi dạo resort miễn phí", icon: "🚲" }
    ],
    rooms: [
      { name: "Superior Room", price: 2100000, capacity: "2 Người lớn", amenities: ["View vườn nhiệt đới xanh mát", "Ban công lộng gió biển"] }
    ],
    features: ["Đạp xe dạo chơi resort miễn phí", "Khu vui chơi trẻ em Kid Club", "Bể bơi vô cực sát biển"],
    reviews: 1480
  },
  {
    id: "ht-34",
    name: "Poulo Condor Boutique Resort & Spa",
    location: "Côn Đảo, Bà Rịa - Vũng Tàu",
    rating: 9.2,
    stars: 4,
    price: 3300000,
    oldPrice: 4000000,
    image: "/destinations/phu-quoc.png",
    gallery: ["/destinations/phu-quoc.png", "/hero_bg_sunset.png"],
    description: "Khu resort boutique tái hiện lộng lẫy nét hoài cổ lãng mạn phong cách Indochine độc đáo ẩn dưới chân núi Chúa Côn Đảo xanh rì.",
    amenities: [
      { name: "Bể bơi lớn bao quanh bởi dừa xanh", icon: "🏊" },
      { name: "Thư viện đọc sách cổ điển", icon: "📚" },
      { name: "Spa chăm sóc thảo dược thiên nhiên", icon: "💆" }
    ],
    rooms: [
      { name: "Colonial Suite Villa", price: 3300000, capacity: "2 Người lớn", amenities: ["Thiết kế gỗ phong cách Indochine", "Ban công hướng hồ xanh mát"] }
    ],
    features: ["Phong cách Indochine mộc mạc", "Nằm dưới chân núi Chúa hoang sơ", "Thư viện đọc sách cổ"],
    reviews: 420
  }
];




export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
}

export const articles: Article[] = [
  {
    id: "news-01",
    title: "10 Địa điểm tuyệt vời không thể bỏ qua tại Nhật Bản",
    date: "05/04/2026",
    category: "Cẩm nang du lịch",
    image: "/promo_japan.png",
    excerpt: "Nhật Bản luôn là điểm đến hấp dẫn với sự kết hợp hoàn hảo giữa hiện đại và truyền thống...",
    content: "<p>Nhật Bản không chỉ nổi tiếng với hoa anh đào hay núi Phú Sĩ mà còn có vô vàn những trải nghiệm thú vị khác...</p><h3>1. Cố đô Kyoto</h3><p>Nơi lưu giữ linh hồn của Nhật Bản với hàng ngàn ngôi đền cổ...</p>",
    author: "Vietravel Team"
  },
  {
    id: "news-02",
    title: "Kinh nghiệm du lịch Châu Âu tiết kiệm nhất",
    date: "02/04/2026",
    category: "Mẹo hay",
    image: "/promo_europe.png",
    excerpt: "Làm thế nào để có một chuyến đi Châu Âu mơ ước mà không tốn quá nhiều chi phí? Hãy xem ngay...",
    content: "<p>Châu Âu thường bị coi là đắt đỏ, nhưng với kế hoạch chi tiết, bạn hoàn toàn có thể tối ưu ngân sách...</p>",
    author: "Admin"
  },
  {
    id: "news-03",
    title: "Vẻ đẹp huyền ảo của Vịnh Hạ Long về đêm",
    date: "30/03/2026",
    category: "Khám phá",
    image: "/hero_bg.png",
    excerpt: "Ngắm kỳ quan thiên nhiên thế giới Hạ Long trong ánh đèn lung linh từ những du thuyền 5 sao...",
    content: "<p>Trải nghiệm ngủ đêm trên vịnh là một trong những điều tuyệt vời nhất bạn nên thử một lần trong đời...</p>",
    author: "Hạ Long Insider"
  },
  {
    id: "news-04",
    title: "Khám phá ẩm thực đường phố Hà Nội",
    date: "10/05/2026",
    category: "Ẩm thực",
    image: "/hero_bg.png",
    excerpt: "Hà Nội không chỉ nổi tiếng với 36 phố phường mà còn là thiên đường ẩm thực đường phố...",
    content: "<p>Phở, bún chả, nem rán... là những món ăn bạn không thể bỏ qua khi đến Hà Nội.</p>",
    author: "Vietravel Team"
  },
  {
    id: "news-05",
    title: "Cẩm nang du lịch Phú Quốc từ A đến Z",
    date: "15/05/2026",
    category: "Cẩm nang du lịch",
    image: "/destinations/phu-quoc.png",
    excerpt: "Lưu lại ngay bí kíp du lịch Phú Quốc chi tiết nhất cho mùa hè này...",
    content: "<p>Phú Quốc được mệnh danh là đảo ngọc với những bãi biển tuyệt đẹp và hải sản phong phú.</p>",
    author: "Admin"
  },
  {
    id: "news-06",
    title: "Sapa mùa lúa chín - Vẻ đẹp làm say lòng người",
    date: "20/05/2026",
    category: "Khám phá",
    image: "/destinations/sapa.png",
    excerpt: "Mùa thu là thời điểm lý tưởng nhất để ngắm nhìn những thửa ruộng bậc thang vàng rực ở Sapa...",
    content: "<p>Đến Sapa vào tháng 9, tháng 10, bạn sẽ choáng ngợp trước vẻ đẹp hùng vĩ của núi rừng Tây Bắc.</p>",
    author: "Hương Trà"
  },
  {
    id: "news-07",
    title: "Đà Nẵng - Thành phố đáng sống nhất Việt Nam",
    date: "25/05/2026",
    category: "Điểm đến",
    image: "/destinations/da-nang.png",
    excerpt: "Vì sao Đà Nẵng luôn thu hút hàng triệu du khách mỗi năm? Khám phá ngay...",
    content: "<p>Không chỉ có biển xanh cát trắng, Đà Nẵng còn nổi tiếng với những cây cầu độc đáo và con người thân thiện.</p>",
    author: "Travel Blogger"
  },
  {
    id: "news-08",
    title: "Kinh nghiệm vi vu Đà Lạt 3 ngày 2 đêm",
    date: "01/06/2026",
    category: "Mẹo hay",
    image: "/destinations/da-lat.png",
    excerpt: "Chỉ với 3 ngày, làm sao để khám phá trọn vẹn vẻ đẹp mộng mơ của Đà Lạt?...",
    content: "<p>Lịch trình chi tiết và những quán cafe view đẹp không thể bỏ lỡ tại Đà Lạt.</p>",
    author: "Lan Anh"
  },
  {
    id: "news-09",
    title: "Khám phá vẻ đẹp hoang sơ của Côn Đảo",
    date: "05/06/2026",
    category: "Khám phá",
    image: "/destinations/phu-quoc.png",
    excerpt: "Côn Đảo không chỉ là di tích lịch sử mà còn là thiên đường biển đảo hoang sơ...",
    content: "<p>Nước biển trong xanh, bãi cát trắng mịn và hệ sinh thái đa dạng làm nên sức hút của Côn Đảo.</p>",
    author: "Quang Vinh"
  },
  {
    id: "news-10",
    title: "Mũi Né - Thiên đường biển và đồi cát trắng",
    date: "10/06/2026",
    category: "Điểm đến",
    image: "/promo_japan.png",
    excerpt: "Trải nghiệm trượt cát và ngắm hoàng hôn lãng mạn tại Mũi Né...",
    content: "<p>Mũi Né là điểm đến không thể bỏ qua với những đồi cát trải dài và ẩm thực phong phú.</p>",
    author: "Admin"
  },
  {
    id: "news-11",
    title: "Văn hóa cồng chiêng Tây Nguyên - Di sản nhân loại",
    date: "15/06/2026",
    category: "Văn hóa",
    image: "/hero_bg_sunset.png",
    excerpt: "Hòa mình vào nhịp điệu cồng chiêng và khám phá văn hóa độc đáo của người Tây Nguyên...",
    content: "<p>Không gian văn hóa cồng chiêng Tây Nguyên là một kiệt tác truyền khẩu và phi vật thể của nhân loại.</p>",
    author: "Bảo Ngọc"
  },
  {
    id: "news-12",
    title: "Thưởng thức bún bò Huế đúng điệu tại cố đô",
    date: "20/06/2026",
    category: "Ẩm thực",
    image: "/hero_bg_danang.png",
    excerpt: "Bún bò Huế không chỉ là món ăn mà còn là tinh hoa ẩm thực của miền Trung...",
    content: "<p>Để cảm nhận trọn vẹn hương vị, hãy đến Huế và thưởng thức một tô bún bò nóng hổi đậm đà.</p>",
    author: "Minh Quân"
  },
  {
    id: "news-13",
    title: "Chinh phục đỉnh Fansipan - Nóc nhà Đông Dương",
    date: "25/06/2026",
    category: "Khám phá",
    image: "/destinations/sapa.png",
    excerpt: "Cảm giác đứng trên đỉnh cao 3.143m và ngắm nhìn biển mây bồng bềnh...",
    content: "<p>Hành trình chinh phục Fansipan giờ đây dễ dàng hơn nhờ hệ thống cáp treo hiện đại.</p>",
    author: "Traveler Pro"
  }
];

export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id);
}

export function searchTours(destQuery: string, dateStr?: string): Tour[] {
  return tours.filter(tour => {
    let match = true;
    if (destQuery) {
      const q = destQuery.toLowerCase();
      match = match && (tour.title.toLowerCase().includes(q) || tour.destination.toLowerCase().includes(q));
    }
    return match;
  });
}

export function getTourById(id: string): Tour | undefined {
  return tours.find(t => t.id === id);
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' đ';
}
