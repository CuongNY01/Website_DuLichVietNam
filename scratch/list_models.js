const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // There is no direct listModels in the client SDK like this usually, 
    // but we can try to hit a known model.
    
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];
    for (const m of models) {
      try {
        const model = genAI.getGenerativeModel({ model: m });
        await model.generateContent("test");
        console.log(`Model ${m} is AVAILABLE`);
      } catch (e) {
        console.log(`Model ${m} is NOT AVAILABLE: ${e.message}`);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

listModels();
