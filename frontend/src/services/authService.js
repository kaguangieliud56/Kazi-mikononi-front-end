import api from './api';

// Storage key constants — keep in sync with api.js
const TOKEN_KEY = 'kazi_token';
const USER_KEY  = 'kazi_user';

const authService = {
  /**
   * Login with email + password.
   * Stores the token and basic user object in localStorage on success.
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    return response.data;
  },

  /**
   * Register a new account.
   * userData should include: name, email, password, role ('client' | 'worker'), location
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    const { token, user } = response.data;
    // Auto-login after registration if the backend returns a token
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    return response.data;
  },

  /**
   * Clear all auth data from storage.
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Fetch the authenticated user's profile from the server.
   * Used on app startup to verify a stored token is still valid.
   */
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    // Keep the cached user data fresh
    localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    return response.data;
  },

  /**
   * Returns the user object cached in localStorage (no network call).
   * Useful for synchronous reads (e.g. initial render before the async check resolves).
   */
  getCachedUser: () => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /**
   * Returns true when a token exists in storage.
   */
  isAuthenticated: () => Boolean(localStorage.getItem(TOKEN_KEY)),
};

export default authService;
