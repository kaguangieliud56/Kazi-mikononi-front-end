import React, { useEffect, useState } from "react";

import {
  MapPin,
  DollarSign,
  Calendar,
  Wallet,
  CheckCircle,
  Star,
} from "lucide-react";

import applicationService from "../../services/applicationService";
import ratingService from "../../services/ratingService";

function WorkerDashboard() {
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("applied");

  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicationsData =
          await applicationService.getMyApplications();

        setApplications(
          Array.isArray(applicationsData)
            ? applicationsData
            : applicationsData.applications || []
        );

        // TEMPORARY
        setAverageRating(4.8);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const appliedJobs = applications.filter(
    (app) => app.status === "pending"
  );

  const inProgressJobs = applications.filter(
    (app) => app.status === "accepted"
  );

  const completedJobs = applications.filter(
    (app) => app.status === "completed"
  );

  const tabs = [
    {
      id: "applied",
      label: "Applied",
      count: appliedJobs.length,
    },
    {
      id: "progress",
      label: "In Progress",
      count: inProgressJobs.length,
    },
    {
      id: "completed",
      label: "Completed",
      count: completedJobs.length,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-outfit">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Worker Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your work and applications.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-2xl p-6 border">
            <Wallet className="text-blue-600 mb-2" />

            <p className="text-sm text-slate-500">
              Applications
            </p>

            <h3 className="text-2xl font-bold">
              {applications.length}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border">
            <CheckCircle className="text-green-600 mb-2" />

            <p className="text-sm text-slate-500">
              Completed Jobs
            </p>

            <h3 className="text-2xl font-bold">
              {completedJobs.length}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border">
            <Star className="text-yellow-500 mb-2" />

            <p className="text-sm text-slate-500">
              Average Rating
            </p>

            <h3 className="text-2xl font-bold">
              {averageRating} / 5
            </h3>
          </div>

        </div>

        {/* TABS */}
        <div className="border-b border-slate-200 mb-8">
          <nav className="-mb-px flex space-x-8">

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500"
                }`}
              >
                {tab.label}

                <span className="ml-2 text-xs bg-slate-100 px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}

          </nav>
        </div>

        {/* APPLIED */}
        {activeTab === "applied" && (
          <div className="space-y-6">

            {appliedJobs.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-2xl p-6 border"
              >

                <div className="flex justify-between mb-3">

                  <h2 className="font-bold text-lg">
                    Job #{application.job_id}
                  </h2>

                  <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                    Pending
                  </span>

                </div>

                <p className="text-slate-600 mb-4">
                  {application.message}
                </p>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar size={14} />

                  {new Date(
                    application.created_at
                  ).toLocaleString()}
                </div>

              </div>
            ))}

          </div>
        )}

        {/* IN PROGRESS */}
        {activeTab === "progress" && (
          <div className="space-y-6">

            {inProgressJobs.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-2xl p-6 border"
              >

                <div className="flex justify-between mb-3">

                  <h2 className="font-bold text-lg">
                    Job #{application.job_id}
                  </h2>

                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    Accepted
                  </span>

                </div>

                <p className="text-slate-600">
                  {application.message}
                </p>

              </div>
            ))}

          </div>
        )}

        {/* COMPLETED */}
        {activeTab === "completed" && (
          <div className="space-y-6">

            {completedJobs.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-2xl p-6 border"
              >

                <div className="flex justify-between mb-3">

                  <h2 className="font-bold text-lg">
                    Job #{application.job_id}
                  </h2>

                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                    Completed
                  </span>

                </div>

                <p className="text-slate-600">
                  {application.message}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default WorkerDashboard;