export const analyzeWeight = async (imageData, allocatedQuota) => {
  try {
    console.log('🎯 analyzeWeight function called!');
    console.log('📊 Quota:', allocatedQuota);
    console.log('🖼️ Image data length:', imageData?.length);
    
    // Remove data URL prefix to get pure base64
    const base64Image = imageData.split(',')[1];
    console.log('✂️ Base64 extracted, length:', base64Image?.length);
    
    console.log('📡 Sending request to backend...');
    
    const response = await fetch('http://localhost:5000/api/analyze-weight', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        image: base64Image,
        allocatedQuota: allocatedQuota
      })
    });
    
    console.log('📥 Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Backend error:', errorData);
      throw new Error(errorData.message || 'Failed to analyze image');
    }
    
    const data = await response.json();
    console.log('✅ AI Result received:', data);
    return data;
    
  } catch (error) {
    console.error('💥 Gemini API error:', error);
    throw error;
  }
};
