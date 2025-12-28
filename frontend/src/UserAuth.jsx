import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import FaceCapturePage from './pages/FaceCapturePage';
import VerificationResultPage from './pages/VerificationResultPage';
import { CheckCircle, Package } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/user-login" replace />} />

        {/* Authentication Routes */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/face-capture" element={<FaceCapturePage />} />
        <Route path="/verification-result" element={<VerificationResultPage />} />

        {/* Dashboard Placeholder */}
        <Route 
          path="/dashboard" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 flex items-center justify-center p-6">
              <div className="glass-effect rounded-2xl shadow-2xl p-12 text-center max-w-2xl border border-white/20 animate-fadeIn">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle className="h-14 w-14 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  🎉 Success!
                </h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Dashboard Coming Soon
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  This will be implemented by <strong>Member 4</strong> (ui-pages branch)
                </p>
                <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-xl mb-6">
                  <Package className="h-5 w-5 text-blue-600" />
                  <p className="text-sm text-blue-800">
                    Your authentication module is complete and working perfectly!
                  </p>
                </div>
                <a 
                  href="/user-login"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                >
                  Back to Login
                </a>
              </div>
            </div>
          } 
        />

        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center p-6">
              <div className="glass-effect rounded-2xl shadow-2xl p-12 text-center max-w-lg border border-white/20 animate-fadeIn">
                <h1 className="text-8xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
                  404
                </h1>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                  The page you're looking for doesn't exist.
                </p>
                <a 
                  href="/user-login"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                >
                  Go to Login
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;