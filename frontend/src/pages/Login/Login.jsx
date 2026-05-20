import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // NEW: error state
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();
  const { login } = useAuth();

  // =========================
  // VALIDATION (frontend first)
  // =========================
  const validate = () => {
    const errors = {};

    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // =========================
  // HANDLE LOGIN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await login({ email, password });

      console.log("LOGIN SUCCESS:", response);

      // success → clear errors
      setError(null);
      setFieldErrors({});

      navigate("/dashboard");

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      // =========================
      // SMART ERROR HANDLING
      // =========================

      if (status === 401) {
        setError("Incorrect email or password. Please try again.");
      } else if (status === 404) {
        setError("Account not found. Please check your email or sign up.");
      } else if (status === 400) {
        setError(message || "Invalid request. Please check your input.");
      } else if (!err?.response) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(message || "Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-400/20 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-slate-900 font-outfit">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-base text-slate-600">
          Sign in to your Kazi Mikononi account
        </p>
      </div>

      {/* FORM */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl py-10 px-6 shadow-2xl sm:rounded-3xl sm:px-10 border border-slate-100">

          {/* GLOBAL ERROR */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 transition-all ${
                    fieldErrors.email
                      ? "border-red-400 focus:ring-red-400"
                      : "border-slate-200 focus:ring-blue-500"
                  }`}
                  placeholder="test@example.com"
                />
              </div>

              {fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 transition-all ${
                    fieldErrors.password
                      ? "border-red-400 focus:ring-red-400"
                      : "border-slate-200 focus:ring-blue-500"
                  }`}
                  placeholder="••••••••"
                />
              </div>

              {fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25" />
                    <path fill="white" opacity="0.75" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Log In
                </>
              )}
            </button>
          </form>

          {/* SIGNUP LINK */}
          <div className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-500 inline-flex items-center"
            >
              Sign up <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;