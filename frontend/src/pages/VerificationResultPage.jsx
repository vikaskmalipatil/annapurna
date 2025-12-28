// src/pages/VerificationResultPage.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VerificationResult from '../components/verification/VerificationResult';
import { Sparkles, Info } from 'lucide-react';

function VerificationResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const verificationData = location.state?.verificationData;
  const [mockVerificationData, setMockVerificationData] = useState(null);

  useEffect(() => {
    if (!verificationData) {
      navigate('/user-login');
      return;
    }

    // Simulate AI verification with realistic delay
    const simulateAIVerification = () => {
      setTimeout(() => {
        const mockResult = {
          ...verificationData,
          faceValid: Math.random() > 0.2 // 80% success rate
        };
        setMockVerificationData(mockResult);
      }, 2500);
    };

    simulateAIVerification();
  }, [verificationData, navigate]);

  const handleProceed = () => {
    console.log('Proceeding to dashboard');
    navigate('/dashboard', {
      state: { userData: mockVerificationData }
    });
  };

  const handleRetry = () => {
    navigate('/face-capture', {
      state: { userData: { userId: verificationData.userId } }
    });
  };

  if (!verificationData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur rounded-full mb-6 animate-pulse">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Verification Result
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Step 3 of 3: Identity Confirmation
          </p>
        </div>

        {/* Verification Result Component */}
        <VerificationResult
          verificationData={mockVerificationData || verificationData}
          onProceed={handleProceed}
          onRetry={handleRetry}
        />

        {/* Development Note */}
        <div className="mt-10 text-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="glass-effect rounded-2xl p-6 max-w-2xl mx-auto border border-yellow-200/50">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm text-gray-700">
                  <strong className="text-yellow-700">Development Note:</strong> This uses mock AI verification (80% success rate) for testing. 
                  Member 3 (ai-scale branch) will integrate real AI validation using Gemini Vision API.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-10 flex justify-center animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <div className="glass-effect rounded-full p-4 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3">
              {/* Step 1 */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white hidden sm:inline">Login</span>
              </div>

              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>

              {/* Step 2 */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white hidden sm:inline">Verify</span>
              </div>

              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-purple-500 rounded-full"></div>

              {/* Step 3 */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="font-bold text-white">3</span>
                </div>
                <span className="text-sm font-semibold text-white hidden sm:inline">Result</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationResultPage;