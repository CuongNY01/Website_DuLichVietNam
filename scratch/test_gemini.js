const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testGemini() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    console.error("API Key not set correctly.");
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Xin chào, bạn là ai?";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini Response:", text);
    console.log("Status: SUCCESS");
  } catch (error) {
    console.error("Gemini Error:", error.message);
    console.log("Status: FAILED");
  }
}

testGemini();
