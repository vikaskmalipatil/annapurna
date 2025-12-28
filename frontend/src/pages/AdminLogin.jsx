import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/verify");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700">

      {/* Decorative blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-30"></div>

      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-sm bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30"
      >
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Admin Login
        </h2>
        <p className="text-center text-gray-600 text-sm mt-2 mb-6">
          Secure access for administrators
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold tracking-wide shadow-lg hover:scale-[1.02] hover:shadow-xl transition-transform duration-200"
        >
          Login
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm text-center mt-4 font-medium">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}