import api from "./api";

const jobService = {
  /**
   * Get all jobs (filterable)
   */
  getJobs: async (params) => {
    const response = await api.get("/jobs/", { params });
    return response.data;
  },

  /**
   * Get single job
   */
  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  /**
   * Create job
   */
  createJob: async (jobData) => {
    const payload = {
      title: jobData.title,
      description: jobData.description,
      category: jobData.category,
      budget: Number(jobData.budget),
      location: jobData.location,
      urgency: jobData.urgency,
      duration: jobData.duration,
      contact_method: jobData.contactMethod, // FIXED naming consistency
      image_url: jobData.image_url || null,
    };

    const response = await api.post("/jobs/", payload);
    return response.data;
  },

  /**
   * Update job
   */
  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  /**
   * Delete job
   */
  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  /**
   * APPLY FOR JOB (FIXED)
   * Backend: POST /applications/<job_id>
   */
  applyForJob: async (jobId, data) => {
    const response = await api.post(`/applications/${jobId}`, data);
    return response.data;
  },

  /**
   * Get jobs posted by current client
   */
  getMyJobs: async () => {
    const response = await api.get("/jobs/mine");
    return response.data;
  },

  /**
   * Get jobs worker applied for (if you add endpoint later)
   * backend: /applications/mine
   */
  getMyApplications: async () => {
    const response = await api.get("/applications/mine");
    return response.data;
  },
  uploadJobImage: async (formData) => {
  const response = await api.post("/jobs/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
},
};

export default jobService;