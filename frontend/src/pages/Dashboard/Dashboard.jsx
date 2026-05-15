import React, { useState, useEffect } from "react";
import { Plus, MapPin, DollarSign, Calendar, Users, ChevronRight, Wallet, CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jobService from "../../services/jobService";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("progress");

  const tabs = [
    { id: "applied", label: "Applied", count: 3 },
    { id: "progress", label: "In Progress", count: 1 },
    { id: "completed", label: "Completed", count: 0 },
  ];

  const MOCK_JOBS = [
    {
      id: 1,
      title: "Fix Leaking Kitchen Sink",
      status: "Open",
      statusColor: "bg-green-100 text-green-700 border-green-200",
      description: "Need a plumber to fix a leaking sink in my kitchen. The leak is coming from under the basin. Water is dripping constantly and I need this fixed as soon as possible.",
      location: "Westlands, Nairobi",
      budget: "KSh 3,000",
      date: "2026-05-03",
      applicants: 5,
      category: "Plumbing",
    },
    {
      id: 2,
      title: "Electrical Wiring Repair",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-700 border-blue-200",
      description: "Looking for an electrician to check and repair faulty wiring in the living room. Some sockets are not working and the lights flicker occasionally.",
      location: "Kilimani, Nairobi",
      budget: "KSh 5,500",
      date: "2026-05-10",
      applicants: 2,
      category: "Electrical",
    }
  ];

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const data = await jobService.getMyJobs();
        setJobs(Array.isArray(data) ? data : data.jobs || []);
      } catch (err) {
        console.warn("Backend not reachable. Falling back to dummy data.");
        setJobs(MOCK_JOBS);
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-12 px-4 sm:px-6 lg:px-8 relative font-outfit">
      {/* Subtle background styling */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-blue-50/50 to-slate-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your account.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/jobs')}
              className="flex items-center space-x-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors"
            >
              <span>Browse Jobs</span>
            </button>
            <button 
              onClick={() => navigate('/post-job')}
              className="flex items-center space-x-2 bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Post a Job</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Total Earnings</p>
              <h3 className="text-2xl font-bold text-slate-900">KSh 45,000</h3>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Completed Jobs</p>
              <h3 className="text-2xl font-bold text-slate-900">24</h3>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500 shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Average Rating</p>
              <h3 className="text-2xl font-bold text-slate-900">4.8 <span className="text-sm font-normal text-slate-400">/ 5</span></h3>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors
                  ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }
                `}
              >
                {tab.label}
                <span
                  className={`ml-3 py-0.5 px-2.5 rounded-full text-xs font-semibold ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-10 text-slate-500">You haven't posted any jobs yet.</div>
          ) : (
            jobs.map((job) => (
              <div 
                key={job.id || job._id} 
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center flex-wrap gap-3 mb-2">
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h2>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${job.statusColor || 'bg-slate-100 text-slate-600'}`}>
                        {job.status || 'Open'}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed max-w-3xl">
                      {job.description}
                    </p>
                  </div>
                  <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-500 mb-6">
                  <div className="flex items-center text-slate-700 font-medium">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                    {job.location || 'Remote'}
                  </div>
                  <div className="flex items-center text-slate-700 font-medium">
                    <DollarSign className="w-4 h-4 mr-1 text-slate-400" />
                    {job.budget || 'Negotiable'}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    Posted {job.date || new Date().toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-slate-400" />
                    {job.applicants || 0} applicants
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors">
                    {job.category || 'General'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
