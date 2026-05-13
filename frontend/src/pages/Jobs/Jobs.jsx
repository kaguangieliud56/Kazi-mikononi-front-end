
// Jobs Listings Page
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  // Mock job data
  const jobs = [
    {
      id: 1,
      title: "Fix Leaking Kitchen Sink",
      description: "Need an experienced plumber to fix a sink in my kitchen. The leak is coming from under the basin. Water is dripping constantly and I need this fixed as soon as possible.",
      location: "Westlands, Nairobi",
      budget: "KSh 3,000",
      category: "Plumbing",
      status: "open",
      postedBy: "James Otumo",
      image: "🔧",
      applicants: 5,
      posted: "2025-05-10",
    },
    {
      id: 2,
      title: "Weekly House Cleaning",
      description: "Looking for a reliable cleaner for weekly deep cleaning of a 2-bedroom apartment.",
      location: "Kilimani, Nairobi",
      budget: "KSh 4,000",
      category: "Cleaning",
      status: "open",
      postedBy: "Alice Wambui",
      image: "🧹",
      applicants: 12,
      posted: "2025-05-09",
    },
    {
      id: 3,
      title: "Install Ceiling Fan",
      description: "Need an electrician to install a ceiling fan in the living room.",
      location: "Parklands, Nairobi",
      budget: "KSh 2,500",
      category: "Electrical",
      status: "in-progress",
      postedBy: "Robert Kipngetich",
      image: "⚡",
      applicants: 3,
      posted: "2025-05-08",
    },
    {
      id: 4,
      title: "Math Tutor for Form 3 Student",
      description: "Looking for an experienced math tutor to help my daughter prepare for exams. 3 sessions per week.",
      location: "Karen, Nairobi",
      budget: "KSh 8,000",
      category: "Tutoring",
      status: "open",
      postedBy: "Catherine Muthoni",
      image: "📚",
      applicants: 8,
      posted: "2025-05-07",
    },
    {
      id: 5,
      title: "Build Custom Bookshelf",
      description: "Need a carpenter to build a custom bookshelf for my home office. Design already prepared.",
      location: "Lavington, Nairobi",
      budget: "KSh 15,000",
      category: "Carpentry",
      status: "completed",
      postedBy: "Michael Odhiambo",
      image: "🔨",
      applicants: 4,
      posted: "2025-05-05",
    },
  ];

  // Filter jobs based on active tab
  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "all") return true;
    if (activeTab === "open") return job.status === "open";
    if (activeTab === "in-progress") return job.status === "in-progress";
    if (activeTab === "completed") return job.status === "completed";
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-500/20 text-green-300 border-green-400/30";
      case "in-progress":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30";
      case "completed":
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
      default:
        return "bg-white/20 text-white/70 border-white/30";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "open":
        return "Funguliwa";
      case "in-progress":
        return "Inafanywa";
      case "completed":
        return "Imekamilika";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-6xl font-black text-white mb-2">
              Ajira <span className="text-yellow-400">Zinazopatikana</span>
            </h1>
            <p className="text-white/70 text-xl">Tembea ajira zinazopo au chapisha yako mwenyewe</p>
          </div>
          <button
            onClick={() => navigate("/post-job")}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-8 py-4 rounded-3xl text-lg font-black shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Chapisha Kazi</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-12 overflow-x-auto pb-4">
          {[
            { id: "all", label: "Zote Zote", count: jobs.length },
            { id: "open", label: "Funguliwa", count: jobs.filter(j => j.status === "open").length },
            { id: "in-progress", label: "Inafanywa", count: jobs.filter(j => j.status === "in-progress").length },
            { id: "completed", label: "Imekamilika", count: jobs.filter(j => j.status === "completed").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-full font-bold text-lg whitespace-nowrap transition-all duration-300 border-2 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 border-yellow-400"
                  : "bg-white/10 text-white border-white/30 hover:border-white/50"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/70 text-2xl">Hakuna ajira katika kigae hiki</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-yellow-400/50 hover:bg-white/15 transition-all duration-300 shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Left: Job Info */}
                  <div className="lg:col-span-3 space-y-4">
                    {/* Title & Status */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {job.title}
                        </h3>
                        <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                          {job.description}
                        </p>
                      </div>
                      <div className={`px-4 py-2 rounded-full border text-sm font-bold whitespace-nowrap ${getStatusColor(job.status)}`}>
                        {getStatusLabel(job.status)}
                      </div>
                    </div>

                    {/* Details Row */}
                    <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/20">
                      {/* Location */}
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">📍</span>
                        <span className="text-white/80 font-medium">{job.location}</span>
                      </div>

                      {/* Budget */}
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">💰</span>
                        <span className="text-white/80 font-medium">{job.budget}</span>
                      </div>

                      {/* Category */}
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{job.image}</span>
                        <span className="text-white/80 font-medium">{job.category}</span>
                      </div>

                      {/* Posted Date */}
                      <div className="flex items-center space-x-2 text-white/60 text-sm">
                        <span>📅</span>
                        <span>{job.posted}</span>
                      </div>

                      {/* Applicants */}
                      <div className="flex items-center space-x-2 text-white/60 text-sm">
                        <span>👥</span>
                        <span>{job.applicants} waajiri</span>
                      </div>
                    </div>

                    {/* Posted By */}
                    <div className="text-white/70 text-sm pt-2">
                      Iliyochapishwa na: <span className="font-semibold text-white">{job.postedBy}</span>
                    </div>
                  </div>

                  {/* Right: Action */}
                  <div className="flex flex-col justify-between items-end lg:items-start">
                    {job.status === "open" ? (
                      <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-2xl text-lg font-bold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                        Omba Sasa
                      </button>
                    ) : job.status === "in-progress" ? (
                      <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 px-8 py-4 rounded-2xl text-lg font-bold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                        Tazama Maendeleo
                      </button>
                    ) : (
                      <button className="w-full bg-white/20 border-2 border-white/30 px-8 py-4 rounded-2xl text-lg font-bold text-white/70 cursor-not-allowed">
                        Imekamilika
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;