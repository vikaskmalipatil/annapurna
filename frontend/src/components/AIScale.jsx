import React, { useState, useRef, useEffect } from 'react';
import { analyzeWeight } from '../services/geminiService';
import { logTransaction } from '../services/firestoreService';
import { getUserQuota } from '../services/userService';

const AIScale = ({ rationCardNumber }) => {
  // State variables
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Fetch user data from Firebase when component loads
  useEffect(() => {
    const fetchUserData = async () => {
      if (!rationCardNumber) {
        setError('No ration card number provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getUserQuota(rationCardNumber);
        setUserData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [rationCardNumber]);

  // Function to start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      alert('Camera access denied. Please enable camera permissions in your browser settings.');
      console.error('Camera error:', error);
    }
  };

  // Function to stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      setIsCameraOn(false);
    }
  };

  // Function to capture image from video stream
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (canvas && video) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to base64 image (JPEG format, 80% quality)
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
      
      // Don't stop camera - keep it running for verification
    }
  };

  // Function to analyze with AI and log transaction
  const handleAnalyze = async () => {
   if (!capturedImage) {
  alert('Capture the weight image first');
  return;
}


    if (!userData || !userData.allocatedGrainKg) {
      alert('User data missing. Please try again.');
      return;
    }

    const quotaKg = userData.allocatedGrainKg;
    const userId = userData.userId;

    setIsProcessing(true);
    
    try {
      console.log('📤 Sending image to AI for analysis...');
      
      // Step 1: Call Gemini API through backend
      const aiResult = await analyzeWeight(capturedImage, quotaKg);
      console.log('🤖 AI Result:', aiResult);
      
      // Step 2: Log transaction to Firestore
      console.log('💾 Logging transaction to Firestore...');
      const transactionId = await logTransaction({
        userId,
        item: 'grain',
        quotaKg,
        weighedKg: aiResult.detectedWeight,
        aiApproved: aiResult.approved,
        reason: aiResult.reason,
        imageUrl: capturedImage
      });
      
      console.log('✅ Transaction logged with ID:', transactionId);
      
      // Step 3: Show result to user
      setResult(aiResult);
      
      // Stop camera after verification
      stopCamera();
      
      alert(aiResult.approved 
        ? '✅ Transaction Approved! Ration dispensed.' 
        : '❌ Transaction Rejected. Please check weight.');
      
    } catch (error) {
      console.error('❌ Analysis failed:', error);
      alert(`Failed to process: ${error.message}. Please try again.`);
    } finally {
      setIsProcessing(false);
    }

    const aiResult = await analyzeWeight(capturedImage, quotaKg);


  };

  // Function to reset and start over
  const handleReset = () => {
    setCapturedImage(null);
    setResult(null);
    stopCamera();
  };

  return (
    <div className="ai-scale-container" style={styles.container}>
      <h2 style={styles.title}>🤖 AI Weighing Verification System</h2>
      
      {/* User Info Display */}
      {loading ? (
        <div style={styles.userInfo}>
          <p>⏳ Loading user data...</p>
        </div>
      ) : error ? (
        <div style={{...styles.userInfo, borderColor: '#e74c3c', background: '#fadbd8'}}>
          <p style={{color: '#e74c3c'}}>❌ Error: {error}</p>
        </div>
      ) : userData ? (
        <div style={styles.userInfo}>
          <h3 style={styles.sectionTitle}>Customer Details</h3>
          <p><strong>Ration Card:</strong> {userData.rationCardNumber}</p>
          <p><strong>Allocated Grain:</strong> {userData.allocatedGrainKg} kg</p>
          <p><strong>Allocated Oil:</strong> {userData.allocatedOilKg} kg</p>
          <p style={styles.instruction}>
            📋 <em>Admin & User verification completed. Ready for weighing.</em>
          </p>
        </div>
      ) : null}

      {/* Show rest of interface only if data loaded successfully */}
      {!loading && !error && userData && (
        <>
          {/* Camera Section - Always visible until verification done */}
          {!result && (
            <div className="camera-section" style={styles.cameraSection}>
              <h3 style={styles.sectionTitle}>Step 1: Capture Written Weight</h3>
              {!isCameraOn ? (
                <button onClick={startCamera} style={styles.primaryButton}>
                  📷 Start Camera
                </button>
              ) : (
                <div>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline
                    style={styles.video}
                  />
                  <br />
                  
                  {/* Show capture button and preview side by side */}
                  <div style={styles.buttonGroup}>
                    <button onClick={captureImage} style={styles.primaryButton}>
                      📸 Capture Weight
                    </button>
                    
                    {capturedImage && (
                      <button 
                        onClick={handleAnalyze} 
                        disabled={isProcessing}
                        style={{
                          ...styles.primaryButton,
                          backgroundColor: '#3498db',
                          ...(isProcessing && styles.disabledButton)
                        }}
                      >
                        {isProcessing ? '⏳ Verifying...' : '✅ Verify Weight'}
                      </button>
                    )}
                  </div>
                  
                  {/* Show captured image preview alongside camera */}
                  {capturedImage && (
                    <div style={styles.previewSmall}>
                      <p style={styles.hint}>📸 Captured Image:</p>
                      <img 
                        src={capturedImage} 
                        alt="Captured" 
                        style={styles.imageSmall}
                      />
                    </div>
                  )}
                  
                  {isProcessing && (
                    <p style={styles.processing}>
                      🔍 AI is reading the weight and comparing with quota ({userData.allocatedGrainKg} kg)...
                    </p>
                  )}
                </div>
              )}
              <p style={styles.hint}>
                💡 Tip: Write the weight on paper (e.g., "10 kg") and show it to the camera
              </p>
            </div>
          )}
          
          {/* AI Analysis Result - Only show after verification */}
          {result && (
            <div style={{
              ...styles.result,
              ...(result.approved ? styles.approved : styles.rejected)
            }}>
              <div style={styles.resultIcon}>
                {result.approved ? '✅' : '❌'}
              </div>
              <h3 style={styles.resultTitle}>
                {result.approved ? 'TRANSACTION APPROVED' : 'TRANSACTION REJECTED'}
              </h3>
              <div style={styles.resultDetails}>
                <p><strong>Detected Weight:</strong> {result.detectedWeight} kg</p>
                <p><strong>Allocated Quota:</strong> {userData.allocatedGrainKg} kg</p>
                <p><strong>Difference:</strong> {Math.abs(result.detectedWeight - userData.allocatedGrainKg).toFixed(2)} kg</p>
                <p><strong>AI Reasoning:</strong> {result.reason}</p>
                <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(0)}%</p>
              </div>
              <button onClick={handleReset} style={styles.primaryButton}>
                ✅ Process Next Customer
              </button>
              <p style={styles.hint}>
                💾 Transaction has been logged to Firestore with timestamp
              </p>
            </div>
          )}
        </>
      )}
      
      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

