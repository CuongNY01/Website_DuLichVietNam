const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const articles = [
    {
      id: 'news-1',
      title: 'Top 10 bãi biển đẹp nhất Việt Nam bạn nên ghé thăm mùa hè này',
      date: '15/05/2026',
      category: 'Khám phá',
      image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop',
      excerpt: 'Việt Nam sở hữu đường bờ biển dài với vô số bãi tắm tuyệt đẹp. Từ Phú Quốc, Nha Trang đến Đà Nẵng, đâu là lựa chọn hoàn hảo cho kỳ nghỉ của bạn?',
      content: '<p>Việt Nam là một đất nước may mắn được thiên nhiên ưu đãi với đường bờ biển dài hơn 3.200km. Mùa hè đang đến gần, và không có gì tuyệt vời hơn là được đắm mình trong làn nước trong xanh tại những bãi biển đẹp nhất dải đất hình chữ S.</p><h3>1. Bãi Sao - Phú Quốc</h3><p>Được mệnh danh là thiên đường hạ giới, Bãi Sao sở hữu bãi cát trắng mịn như kem và làn nước xanh ngắt một màu.</p><h3>2. Mỹ Khê - Đà Nẵng</h3><p>Từng được tạp chí Forbes vinh danh là một trong những bãi biển quyến rũ nhất hành tinh.</p>',
      author: 'Hoàng Anh'
    },
    {
      id: 'news-2',
      title: 'Kinh nghiệm du lịch Sa Pa tự túc tiết kiệm nhất 2026',
      date: '14/05/2026',
      category: 'Cẩm nang du lịch',
      image: 'https://images.unsplash.com/photo-1508804494159-76076ac97570?q=80&w=2070&auto=format&fit=crop',
      excerpt: 'Sa Pa luôn là điểm đến hấp dẫn du khách bởi khí hậu mát mẻ và phong cảnh hùng vĩ. Làm sao để có chuyến đi trọn vẹn với chi phí thấp nhất?',
      content: '<p>Du lịch Sa Pa không còn quá xa lạ, nhưng để có một chuyến đi vừa rẻ vừa vui thì không phải ai cũng biết.</p><h3>Cách di chuyển</h3><p>Bạn nên chọn xe giường nằm hoặc tàu hỏa để tiết kiệm chi phí di chuyển từ Hà Nội.</p><h3>Chỗ ở</h3><p>Các homestay tại bản Cát Cát hoặc Tả Van là lựa chọn tuyệt vời để vừa tiết kiệm vừa trải nghiệm văn hóa bản địa.</p>',
      author: 'Minh Tú'
    },
    {
      id: 'news-3',
      title: 'Lễ hội pháo hoa quốc tế Đà Nẵng (DIFF) 2026 chính thức khởi động',
      date: '12/05/2026',
      category: 'Sự kiện',
      image: 'https://images.unsplash.com/photo-1533230393619-3f8e2030d8d4?q=80&w=2070&auto=format&fit=crop',
      excerpt: 'Sự kiện được mong chờ nhất mùa hè tại thành phố đáng sống nhất Việt Nam đã quay trở lại với quy mô lớn hơn bao giờ hết.',
      content: '<p>DIFF 2026 hứa hẹn mang đến những màn trình diễn ánh sáng đỉnh cao từ các đội thi hàng đầu thế giới.</p><p>Thời gian diễn ra: Từ ngày 01/06 đến 02/07/2026.</p>',
      author: 'Vietravel Team'
    }
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { id: article.id },
      update: article,
      create: article,
    });
  }

  console.log('Seeded 3 news articles');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
