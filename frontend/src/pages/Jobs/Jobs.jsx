import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, DollarSign } from 'lucide-react';

const DUMMY_JOBS = [
  { id: 1, title: "Weekly House Cleaning", status: "Open", location: "Westlands, Nairobi", budget: "1,500", date: "Posted 2h ago", applicants: 4, desc: "Looking for a reliable cleaner for a 3-bedroom apartment. Every Saturday morning. Must bring own cleaning supplies.", employer: "Alice N.", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, title: "Fix Leaking Kitchen Sink", status: "Open", location: "Kilimani, Nairobi", budget: "2,000", date: "Posted 5h ago", applicants: 12, desc: "The pipe under my kitchen sink is leaking heavily. Need a professional plumber to fix or replace it today.", employer: "Brian O.", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: 3, title: "High School Math Tutor Needed", status: "Open", location: "Lavington, Nairobi", budget: "1,000/hr", date: "Posted 1d ago", applicants: 2, desc: "Need a tutor for my Form 3 son. Focus on Calculus and Algebra. Twice a week in the evenings.", employer: "Caroline W.", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, title: "Install New Light Fixtures", status: "Closed", location: "Karen, Nairobi", budget: "3,500", date: "Posted 2d ago", applicants: 8, desc: "Need an electrician to install 4 new chandelier-style light fixtures in the living room and dining area.", employer: "David K.", avatar: "https://i.pravatar.cc/150?img=4" },
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-outfit py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Available Jobs</h1>
          <p className="text-slate-500">Browse and apply for tasks in your area.</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search jobs by title or keyword..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => alert("Search functionality coming soon!")}
            className="bg-[#2563EB] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors shrink-0"
          >
            Search
          </button>
        </div>

        {/* Jobs Feed */}
        <div className="space-y-6">
          {DUMMY_JOBS.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">{job.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                  {job.status}
                </span>
              </div>

              {/* Info Row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mb-6">
                <div className="flex items-center text-slate-500 text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-1.5" /> {job.location}
                </div>
                <div className="flex items-center text-slate-500 text-sm font-medium">
                  <DollarSign className="w-4 h-4 mr-1.5" /> KSh {job.budget}
                </div>
                <div className="flex items-center text-slate-500 text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-1.5" /> {job.date}
                </div>
                <div className="flex items-center text-slate-500 text-sm font-medium">
                  <Users className="w-4 h-4 mr-1.5" /> {job.applicants} Applicants
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 mb-8 leading-relaxed">
                {job.desc}
              </p>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <img src={job.avatar} alt={job.employer} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-xs text-slate-400">Posted by</p>
                    <p className="text-sm font-bold text-slate-900">{job.employer}</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Successfully applied for this job!")}
                  className={`px-8 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto ${
                    job.status === 'Open' 
                      ? 'bg-[#2563EB] hover:bg-blue-700 text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                  disabled={job.status !== 'Open'}
                >
                  {job.status === 'Open' ? 'Apply Now' : 'Closed'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Jobs;
