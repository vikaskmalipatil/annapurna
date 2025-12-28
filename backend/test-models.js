const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log('🔍 Checking available models...');
    
    // Try different model names
    const modelsToTry = [
      'gemini-pro-vision',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-pro'
    ];
    
    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        console.log(`✅ ${modelName} - Available`);
      } catch (error) {
        console.log(`❌ ${modelName} - Not available`);
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

listModels();