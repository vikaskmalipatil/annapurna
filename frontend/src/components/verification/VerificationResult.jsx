// src/components/verification/VerificationResult.jsx
import { CheckCircle, XCircle, Loader2, ArrowRight, RefreshCw, AlertTriangle } from 'lucide-react';

function VerificationResult({ verificationData, onProceed, onRetry }) {
  const { faceValid, userId } = verificationData;

  // Loading State
  if (faceValid === null) {
    return (
      <div className="w-full max-w-lg mx-auto animate-fadeIn">
        <div className="glass-effect rounded-2xl shadow-2xl p-10 border border-white/20 text-center">
          <div className="relative mb-8">
            <div className="w-28 h-28 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <Loader2 className="h-16 w-16 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 border-4 border-indigo-300 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Verifying Your Identity
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Our AI is analyzing your facial features...
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
              <span className="text-sm text-gray-700">Analyzing features</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">This may take a few seconds...</p>
        </div>
      </div>
    );
  }

  // Success State
  if (faceValid) {
    return (
      <div className="w-full max-w-lg mx-auto animate-fadeIn">
        <div className="glass-effect rounded-2xl shadow-2xl p-10 border border-white/20">
          <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="relative mb-8">
              <div className="w-28 h-28 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle className="h-16 w-16 text-white animate-bounce" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 border-4 border-green-300 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              Verification Successful!
            </h2>
            
            <p className="text-gray-600 mb-8 text-lg">
              Your identity has been confirmed. Welcome back! 🎉
            </p>

            {/* Info Card */}
            <div className="w-full bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">User ID:</span>
                  <span className="font-mono font-bold text-gray-900 text-sm">{userId.slice(0, 20)}...</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Status:</span>
                  <span className="flex items-center gap-2 font-bold text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Confidence:</span>
                  <span className="font-bold text-green-600">98%</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={onProceed}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
            >
              <span>Proceed to Dashboard</span>
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Failure State
  return (
    <div className="w-full max-w-lg mx-auto animate-fadeIn">
      <div className="glass-effect rounded-2xl shadow-2xl p-10 border border-white/20">
        <div className="flex flex-col items-center text-center">
          {/* Error Icon */}
          <div className="relative mb-8">
            <div className="w-28 h-28 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <XCircle className="h-16 w-16 text-white" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 border-4 border-red-300 rounded-full animate-ping opacity-50"></div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Verification Failed
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg">
            We couldn't verify your identity. Don't worry, you can try again!
          </p>

          {/* Error Reasons */}
          <div className="w-full bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-bold text-red-900 mb-3">Possible reasons:</h3>
                <ul className="text-sm text-red-800 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5"></div>
                    <span>Face doesn't match registered profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5"></div>
                    <span>Poor image quality or lighting conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5"></div>
                    <span>Face not clearly visible or obstructed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5"></div>
                    <span>Multiple faces detected in frame</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onRetry}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
            >
              <RefreshCw className="h-5 w-5" />
              Try Again
            </button>
            
            <button
              onClick={() => window.location.href = '/user-login'}
              className="w-full px-8 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
            >
              Back to Login
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Need assistance?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerificationResult;