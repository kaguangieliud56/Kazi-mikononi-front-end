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
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors shadow-sm">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl leading-tight text-slate-900">
              Kazi <br /> Mikononi
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" end className={navLinkClass}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            
            <NavLink to="/workers" className={navLinkClass}>
              <Search className="w-4 h-4" />
              <span>Find Workers</span>
            </NavLink>

            <NavLink to="/jobs" className={navLinkClass}>
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  <span>Dashboard</span>
                </NavLink>
                <NavLink to="/chat" className={navLinkClass}>
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
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
          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors">
              <Plus className="w-4 h-4" />
              <span>Post Job</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-2 pl-4 border-l border-slate-200">
                <Link to="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors">
                  {(user?.name || 'U')[0].toUpperCase()}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-600 hover:text-red-600 font-medium transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-2 pl-4 border-l border-slate-200">
                <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium px-2 py-2 transition-colors">
                  Log In
                </Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm transition-colors">
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
