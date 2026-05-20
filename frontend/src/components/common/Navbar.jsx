import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import {
  Briefcase,
  LayoutDashboard,
  Plus
} from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { unreadCount } = useChat();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#0a4fd4] rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>

            <span className="font-bold text-xl text-[#0a4fd4]">
              Kazi Mikononi
            </span>
          </Link>

          {/* CENTER LINKS */}
          <div className="hidden md:flex items-center space-x-8">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#0a4fd4] font-semibold"
                  : "text-slate-600 hover:text-[#0a4fd4] transition-colors"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/workers"
              className={({ isActive }) =>
                isActive
                  ? "text-[#0a4fd4] font-semibold"
                  : "text-slate-600 hover:text-[#0a4fd4] transition-colors"
              }
            >
              Workers
            </NavLink>

            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                isActive
                  ? "text-[#0a4fd4] font-semibold"
                  : "text-slate-600 hover:text-[#0a4fd4] transition-colors"
              }
            >
              Jobs
            </NavLink>

            {/* DASHBOARD */}
            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#0a4fd4] font-semibold flex items-center gap-2"
                    : "text-slate-600 hover:text-[#0a4fd4] transition-colors flex items-center gap-2"
                }
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </NavLink>
            )}

            {/* CHAT */}
            {isAuthenticated && (
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#0a4fd4] font-semibold flex items-center"
                    : "text-slate-600 hover:text-[#0a4fd4] transition-colors flex items-center"
                }
              >
                Messages

                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </NavLink>
            )}

            {/* PROFILE */}
            {isAuthenticated && (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#0a4fd4] font-semibold"
                    : "text-slate-600 hover:text-[#0a4fd4] transition-colors"
                }
              >
                My Profile
              </NavLink>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-4">

            {isAuthenticated && (
              <button
                onClick={() => navigate("/post-job")}
                className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
              >
                <Plus className="w-4 h-4" />
                Post Job
              </button>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-4">

                {/* USER AVATAR */}
                <Link
                  to="/profile"
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center font-bold text-slate-700"
                >
                  {(user?.full_name || "U")[0]}
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-[#0a4fd4] transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-[#0a4fd4] hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;