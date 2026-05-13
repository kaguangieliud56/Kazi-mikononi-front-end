import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  // Seed state from localStorage immediately so protected routes don't flash
  const [user, setUser]       = useState(authService.getCachedUser);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // ── On mount: verify the cached token is still valid ────────────────────────
  useEffect(() => {
    const verifyToken = async () => {
      if (!authService.isAuthenticated()) {
        setLoading(false);
        return;
      }
      try {
        const freshUser = await authService.getCurrentUser();
        setUser(freshUser);
      } catch {
        // Token invalid or expired — clean up silently
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  // ── Auth actions ─────────────────────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    setError(null);
    const data = await authService.login(credentials);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (userData) => {
    setError(null);
    const data = await authService.register(userData);
    if (data.user) setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const updateUserInContext = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('kazi_user', JSON.stringify(updatedUser));
  }, []);

  // ── Derived state ─────────────────────────────────────────────────────────────
  const isAuthenticated = Boolean(user);
  const isWorker  = user?.role === 'worker';
  const isClient  = user?.role === 'client';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        isWorker,
        isClient,
        login,
        register,
        logout,
        updateUserInContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
