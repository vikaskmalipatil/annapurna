const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { analyzeWeight } = require('./geminiService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Annapurna AI Backend Running',
    status: 'healthy',
    endpoints: {
      analyze: 'POST /api/analyze-weight'
    }
  });
});

// Weight analysis endpoint
app.post('/api/analyze-weight', async (req, res) => {
  try {
    const { image, allocatedQuota } = req.body;
    
    // Validation
    if (!image) {
      return res.status(400).json({ 
        error: 'Missing required field: image' 
      });
    }
    
    if (!allocatedQuota || allocatedQuota <= 0) {
      return res.status(400).json({ 
        error: 'Invalid allocatedQuota. Must be a positive number.' 
      });
    }
    
    console.log('📊 Analyzing weight for quota:', allocatedQuota, 'kg');
    
    // Call Gemini AI service
    const result = await analyzeWeight(image, allocatedQuota);
    
    console.log('✅ Analysis complete:', result);
    
    res.json(result);
    
  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze weight',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Ready to receive AI analysis requests`);
});