
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [accountType, setAccountType] = useState("worker"); // "worker" or "client"
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Jina lako linahitajika";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Barua pepe inahitajika";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Barua pepe si sahihi";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Mahali pahali inahitajika";
    }

    if (!formData.password) {
      newErrors.password = "Nenosiri linahitajika";
    } else if (formData.password.length < 6) {
      newErrors.password = "Nenosiri lazima liwe na angalau herufi 6";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Thibitisha nenosiri";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Nenosiri haulingani";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Lazima kubali masharti na sera ya faragha";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log("Account created:", { ...formData, accountType });
      // TODO: Call actual signup API
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-4 leading-tight">
            Kazi
            <br />
            <span className="text-4xl">Mikononi</span>
          </h1>
          <p className="text-white/80 text-xl">Tengeneza akaunti yako</p>
          <p className="text-white/60 text-lg mt-2">Jiunge na jamii ya wafanyakazi na wateja</p>
        </div>

        {/* Demo Mode Alert */}
        <div className="bg-blue-400/20 border border-blue-400/30 rounded-2xl p-4 mb-8 text-center">
          <p className="text-blue-300 text-sm">
            <strong>Demo Mode:</strong> Tengeneza akaunti kwa kujaribu. Data itahifadhiwa karibu na mtandaoni.
          </p>
        </div>

        {/* Account Type Selection */}
        <div className="mb-12">
          <p className="text-white/90 text-lg font-medium mb-4">Ninataka</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAccountType("worker")}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center space-x-3 ${
                accountType === "worker"
                  ? "bg-blue-500/30 border-blue-400 text-white"
                  : "bg-white/10 border-white/30 text-white/70 hover:border-white/50"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-semibold text-lg">Pata Kazi</span>
            </button>

            <button
              type="button"
              onClick={() => setAccountType("client")}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center space-x-3 ${
                accountType === "client"
                  ? "bg-blue-500/30 border-blue-400 text-white"
                  : "bg-white/10 border-white/30 text-white/70 hover:border-white/50"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4m0 0L4 7m16 0l-8 4m0 0l8 4m-8-4v8m0 0l-8-4m8 4l8-4"
                />
              </svg>
              <span className="font-semibold text-lg">Ajiri Wafanyakazi</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Full Name */}
          <div>
            <label className="block text-white/90 text-lg font-medium mb-2">
              👤 Jina Kamili
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              className={`w-full p-4 rounded-2xl text-lg bg-white/20 backdrop-blur-xl border-2 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all ${
                errors.fullName ? "border-red-400" : "border-white/30 focus:border-yellow-400"
              }`}
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && (
              <p className="text-red-300 text-sm mt-2">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-white/90 text-lg font-medium mb-2">
              📧 Barua Pepe
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className={`w-full p-4 rounded-2xl text-lg bg-white/20 backdrop-blur-xl border-2 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all ${
                errors.email ? "border-red-400" : "border-white/30 focus:border-yellow-400"
              }`}
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-white/90 text-lg font-medium mb-2">
              📍 Mahali Pahali
            </label>
            <input
              type="text"
              name="location"
              placeholder="Nairobi, Westlands"
              className={`w-full p-4 rounded-2xl text-lg bg-white/20 backdrop-blur-xl border-2 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all ${
                errors.location ? "border-red-400" : "border-white/30 focus:border-yellow-400"
              }`}
              value={formData.location}
              onChange={handleInputChange}
            />
            {errors.location && (
              <p className="text-red-300 text-sm mt-2">{errors.location}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/90 text-lg font-medium mb-2">
              🔒 Nenosiri
            </label>
            <input
              type="password"
              name="password"
              placeholder="Nenosiri lako"
              className={`w-full p-4 rounded-2xl text-lg bg-white/20 backdrop-blur-xl border-2 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all ${
                errors.password ? "border-red-400" : "border-white/30 focus:border-yellow-400"
              }`}
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-white/90 text-lg font-medium mb-2">
              🔒 Thibitisha Nenosiri
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Thibitisha nenosiri"
              className={`w-full p-4 rounded-2xl text-lg bg-white/20 backdrop-blur-xl border-2 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all ${
                errors.confirmPassword ? "border-red-400" : "border-white/30 focus:border-yellow-400"
              }`}
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-300 text-sm mt-2">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms & Privacy */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="agreeTerms"
              id="agreeTerms"
              className="w-5 h-5 mt-1 rounded border-2 border-white/30 bg-white/20 text-yellow-400 focus:ring-yellow-400"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
            />
            <label htmlFor="agreeTerms" className="text-white/80 text-sm">
              Nakubali{" "}
              <a href="#" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Masharti ya Huduma
              </a>{" "}
              na{" "}
              <a href="#" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Sera ya Faragha
              </a>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-red-300 text-sm">{errors.agreeTerms}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 px-12 py-4 rounded-3xl text-xl font-black shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3 text-gray-900"
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
                <span>Inatengeneza...</span>
              </>
            ) : (
              "TENGENEZA AKAUNTI"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8 pt-8 border-t border-white/20">
          <p className="text-white/70 text-lg">
            Una akaunti tayari?{" "}
            <a href="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
              Ingia sasa
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;