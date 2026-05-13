import api from './api';

const userService = {
  /**
   * Get the current authenticated user's full profile.
   */
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  /**
   * Update the current user's profile.
   * @param {object} profileData - { name, bio, location, skills, hourlyRate, phone }
   */
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  /**
   * Get any user's public profile by their ID.
   */
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Browse the worker directory with optional filters.
   * @param {object} params - { category, location, search, minRating, page, limit }
   */
  getWorkers: async (params) => {
    const response = await api.get('/users/workers', { params });
    return response.data;
  },

  /**
   * Upload a profile avatar image.
   * @param {File} file - The image file from an <input type="file">
   */
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Submit a rating and review for a worker after a completed job.
   * @param {string} workerId
   * @param {object} ratingData - { jobId, rating, review }
   */
  rateWorker: async (workerId, ratingData) => {
    const response = await api.post(`/users/${workerId}/rate`, ratingData);
    return response.data;
  },
};

export default userService;