// Inline styles for better presentation
const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px'
  },
  sectionTitle: {
    color: '#34495e',
    borderBottom: '2px solid #3498db',
    paddingBottom: '5px',
    marginBottom: '15px'
  },
  userInfo: {
    background: '#ecf0f1',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '2px solid #3498db'
  },
  instruction: {
    color: '#16a085',
    marginTop: '10px'
  },
  cameraSection: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '2px dashed #95a5a6',
    textAlign: 'center'
  },
  video: {
    width: '100%',
    maxWidth: '600px',
    border: '3px solid #2c3e50',
    borderRadius: '10px',
    marginBottom: '10px'
  },
  previewSmall: {
    marginTop: '15px',
    padding: '10px',
    background: '#f8f9fa',
    borderRadius: '8px'
  },
  imageSmall: {
    width: '200px',
    border: '2px solid #2c3e50',
    borderRadius: '8px',
    marginTop: '5px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  primaryButton: {
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'background 0.3s',
    margin: '5px'
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
    cursor: 'not-allowed'
  },
  result: {
    padding: '25px',
    borderRadius: '10px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  approved: {
    backgroundColor: '#d5f4e6',
    border: '3px solid #27ae60'
  },
  rejected: {
    backgroundColor: '#fadbd8',
    border: '3px solid #e74c3c'
  },
  resultIcon: {
    fontSize: '80px',
    marginBottom: '10px'
  },
  resultTitle: {
    fontSize: '24px',
    marginBottom: '15px'
  },
  resultDetails: {
    textAlign: 'left',
    background: 'white',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px'
  },
  processing: {
    color: '#3498db',
    fontStyle: 'italic',
    marginTop: '10px',
    fontWeight: 'bold'
  },
  hint: {
    fontSize: '14px',
    color: '#7f8c8d',
    fontStyle: 'italic',
    marginTop: '10px'
  }
};

export default AIScale;