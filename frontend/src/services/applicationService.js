import api from "./api";

// =====================================
// APPLY TO A JOB (WORKER)
// POST /applications/<jobId>
// =====================================
const applyToJob = async (jobId, data) => {
  const res = await api.post(`/applications/${jobId}`, data);
  return res.data;
};

// =====================================
// GET APPLICATIONS FOR A JOB (CLIENT)
// GET /applications/job/<jobId>
// =====================================
const getApplicationsForJob = async (jobId) => {
  const res = await api.get(`/applications/job/${jobId}`);
  return res.data;
};

// =====================================
// GET MY APPLICATIONS (WORKER DASHBOARD)
// GET /applications/mine
// =====================================
const getMyApplications = async () => {
  const res = await api.get(`/applications/mine`);
  return res.data;
};

// =====================================
// UPDATE APPLICATION STATUS (CLIENT)
// PUT /applications/<id>/status
// =====================================
const updateApplicationStatus = async (applicationId, status) => {
  const res = await api.put(`/applications/${applicationId}/status`, {
    status,
  });
  return res.data;
};

// =====================================
// EXPORT SERVICE
// =====================================
export default {
  applyToJob,
  getApplicationsForJob,
  getMyApplications,
  updateApplicationStatus,
};