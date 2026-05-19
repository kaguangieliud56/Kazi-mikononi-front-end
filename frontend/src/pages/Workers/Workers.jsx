import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, ShieldCheck, Wrench, Brush, Zap, BookOpen } from 'lucide-react';
import userService from '../../services/userService';

const DUMMY_WORKERS = [
  { id: 1, name: "David Kimani", title: "Professional Plumber", rating: 4.8, reviews: 124, rate: "500", verified: true, image: "https://i.pravatar.cc/150?img=11" },
  { id: 2, name: "Sarah Wanjiku", title: "Expert Cleaner", rating: 4.9, reviews: 89, rate: "300", verified: true, image: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "John Omondi", title: "Master Electrician", rating: 4.7, reviews: 210, rate: "600", verified: true, image: "https://i.pravatar.cc/150?img=8" },
  { id: 4, name: "Mercy Mutua", title: "Math Tutor", rating: 5.0, reviews: 45, rate: "800", verified: false, image: "https://i.pravatar.cc/150?img=9" },
  { id: 5, name: "Peter Njoroge", title: "Carpenter", rating: 4.6, reviews: 112, rate: "450", verified: true, image: "https://i.pravatar.cc/150?img=12" },
  { id: 6, name: "Grace Achieng", title: "Housekeeper", rating: 4.8, reviews: 67, rate: "350", verified: true, image: "https://i.pravatar.cc/150?img=20" },
];

const CATEGORIES = [
  { name: "All", icon: null },
  { name: "Plumbing", icon: <Wrench className="w-4 h-4" /> },
  { name: "Cleaning", icon: <Brush className="w-4 h-4" /> },
  { name: "Electrical", icon: <Zap className="w-4 h-4" /> },
  { name: "Tutoring", icon: <BookOpen className="w-4 h-4" /> },
];

const Workers = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await userService.getWorkers();
        setWorkers(Array.isArray(data) ? data : data.users || []);
      } catch (err) {
        console.warn("Backend not reachable. Falling back to dummy data.");
        setWorkers(DUMMY_WORKERS);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-outfit py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Find Top Professionals</h1>
          <p className="text-slate-500 mb-8 max-w-2xl mx-auto">Discover and hire the best local talent for your next project or task.</p>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 rounded-full border-none ring-1 ring-slate-200 shadow-sm focus:ring-2 focus:ring-[#2563EB] text-slate-900 placeholder-slate-400 text-lg transition-shadow outline-none"
              placeholder="Search by name, skill, or service..."
            />
            <div className="absolute inset-y-2 right-2">
              <button 
                onClick={() => alert("Search functionality coming soon!")}
                className="bg-[#2563EB] hover:bg-blue-700 text-white rounded-full px-6 py-2 font-semibold transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-colors ${
                activeCategory === cat.name
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : workers.length === 0 ? (
            <div className="col-span-full text-center py-10 text-slate-500">No workers found.</div>
          ) : (
            workers.map((worker) => (
              <div key={worker.id || worker._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img src={worker.image || worker.avatar || `https://ui-avatars.com/api/?name=${worker.name || 'User'}`} alt={worker.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {(worker.verified !== false) && (
                    <div className="absolute top-3 right-3 bg-[#10B981] text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{worker.name}</h3>
                      <p className="text-sm text-slate-500 font-medium">{worker.title || worker.skills?.[0] || 'Professional'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold text-slate-700">{worker.rating || '4.5'}</span>
                    <span className="text-sm text-slate-400">({worker.reviews || 0} reviews)</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="text-slate-900 font-bold">
                      KSh {worker.rate || worker.hourlyRate || '500'}<span className="text-slate-400 text-sm font-normal">/hour</span>
                    </div>
                    <button 
                      onClick={() => alert(`Navigating to ${worker.name}'s profile...`)}
                      className="text-[#2563EB] font-bold text-sm hover:text-blue-700 transition-colors"
                    >
                      View Profile
                    </button>
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

export default Workers;
