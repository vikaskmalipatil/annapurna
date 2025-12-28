// src/components/verification/VerificationResult.jsx
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ArrowRight, 
  RefreshCw, 
  AlertTriangle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function VerificationResult({ verificationData, onProceed, onRetry }) {
  const { faceValid, userId } = verificationData;
  const navigate = useNavigate();

  // Loading State
  if (faceValid === null) {
    return (
      <div className="w-full max-w-lg mx-auto animate-fadeIn">
        <div className="glass-effect rounded-2xl shadow-2xl p-10 border border-white/20 text-center">
          <div className="relative mb-8">
            <div className="w-28 h-28 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <Loader2 className="h-16 w-16 text-white animate-spin" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Verifying Your Identity
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Our AI is analyzing your facial features...
          </p>
        </div>
      </div>
    );
  }

  // ✅ SUCCESS STATE
  if (faceValid) {
    return (
      <div className="w-full max-w-lg mx-auto animate-fadeIn">
        <div className="glass-effect rounded-2xl shadow-2xl p-10 border border-white/20">
          <div className="flex flex-col items-center text-center">
            
            {/* Success Icon */}
            <div className="w-28 h-28 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl mb-8">
              <CheckCircle className="h-16 w-16 text-white animate-bounce" />
            </div>

            <h2 className="text-4xl font-bold text-green-600 mb-3">
              Verification Successful!
            </h2>

            <p className="text-gray-600 mb-8 text-lg">
              Your identity has been confirmed.
            </p>

            {/* Info */}
            <div className="w-full bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
              <div className="flex justify-between">
                <span className="font-semibold">User ID:</span>
                <span className="font-mono font-bold">
                  {userId.slice(0, 20)}...
                </span>
              </div>
            </div>

            {/* 🔹 EXISTING BUTTON */}
            <button
              onClick={onProceed}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg mb-4"
            >
              Proceed to Dashboard
              <ArrowRight className="h-6 w-6" />
            </button>

            {/* 🔹 NEW BUTTON (ADDED) */}
            <button
              onClick={() => navigate('/qrverify')}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-emerald-700 border-2 border-emerald-500 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all"
            >
              🔍 Proceed to QR Verification
            </button>

          </div>
        </div>
      </div>
    );
  }

  // ❌ FAILURE STATE (UNCHANGED)
  return (
    <div className="w-full max-w-lg mx-auto animate-fadeIn">
      <div className="glass-effect rounded-2xl shadow-2xl p-10 border border-white/20">
        <div className="flex flex-col items-center text-center">
          <XCircle className="h-16 w-16 text-red-600 mb-4" />
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Verification Failed
          </h2>

          <div className="flex flex-col w-full gap-3 mt-6">
            <button
              onClick={onRetry}
              className="w-full px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold"
            >
              <RefreshCw className="inline mr-2" /> Try Again
            </button>

            <button
              onClick={() => navigate('/user-login')}
              className="w-full px-8 py-4 bg-gray-200 rounded-xl font-bold"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationResult;
