import React, { useEffect, useState } from "react";

import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import jobService from "../../services/jobService";
import applicationService from "../../services/applicationService";

function ClientDashboard() {
  const [jobs, setJobs] = useState([]);

  const [applications, setApplications] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await jobService.getMyJobs();

        const myJobs = Array.isArray(jobsData)
          ? jobsData
          : jobsData.jobs || [];

        setJobs(myJobs);

        // fetch applications for each job
        const applicationsMap = {};

        for (const job of myJobs) {
          const apps =
            await applicationService.getApplicationsForJob(
              job.id
            );

          applicationsMap[job.id] = apps;
        }

        setApplications(applicationsMap);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = async (
    applicationId,
    status,
    jobId
  ) => {
    try {
      await applicationService.updateApplicationStatus(
        applicationId,
        status
      );

      const updatedApps = applications[jobId].map((app) =>
        app.id === applicationId
          ? { ...app, status }
          : app
      );

      setApplications({
        ...applications,
        [jobId]: updatedApps,
      });

    } catch (error) {
      console.error(error);
      alert("Failed to update application.");
    }
  };

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

        <div className="mb-10">

          <h1 className="text-3xl font-bold text-slate-900">
            Client Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your jobs and workers.
          </p>

        </div>

        <div className="space-y-8">

          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 border"
            >

              <div className="mb-6">

                <h2 className="text-2xl font-bold text-slate-900">
                  {job.title}
                </h2>

                <p className="text-slate-600 mt-2">
                  {job.description}
                </p>

              </div>

              <div className="flex items-center gap-2 mb-5 text-sm text-slate-500">
                <Users size={16} />

                {(applications[job.id] || []).length} applicants
              </div>

              <div className="space-y-4">

                {(applications[job.id] || []).length === 0 ? (
                  <p className="text-slate-500">
                    No applications yet.
                  </p>
                ) : (
                  applications[job.id].map((application) => (
                    <div
                      key={application.id}
                      className="border rounded-xl p-4"
                    >

                      <div className="flex justify-between items-start gap-4">

                        <div>

                          <h3 className="font-bold text-slate-900">
                            {application.worker_name}
                          </h3>

                          <p className="text-sm text-slate-500 mb-2">
                            {application.worker_email}
                          </p>

                          <p className="text-slate-700">
                            {application.message}
                          </p>

                        </div>

                        <div>

                          {application.status === "pending" && (
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                              Pending
                            </span>
                          )}

                          {application.status === "accepted" && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                              Accepted
                            </span>
                          )}

                          {application.status === "rejected" && (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                              Rejected
                            </span>
                          )}

                        </div>

                      </div>

                      {application.status === "pending" && (
                        <div className="flex gap-3 mt-5">

                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                application.id,
                                "accepted",
                                job.id
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                          >
                            <CheckCircle size={16} />
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                application.id,
                                "rejected",
                                job.id
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>

                        </div>
                      )}

                    </div>
                  ))
                )}

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default ClientDashboard;