import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = (messages[messages.length - 1].content || "").toLowerCase();

    // 1. Fetch all tours for context
    const tours = await prisma.tour.findMany({
      select: { title: true, code: true, price: true, destination: true }
    });

    const tourContext = tours.map(t => `- ${t.title} (${t.code}): ${t.destination}, giá ${t.price.toLocaleString('vi-VN')}đ`).join('\n');

    try {
      // 2. PRIMARY: Use Groq with Llama 3
      const { text } = await generateText({
        model: groq('llama-3.3-70b-versatile'),
        system: `Bạn là trợ lý ảo thông minh của Du Lịch Việt Nam. 
Hãy tư vấn tour dựa trên dữ liệu thật sau đây:\n${tourContext}\n
Yêu cầu:
- Trả lời lịch sự, thân thiện bằng tiếng Việt.
- Nếu khách hỏi về địa danh có trong dữ liệu, hãy giới thiệu tour đó.
- Nếu không có địa danh đó, hãy gợi ý các tour tương tự hoặc tour nổi bật nhất.
- Khuyến khích khách đặt tour hoặc để lại thông tin tư vấn.`,
        prompt: lastMessage,
      });

      return new Response(JSON.stringify({
        id: Date.now().toString(),
        role: 'assistant',
        content: text,
      }), { headers: { 'Content-Type': 'application/json' } });

    } catch (aiError: any) {
      console.error('Groq AI Error:', aiError);
      
      // 3. FALLBACK: Smart Local AI
      let filteredTours = tours;
      const responseIntro = "Chào bạn! Tôi là trợ lý ảo. Dựa trên yêu cầu của bạn, tôi xin gợi ý các tour phù hợp:";

      if (lastMessage.includes("hạ long")) {
        filteredTours = tours.filter(t => t.destination.toLowerCase().includes("hạ long") || t.title.toLowerCase().includes("hạ long"));
      } else if (lastMessage.includes("đà nẵng")) {
        filteredTours = tours.filter(t => t.destination.toLowerCase().includes("đà nẵng") || t.title.toLowerCase().includes("đà nẵng"));
      }

      const tourList = filteredTours.slice(0, 3).map(t => 
        `📍 **${t.title}**\n   - Giá: ${t.price.toLocaleString('vi-VN')}đ`
      ).join('\n\n');

      return new Response(JSON.stringify({
        id: Date.now().toString(),
        role: 'assistant',
        content: `${responseIntro}\n\n${tourList}`,
      }), { headers: { 'Content-Type': 'application/json' } });
    }

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
