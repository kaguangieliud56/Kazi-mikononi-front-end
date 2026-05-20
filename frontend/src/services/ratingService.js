import api from "./api";

const getWorkerRatings = async (workerId) => {
  const response = await api.get(`/ratings/workers/${workerId}`);
  return response.data;
};

const submitRating = async (workerId, ratingData) => {
  const response = await api.post(
    `/ratings/workers/${workerId}`,
    ratingData
  );

  return response.data;
};

const ratingService = {
  getWorkerRatings,
  submitRating,
};

export default ratingService;