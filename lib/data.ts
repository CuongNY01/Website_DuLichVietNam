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
