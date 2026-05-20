import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://kazi-mikononi-back-end.onrender.com";

const api = axios.create({
  baseURL: API_URL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});


// ─────────────────────────────────────────────
// REQUEST INTERCEPTOR
// ─────────────────────────────────────────────
api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("kazi_token");

    // attach token automatically
    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);


// ─────────────────────────────────────────────
// RESPONSE INTERCEPTOR
// ─────────────────────────────────────────────
api.interceptors.response.use(

  // SUCCESS
  (response) => response,

  // ERROR
  (error) => {

    console.error("API ERROR:", error);

    // SERVER RESPONDED
    if (error.response) {

      const status =
        error.response.status;

      // TOKEN EXPIRED / INVALID
      if (status === 401) {

        console.warn(
          "Session expired. Logging out..."
        );

        // clear auth data
        localStorage.removeItem(
          "kazi_token"
        );

        localStorage.removeItem(
          "kazi_user"
        );

        // avoid redirect loop
        if (
          window.location.pathname !== "/login"
        ) {

          window.location.href = "/login";
        }
      }

      // FORBIDDEN
      if (status === 403) {

        console.warn(
          "Access forbidden."
        );
      }

      // SERVER ERROR
      if (status >= 500) {

        error.message =
          "Server error. Please try again later.";
      }
    }

    // REQUEST SENT BUT NO RESPONSE
    else if (error.request) {

      console.error(
        "No response from server."
      );

      error.message =
        "Unable to reach server. Check your internet connection.";
    }

    // OTHER ERRORS
    else {

      console.error(
        "Unexpected error:",
        error.message
      );
    }

    return Promise.reject(error);
  }
);

export default api;