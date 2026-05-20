import React, { useEffect, useState } from "react";
import { Search, MapPin, Calendar, Users, DollarSign } from "lucide-react";
import jobService from "../../services/jobService";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // APPLY UI STATES
  const [openApplyJobId, setOpenApplyJobId] = useState(null);
  const [message, setMessage] = useState("");
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // =========================
  // FETCH JOBS
  // =========================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const data = await jobService.getJobs();

        setJobs(Array.isArray(data) ? data : data.jobs || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs. Check backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // =========================
  // FILTER
  // =========================
  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();

    return (
      job.title?.toLowerCase().includes(term) ||
      job.description?.toLowerCase().includes(term) ||
      job.location?.toLowerCase().includes(term)
    );
  });

  // =========================
  // OPEN APPLY FORM
  // =========================
  const openApply = (jobId) => {
    setOpenApplyJobId(jobId);
    setMessage("");
  };

  const cancelApply = () => {
    setOpenApplyJobId(null);
    setMessage("");
  };

  // =========================
  // SUBMIT APPLICATION
  // =========================
  const handleApply = async (jobId) => {
    try {
      setApplyingJobId(jobId);

      await jobService.applyForJob(jobId, {
        message: message || "I am interested in this job",
      });

      setAppliedJobs((prev) => [...prev, jobId]);
      setOpenApplyJobId(null);
      setMessage("");

      alert("Application submitted successfully!");
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.error ||
          "Failed to apply for job"
      );
    } finally {
      setApplyingJobId(null);
    }
  };

  // =========================
  // LOADING / ERROR
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading jobs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-outfit py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Available Jobs
          </h1>
          <p className="text-slate-500">
            Browse and apply for tasks in your area.
          </p>
        </div>

        {/* SEARCH */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border mb-8 flex">
          <input
            className="flex-1 bg-slate-50 px-4 py-3 rounded-xl outline-none"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* JOB LIST */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-slate-500">No jobs found.</p>
          ) : (
            filteredJobs.map((job) => {
              const isOpen = job.status === "open";
              const isApplied = appliedJobs.includes(job.id);
              const isApplying = applyingJobId === job.id;
              const isFormOpen = openApplyJobId === job.id;

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border"
                >


                  {/* TITLE */}
                  <div className="flex justify-between mb-3">
                    <h2 className="font-bold text-xl">{job.title}</h2>

                    <span className={`px-3 py-1 text-xs rounded-full ${
                      isOpen ? "bg-green-100 text-green-700" : "bg-gray-100"
                    }`}>
                      {job.status}
                    </span>
                  </div>



                  {/* INFO */}
                  <div className="flex gap-5 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={14} /> KSh {job.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {job.created_at
                        ? new Date(job.created_at).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-slate-600 mb-4">
                    {job.description}
                  </p>

                    {/* IMAGE (ONLY IF EXISTS) */}
                    {job.image_url ? (
                      <div className="mb-4">
                        <img
                          src={job.image_url}
                          alt={job.title}
                          className="w-full max-h-56 object-cover rounded-xl border"
                        />
                      </div>
                    ) : null}

                  {/* APPLY BUTTON */}
                  <div className="flex justify-between items-center border-t pt-4">

                  <span className="text-sm text-slate-500">
                    Posted by {job.employer}
                  </span>

                    <button
                      onClick={() =>
                        isFormOpen ? cancelApply() : openApply(job.id)
                      }
                      disabled={!isOpen || isApplied}
                      className={`px-5 py-2 rounded-xl font-semibold ${
                        !isOpen || isApplied
                          ? "bg-slate-200 text-slate-400"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isApplied
                        ? "Applied ✔"
                        : isFormOpen
                        ? "Cancel"
                        : "Apply"}
                    </button>
                  </div>

                  {/* APPLY FORM */}
                  {isFormOpen && (
                    <div className="mt-4 border-t pt-4 space-y-3">

                      <textarea
                        className="w-full border rounded-xl p-3 bg-slate-50 outline-none"
                        placeholder="Write your message to the employer..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApply(job.id)}
                          disabled={isApplying}
                          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                        >
                          {isApplying ? "Sending..." : "Submit Application"}
                        </button>

                        <button
                          onClick={cancelApply}
                          className="bg-slate-200 px-4 py-2 rounded-xl"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;