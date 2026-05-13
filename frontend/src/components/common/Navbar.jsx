// Navbar Component
/**
 * Navbar.jsx – Auth-Aware Navigation (Backend Integration Role)
 *
 * Logic owned here:
 *  - Shows/hides nav links based on authentication state (useAuth)
 *  - Displays unread message count badge (useChat → unreadCount)
 *  - Handles logout (clears token, redirects home)
 *
 * Visual design & styling is handled by the partner.
 */

import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { unreadCount } = useChat();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clears kazi_token + kazi_user from localStorage
    navigate('/');     // send user back to home
  };

  return (
    <nav className="glass sticky-nav">
      <div className="nav-content">

        {/* ── Logo ─────────────────────────────────────── */}
        <Link to="/" className="logo gradient-text">
          Kazi Mikononi
        </Link>

        {/* ── Nav links: public + auth-gated ───────────── */}
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>

          {/* Only visible when logged in */}
          {isAuthenticated && (
            <>
              <NavLink to="/jobs" className={({ isActive }) => isActive ? 'active' : ''}>
                Jobs
              </NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                Dashboard
              </NavLink>
              <NavLink to="/chat" className={({ isActive }) => isActive ? 'active' : ''}>
                Messages
                {/* Unread badge — data comes from ChatContext */}
                {unreadCount > 0 && (
                  <span className="nav-badge">{unreadCount}</span>
                )}
              </NavLink>
            </>
          )}
        </div>

        {/* ── Actions: auth-dependent ───────────────────── */}
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              {/* Avatar shows first letter of user name */}
              <Link to="/profile" className="profile-link" id="nav-profile">
                <div className="avatar-sm" title={user?.name}>
                  {(user?.name || 'U')[0].toUpperCase()}
                </div>
              </Link>

              {/* Logout button — clears JWT and redirects */}
              <button
                id="nav-logout"
                className="nav-btn-outline"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    id="nav-login"    className="nav-link-plain">Sign In</Link>
              <Link to="/register" id="nav-register" className="btn-primary">Get Started</Link>
            </>
          )}
        </div>

      </div>

      {/* ── Partner: add Navbar styles here ──────────────
          Available class hooks to style:
          .sticky-nav, .nav-content, .logo, .nav-links,
          .nav-links a, .nav-links a.active, .nav-badge,
          .nav-actions, .avatar-sm, .nav-btn-outline,
          .nav-link-plain, .profile-link
      ─────────────────────────────────────────────────── */}
    </nav>
  );
};

export default Navbar;
