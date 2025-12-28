const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI("AIzaSyB_OPIvy7gx7VjUG__Zx1aUtEaqxaAREwk");

const analyzeWeight = async (base64Image, allocatedQuota) => {
  try {
    const prompt = `
You are analyzing an image showing weight written on paper.

CONTEXT:
Expected weight: ${allocatedQuota} kg

YOUR TASK:
1. Read the weight written on the paper
2. Extract the numeric value in kilograms
3. Compare with expected: ${allocatedQuota} kg

APPROVAL RULES:
- APPROVE if weight is between ${allocatedQuota - 0.2} and ${allocatedQuota + 0.2} kg
- REJECT if weight is less than ${allocatedQuota - 0.2} kg
- REJECT if weight is more than ${allocatedQuota + 0.2} kg
- REJECT if text is unclear

OUTPUT (JSON only, no markdown):
{
  "detectedWeight": <number>,
  "allocatedQuota": ${allocatedQuota},
  "approved": <true or false>,
  "reason": "<brief explanation>",
  "confidence": <0.0 to 1.0>
}
`;
    
    console.log('🤖 Sending to Gemini...');
    
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro'
    });
    
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: 'image/jpeg'
      }
    };
    
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    console.log('📄 Raw response:', text);
    
    const jsonText = text.replace(/```json\n?|\n?```/g, '').trim();
    const parsedResult = JSON.parse(jsonText);
    
    console.log('✅ Parsed result:', parsedResult);
    
    return parsedResult;
    
  } catch (error) {
    console.error('❌ Gemini error:', error.message);
    console.error('Full error:', error);
    
    return {
      detectedWeight: 0,
      allocatedQuota: allocatedQuota,
      approved: false,
      reason: `AI analysis failed: ${error.message}`,
      confidence: 0
    };
  }
};

module.exports = { analyzeWeight };

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyB_OPIvy7gx7VjUG__Zx1aUtEaqxaAREwk");

// export async function detectWeightFromImage(imageBase64) {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = "Read the number and unit written on this paper and return ONLY the weight in kilograms as a number. Example: 2kg should return 2";

//   const result = await model.generateContent([
//     { text: prompt },
//     {
//       inlineData: {
//         mimeType: "image/png",
//         data: imageBase64
//       }
//     }
//   ]);

//   const response = result.response.text().trim();
//   return parseFloat(response);
// }
// // import { GoogleGenerativeAI } from "@google/generative-ai";

// // const genAI = new GoogleGenerativeAI("AIzaSyB_OPIvy7gx7VjUG__Zx1aUtEaqxaAREwk");

// // export async function analyzeWeight(imageBase64, quotaKg) {
// //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// //   const prompt = `Extract ONLY the weight in kilograms written on the paper shown in the image. Then compare it with the allocated quota (${quotaKg} kg).
// //   Respond strictly in JSON format:
// //   { "detectedWeight": number, "approved": boolean, "reason": string, "confidence": number }`;

// //   const result = await model.generateContent([
// //     { text: prompt },
// //     {
// //       inlineData: {
// //         mimeType: "image/jpeg",
// //         data: imageBase64.split(",")[1] // remove base64 header
// //       }
// //     }
// //   ]);

// //   const responseText = result.response.text().trim();
// //   return JSON.parse(responseText);
// // }
