import api from "./api";

const workerService = {

  // =========================================
  // GET CURRENT WORKER PROFILE
  // =========================================
  getProfile: async () => {
    const response = await api.get("/workers/profile");
    return response.data;
  },

  // =========================================
  // SAVE / UPDATE PROFILE
  // =========================================
  saveProfile: async (data) => {
    const response = await api.post(
      "/workers/profile",
      data
    );

    return response.data;
  },

  // =========================================
  // GET ALL WORKERS
  // =========================================
  getWorkers: async () => {
    const response = await api.get("/workers/");
    return response.data;
  },

  // =========================================
  // GET SINGLE WORKER
  // =========================================
  getWorkerById: async (workerId) => {
    const response = await api.get(
      `/workers/${workerId}`
    );

    return response.data;
  },

  // =========================================
  // ADD SKILL
  // =========================================
  addSkill: async (skill) => {
    const response = await api.post(
      "/workers/skills",
      { skill }
    );

    return response.data;
  },

  // =========================================
  // REMOVE SKILL
  // =========================================
  removeSkill: async (skill) => {
    const response = await api.delete(
      "/workers/skills",
      {
        data: { skill },
      }
    );

    return response.data;
  },

  // =========================================
  // GET SKILLS
  // =========================================
  getSkills: async () => {
    const response = await api.get(
      "/workers/skills"
    );

    return response.data;
  },
};

export default workerService;