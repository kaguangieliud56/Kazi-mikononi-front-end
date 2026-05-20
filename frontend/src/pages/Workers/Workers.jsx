import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Wrench,
  Brush,
  Zap,
  BookOpen,
} from "lucide-react";

import workerService from "../../services/workerService";

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

  const [filteredWorkers, setFilteredWorkers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  // ─────────────────────────────────────────────
  // Fetch workers from backend
  // ─────────────────────────────────────────────
  useEffect(() => {
    const fetchWorkers = async () => {
      try {

        const response = await workerService.getWorkers();

        console.log("WORKERS RESPONSE:", response);

        // backend returns:
        // { workers: [...] }

        const workersData =
          response.workers || [];

        setWorkers(workersData);

        setFilteredWorkers(workersData);

      } catch (error) {

        console.error("Failed to fetch workers:", error);

        setWorkers([]);

        setFilteredWorkers([]);

      } finally {

        setLoading(false);

      }
    };

    fetchWorkers();
  }, []);

// ─────────────────────────────────────────────
// Filtering
// ─────────────────────────────────────────────
useEffect(() => {

  let filtered = [...workers];

  // SEARCH FILTER
  if (searchTerm.trim()) {

    const query = searchTerm.toLowerCase();

    filtered = filtered.filter((worker) => {

      const name =
        worker.name?.toLowerCase() || "";

      const title =
        worker.title?.toLowerCase() || "";

      const location =
        worker.location?.toLowerCase() || "";

      const email =
        worker.email?.toLowerCase() || "";

      const skills =
        worker.skills?.join(" ").toLowerCase() || "";

      return (
        name.includes(query) ||
        title.includes(query) ||
        location.includes(query) ||
        email.includes(query) ||
        skills.includes(query)
      );
    });
  }

  // CATEGORY FILTER
  if (activeCategory !== "All") {

    const category =
      activeCategory.toLowerCase();

    filtered = filtered.filter((worker) => {

      const title =
        worker.title?.toLowerCase() || "";

      const skills =
        worker.skills?.map((skill) =>
          skill.toLowerCase()
        ) || [];

      return (
        title.includes(category) ||
        skills.some((skill) =>
          skill.includes(category)
        )
      );
    });
  }

  setFilteredWorkers(filtered);

}, [searchTerm, activeCategory, workers]);
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-outfit py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* ─────────────────────────────────────────────
            HEADER
        ───────────────────────────────────────────── */}
        <div className="text-center mb-12">

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Find Top Professionals
          </h1>

          <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
            Discover and hire the best local talent for your next project or task.
          </p>

          {/* SEARCH */}
          <div className="max-w-3xl mx-auto relative">

            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="block w-full pl-12 pr-4 py-4 rounded-full border-none ring-1 ring-slate-200 shadow-sm focus:ring-2 focus:ring-[#2563EB] text-slate-900 placeholder-slate-400 text-lg transition-shadow outline-none"
              placeholder="Search by name, skill, or service..."
            />
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            CATEGORIES
        ───────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">

          {CATEGORIES.map((cat) => (

            <button
              key={cat.name}
              onClick={() =>
                setActiveCategory(cat.name)
              }
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-colors ${
                activeCategory === cat.name
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat.icon}

              {cat.name}
            </button>
          ))}
        </div>

        {/* ─────────────────────────────────────────────
            WORKERS GRID
        ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {loading ? (

            <div className="col-span-full flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>

          ) : filteredWorkers.length === 0 ? (

            <div className="col-span-full text-center py-10 text-slate-500">
              No workers found.
            </div>

          ) : (

            filteredWorkers.map((worker) => {

              const workerName =
                worker.name || "Unknown Worker";

              const workerImage =
                worker.profile_image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(workerName)}`;

              const workerTitle =
                worker.title ||
                "Professional Worker";

              const hourlyRate =
                worker.hourly_rate || 500;

              return (

                <div
                  key={worker.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group"
                >

                  {/* IMAGE */}
                  <div className="relative h-48 bg-slate-200 overflow-hidden">

                    <img
                      src={workerImage}
                      alt={workerName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {worker.verified && (
                      <div className="absolute top-3 right-3 bg-[#10B981] text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">

                        <ShieldCheck className="w-3 h-3" />

                        Verified
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    {/* NAME */}
                    <div className="mb-3">

                      <h3 className="text-lg font-bold text-slate-900">
                        {workerName}
                      </h3>

                      <p className="text-sm text-slate-500 font-medium">
                        {workerTitle}
                      </p>
                    </div>

                    {/* LOCATION */}
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">

                      <MapPin className="w-4 h-4" />

                      <span>
                        {worker.location || "Nairobi"}
                      </span>
                    </div>

                    {/* RATING */}
                    <div className="flex items-center gap-1 mb-4">

                      <Star className="w-4 h-4 text-yellow-400 fill-current" />

                      <span className="text-sm font-bold text-slate-700">
                        {(worker.rating ?? 0).toFixed(1)}
                      </span>

                      <span className="text-sm text-slate-400">
                        ({worker.reviews_count ?? 0} reviews)
                      </span>

                    </div>

                    {/* SKILLS */}
                    {worker.skills &&
                      worker.skills.length > 0 && (

                      <div className="flex flex-wrap gap-2 mb-4">

                        {worker.skills
                          .slice(0, 3)
                          .map((skill, index) => (

                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* FOOTER */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">

                      <div className="text-slate-900 font-bold">

                        KSh {hourlyRate}

                        <span className="text-slate-400 text-sm font-normal">
                          /hour
                        </span>
                      </div>

                      <Link
                        to={`/workers/${worker.id}`}
                        className="text-[#2563EB] font-bold text-sm hover:text-blue-700 transition-colors"
                      >
                        View Profile
                      </Link>

                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Workers;