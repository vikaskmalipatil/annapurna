// src/pages/FaceCapturePage.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FaceCapture from '../components/verification/FaceCapture';
import { ArrowLeft, Shield, User, Mail } from 'lucide-react';

function FaceCapturePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  useEffect(() => {
    if (!userData) {
      navigate('/user-login');
    }
  }, [userData, navigate]);

  const handleCaptureComplete = (verificationData) => {
    console.log('Face capture complete:', verificationData);
    navigate('/verification-result', {
      state: { verificationData }
    });
  };

  const handleBack = () => {
    navigate('/user-login');
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/90 hover:text-white mb-6 font-semibold transition-all duration-300 hover:gap-3 animate-slideInLeft"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Login
        </button>

        {/* User Info Card */}
        <div className="glass-effect rounded-2xl shadow-2xl p-6 mb-8 border border-white/20 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  Step 2: Face Verification
                </h1>
                <p className="text-gray-600 text-sm">AI-powered biometric authentication</p>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <User className="h-4 w-4" />
                <span className="font-mono font-semibold">{userData.userId.slice(0, 12)}...</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="font-medium">{userData.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Face Capture Component */}
        <FaceCapture
          userId={userData.userId}
          onCaptureComplete={handleCaptureComplete}
        />

        {/* Progress Indicator */}
        <div className="mt-10 flex justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="glass-effect rounded-full p-4 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3">
              {/* Step 1 - Complete */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700 hidden sm:inline">Login</span>
              </div>

              {/* Connector */}
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-indigo-500 rounded-full"></div>

              {/* Step 2 - Active */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="font-bold text-white">2</span>
                </div>
                <span className="text-sm font-semibold text-gray-700 hidden sm:inline">Verify</span>
              </div>

              {/* Connector */}
              <div className="w-16 h-1 bg-gray-300 rounded-full"></div>

              {/* Step 3 - Pending */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center shadow">
                  <span className="font-bold text-gray-500">3</span>
                </div>
                <span className="text-sm font-semibold text-gray-500 hidden sm:inline">Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaceCapturePage;