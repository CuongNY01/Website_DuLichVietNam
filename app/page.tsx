import HeroBanner from "../components/HeroBanner";
import PromotionGrid from "../components/PromotionGrid";
import SectionDeal from "../components/SectionDeal";
import PopularDestinations from "../components/PopularDestinations";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatCurrency } from "@/lib/data";

export default async function Home() {
  const latestTours = await prisma.tour.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' }
  });

  const latestArticles = await prisma.article.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  const featuredHotels = await prisma.hotel.findMany({
    take: 4,
    orderBy: { rating: 'desc' }
  });

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-light)" }}>
      <HeroBanner />
      
      <div style={{ padding: "80px 0 40px" }}>
        <PopularDestinations />

        <SectionDeal 
          title="TOUR KHUYẾN MÃI" 
          subtitle="Nhanh tay săn ngay tour xịn giá rẻ cùng hàng nghìn khuyến mãi hấp dẫn" 
          toursData={latestTours}
        />

        {/* Featured Hotels Section */}
        <div style={{ padding: '80px 0', backgroundColor: 'white' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
              <div>
                <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-dark)' }}>KHÁCH SẠN NỔI BẬT</h2>
                <p style={{ color: 'var(--text-gray)', marginTop: '10px' }}>Lựa chọn không gian nghỉ dưỡng đẳng cấp cho chuyến đi của bạn</p>
              </div>
              <Link href="/hotel" style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '14px' }}>Xem tất cả khách sạn →</Link>
            </div>
            
            <div className="grid-systems col-4">
              {featuredHotels.map((hotel) => (
                <Link key={hotel.id} href={`/hotel/${hotel.id}`} className="card-hotel" style={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  backgroundColor: 'white', 
                  border: '1px solid #f1f5f9',
                  transition: 'transform 0.3s'
                }}>
                  <div style={{ position: 'relative', height: '200px' }}>
                    <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'white', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: '#fbbf24' }}>
                      ⭐ {hotel.rating}
                    </div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-dark)' }}>{hotel.name}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginBottom: '12px' }}>📍 {hotel.location}</p>
                    <div style={{ color: 'var(--accent-red)', fontWeight: 900, fontSize: '15px' }}>{formatCurrency(hotel.price)} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-gray)' }}>/ đêm</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '100px 0', backgroundColor: 'var(--background-light)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '15px' }}>TẠI SAO CHỌN <span style={{ color: 'var(--primary-blue)' }}>DU LỊCH VIỆT NAM</span>?</h2>
              <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--primary-blue)', margin: '0 auto 20px' }}></div>
            </div>
            
            <div className="grid-systems col-3">
              {[
                { title: 'Giá tốt nhất', desc: 'Cam kết mức giá cạnh tranh nhất thị trường cùng nhiều ưu đãi hấp dẫn hàng ngày.', icon: '💰' },
                { title: 'Dịch vụ chất lượng', desc: 'Hệ thống đối tác khách sạn, nhà hàng cao cấp được chọn lọc kỹ lưỡng theo tiêu chuẩn.', icon: '⭐' },
                { title: 'Hỗ trợ tận tâm', desc: 'Đội ngũ chăm sóc khách hàng chuyên nghiệp sẵn sàng hỗ trợ bạn 24/7.', icon: '🛡️' },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '40px 30px', borderRadius: '24px', backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '48px', marginBottom: '24px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '15px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-gray)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PromotionGrid />

        {/* Latest News Section */}
        <div style={{ padding: '100px 0', backgroundColor: 'white' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-dark)' }}>CẨM NANG DU LỊCH</h2>
              <p style={{ color: 'var(--text-gray)', marginTop: '10px' }}>Chia sẻ những bí kíp và trải nghiệm khám phá Việt Nam</p>
            </div>
            
            <div className="grid-systems col-3">
              {latestArticles.map((article) => (
                <Link key={article.id} href={`/news/${article.id}`} style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  border: '1px solid #f1f5f9',
                  transition: 'transform 0.3s'
                }}>
                  <img src={article.image} alt={article.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--primary-blue)', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase' }}>{article.category}</div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.4, height: '48px', overflow: 'hidden' }}>{article.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-gray)', marginBottom: '16px', height: '60px', overflow: 'hidden' }}>{article.excerpt}</p>
                    <div style={{ color: 'var(--text-light)', fontSize: '12px' }}>📅 {article.date}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/news" style={{ display: 'inline-block', padding: '12px 32px', border: '2px solid var(--primary-blue)', color: 'var(--primary-blue)', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>XEM TẤT CẢ BÀI VIẾT</Link>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
