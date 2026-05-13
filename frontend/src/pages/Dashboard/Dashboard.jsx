import React, { useState } from "react";
import { Plus, MapPin, DollarSign, Calendar, Users, ChevronRight } from "lucide-react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("progress");

  const tabs = [
    { id: "applied", label: "Applied", count: 3 },
    { id: "progress", label: "In Progress", count: 1 },
    { id: "completed", label: "Completed", count: 0 },
  ];

  const mockJobs = [
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

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle background styling */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-blue-50/50 to-slate-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-outfit">My Jobs</h1>
            <p className="text-slate-500 mt-1">Manage your posted jobs and applications</p>
          </div>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30 transform transition-all hover:-translate-y-0.5">
            <Plus className="w-5 h-5" />
            <span>Post a Job</span>
          </button>
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
          {mockJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center flex-wrap gap-3 mb-2">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h2>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${job.statusColor}`}>
                      {job.status}
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
                  {job.location}
                </div>
                <div className="flex items-center text-slate-700 font-medium">
                  <DollarSign className="w-4 h-4 mr-1 text-slate-400" />
                  {job.budget}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                  Posted {job.date}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-slate-400" />
                  {job.applicants} applicants
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors">
                  {job.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
