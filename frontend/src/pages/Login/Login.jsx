// Login Page
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirect after login

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // await login(email, password);
    
    setTimeout(() => {
      setLoading(false);
      // TODO: Redirect to dashboard
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-4 leading-tight">
            Kazi
            <br />
            <span className="text-4xl">Mikononi</span>
          </h1>
          <p className="text-white/80 text-xl">Ingia kwenye akaunti yako</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Email Input */}
          <div>
            <label className="block text-white/90 text-lg font-medium mb-3">
              📧 Barua Pepe
            </label>
            <input
              type="email"
              placeholder="fundi@example.com"
              className="w-full p-6 rounded-2xl text-xl bg-white/20 backdrop-blur-xl border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-white/90 text-lg font-medium mb-3">
              🔒 Nenosiri
            </label>
            <input
              type="password"
              placeholder="Nenosiri lako"
              className="w-full p-6 rounded-2xl text-xl bg-white/20 backdrop-blur-xl border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-yellow-400 hover:text-yellow-300 text-lg font-medium transition-colors"
            >
              Nimesahau nenosiri
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 px-12 py-6 rounded-3xl text-2xl font-black shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            {loading ? (
              <>
                <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Ingingia...</span>
              </>
            ) : (
              "INGIA"
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-8 pt-8 border-t border-white/20">
          <p className="text-white/70 text-lg">
            Hakuna akaunti?{" "}
            <a href="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
              Sajili sasa
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;