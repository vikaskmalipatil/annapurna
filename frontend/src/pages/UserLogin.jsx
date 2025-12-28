// src/pages/UserLogin.jsx
import { useNavigate } from 'react-router-dom';
import UserLoginForm from '../components/auth/UserLoginForm';
import { Shield, Fingerprint, CheckCircle } from 'lucide-react';

function UserLogin() {
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    console.log('Login successful:', userData);
    navigate('/face-capture', { state: { userData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur rounded-full mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Annapurna PDS System
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Public Distribution System - Secure Authentication
          </p>
        </div>

        {/* Login Form */}
        <UserLoginForm onLoginSuccess={handleLoginSuccess} />

        {/* How it Works Section */}
        <div className="mt-12 text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="glass-effect rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <span className="font-bold text-2xl text-white">1</span>
                </div>
                <Shield className="h-8 w-8 text-purple-600 mb-3" />
                <h4 className="font-bold text-gray-800 mb-2">Login</h4>
                <p className="text-sm text-gray-600">Authenticate with your email credentials</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <span className="font-bold text-2xl text-white">2</span>
                </div>
                <Fingerprint className="h-8 w-8 text-indigo-600 mb-3" />
                <h4 className="font-bold text-gray-800 mb-2">Verify</h4>
                <p className="text-sm text-gray-600">AI-powered face recognition</p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <span className="font-bold text-2xl text-white">3</span>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-gray-800 mb-2">Access</h4>
                <p className="text-sm text-gray-600">Get your ration securely</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/80 text-sm animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <p>© 2025 Annapurna PDS System - Secure, Fair, Transparent</p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;