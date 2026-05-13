import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, MapPin, Lock, Briefcase, UserCircle, ArrowRight } from "lucide-react";

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
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
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
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-400/10 blur-[100px]" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-slate-900 tracking-tight font-outfit">
          Create an account
        </h2>
        <p className="mt-2 text-center text-base text-slate-600">
          Join Kazi Mikononi and connect with opportunities
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-white/80 backdrop-blur-xl py-10 px-6 shadow-2xl sm:rounded-3xl sm:px-10 border border-slate-100">
          
          {/* Account Type Selection */}
          <div className="mb-8">
            <p className="text-sm font-medium text-slate-700 mb-3">I want to:</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAccountType("worker")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-2 ${
                  accountType === "worker"
                    ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Briefcase className={`w-6 h-6 ${accountType === "worker" ? "text-blue-600" : "text-slate-400"}`} />
                <span className="font-semibold text-sm">Find Work</span>
              </button>

              <button
                type="button"
                onClick={() => setAccountType("client")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-2 ${
                  accountType === "client"
                    ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <UserCircle className={`w-6 h-6 ${accountType === "client" ? "text-blue-600" : "text-slate-400"}`} />
                <span className="font-semibold text-sm">Hire Workers</span>
              </button>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-slate-50/50 ${
                      errors.fullName ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-slate-200 focus:border-blue-500"
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-slate-50/50 ${
                      errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-slate-200 focus:border-blue-500"
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-slate-50/50 ${
                    errors.location ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-slate-200 focus:border-blue-500"
                  }`}
                  placeholder="Nairobi, Westlands"
                />
              </div>
              {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-slate-50/50 ${
                      errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-slate-200 focus:border-blue-500"
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-slate-50/50 ${
                      errors.confirmPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-slate-200 focus:border-blue-500"
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Terms */}
            <div className="pt-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer transition-colors"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="agreeTerms" className="text-slate-600 cursor-pointer">
                    I agree to the <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">Privacy Policy</a>
                  </label>
                  {errors.agreeTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeTerms}</p>}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors inline-flex items-center">
              Log In <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;