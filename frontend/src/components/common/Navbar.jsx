import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { Briefcase, Home, Search, MessageSquare, Plus } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { unreadCount } = useChat();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors font-medium ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
    }`;

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-[#0a4fd4] rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[#0a4fd4]">
              Kazi Mikononi
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" end className={({ isActive }) => `text-sm font-semibold transition-colors pb-1 border-b-2 ${isActive ? 'text-[#0a4fd4] border-[#0a4fd4]' : 'text-slate-600 border-transparent hover:text-[#0a4fd4]'}`}>
              Home
            </NavLink>
            
            <NavLink to="/workers" className={({ isActive }) => `text-sm font-semibold transition-colors pb-1 border-b-2 ${isActive ? 'text-[#0a4fd4] border-[#0a4fd4]' : 'text-slate-600 border-transparent hover:text-[#0a4fd4]'}`}>
              Find Workers
            </NavLink>

            <NavLink to="/jobs" className={({ isActive }) => `text-sm font-semibold transition-colors pb-1 border-b-2 ${isActive ? 'text-[#0a4fd4] border-[#0a4fd4]' : 'text-slate-600 border-transparent hover:text-[#0a4fd4]'}`}>
              Jobs
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={({ isActive }) => `text-sm font-semibold transition-colors pb-1 border-b-2 ${isActive ? 'text-[#0a4fd4] border-[#0a4fd4]' : 'text-slate-600 border-transparent hover:text-[#0a4fd4]'}`}>
                  Dashboard
                </NavLink>
                <NavLink to="/chat" className={({ isActive }) => `text-sm font-semibold transition-colors pb-1 border-b-2 flex items-center ${isActive ? 'text-[#0a4fd4] border-[#0a4fd4]' : 'text-slate-600 border-transparent hover:text-[#0a4fd4]'}`}>
                  Messages
                  {unreadCount > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => navigate('/post-job')}
              className="hidden sm:flex items-center space-x-1 bg-[#00c978] hover:bg-[#00b16a] text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Post Job</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors">
                  {(user?.name || 'U')[0].toUpperCase()}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-[#0a4fd4] transition-colors">
                  Log In
                </Link>
                <Link to="/register" className="bg-[#0a4fd4] hover:bg-blue-800 text-white px-6 py-2 rounded-full font-semibold text-sm transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
