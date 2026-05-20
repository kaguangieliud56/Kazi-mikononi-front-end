import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  ShieldCheck,
} from "lucide-react";

import workerService from "../../services/workerService";
import api from "../../services/api";

const WorkerProfile = () => {
  const { id } = useParams();

  const [worker, setWorker] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  // -------------------------
  // FETCH PROFILE
  // -------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const workerRes = await workerService.getWorkerById(id);
        setWorker(workerRes);

        const reviewRes = await api.get(`/ratings/workers/${id}`);
        setReviews(reviewRes.data.ratings || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // -------------------------
  // SUBMIT REVIEW
  // -------------------------
  const submitReview = async () => {
    try {
      await api.post(`/ratings/workers/${id}`, {
        score,
        comment,
      });

      // refresh reviews
      const res = await api.get(`/ratings/workers/${id}`);
      setReviews(res.data.ratings || []);

      setComment("");
      setScore(5);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="text-center py-20">
        Worker not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      {/* HERO */}
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
        <div className="flex gap-6 items-center">

          <img
            src={
              worker.profile_image ||
              `https://ui-avatars.com/api/?name=${worker.name}`
            }
            className="w-28 h-28 rounded-full object-cover"
          />

          <div>
            <h1 className="text-2xl font-bold">
              {worker.name}
            </h1>

            <p className="text-slate-500">{worker.title}</p>

            <div className="flex items-center gap-2 mt-2 text-slate-500">
              <MapPin className="w-4 h-4" />
              {worker.location}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-bold">
                {(worker.rating ?? 0).toFixed(1)}
              </span>
              <span className="text-slate-400">
                ({worker.reviews_count ?? 0})
              </span>
            </div>

            {worker.verified && (
              <div className="flex items-center gap-1 text-green-600 mt-1">
                <ShieldCheck className="w-4 h-4" />
                Verified Worker
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
        <h2 className="font-bold mb-2">About</h2>
        <p>{worker.bio}</p>

        <h2 className="font-bold mt-4 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {worker.skills?.map((s, i) => (
            <span
              key={i}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* REVIEWS */}
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
        <h2 className="font-bold mb-4">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-slate-500">No reviews yet</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="border-b py-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{r.score}</span>
              </div>
              <p className="text-slate-600">{r.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* REVIEW FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="font-bold mb-3">Leave a Review</h2>

        <select
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="border p-2 rounded mb-2"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} Star
            </option>
          ))}
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border p-2 rounded mb-2"
        />

        <button
          onClick={submitReview}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </div>

    </div>
  );
};

export default WorkerProfile;