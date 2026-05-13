import api from './api';

const jobService = {
  /**
   * Get a paginated, filterable list of jobs.
   * @param {object} params - e.g. { category, location, search, page, limit }
   */
  getJobs: async (params) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },

  /**
   * Get a single job by its ID.
   */
  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  /**
   * Post a new job (client only).
   * @param {object} jobData - { title, description, category, budget, location, deadline }
   */
  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  /**
   * Update an existing job (owner only).
   */
  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  /**
   * Delete a job (owner only).
   */
  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  /**
   * Apply for a job (worker only).
   * @param {string} jobId
   * @param {object} applicationData - { coverLetter, proposedPrice }
   */
  applyForJob: async (jobId, applicationData) => {
    const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
    return response.data;
  },

  /**
   * Fetch all jobs posted by the currently authenticated user.
   */
  getMyJobs: async () => {
    const response = await api.get('/jobs/mine');
    return response.data;
  },

  /**
   * Fetch all jobs the current worker has applied for.
   */
  getMyApplications: async () => {
    const response = await api.get('/jobs/applications/mine');
    return response.data;
  },
};

export default jobService;
