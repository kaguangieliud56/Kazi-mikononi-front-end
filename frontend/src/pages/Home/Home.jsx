import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

const Home = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  
  //Each service has icon, title, subtitle (like database rows)
  const services = [
    { icon: "🔧", title: "Fundi Bomba", subtitle: "Kurekebisha mabomba" },
    { icon: "🧹", title: "House Cleaning", subtitle: "Kusafisha nyumba" },
    { icon: "📚", title: "Tutoring", subtitle: "Kufundisha watoto" },
    { icon: "⚡", title: "Fundi Umeme", subtitle: "Kurekebisha umeme" },
    { icon: "🔨", title: "Fundi Mbao", subtitle: "Kufanya mbao" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-600 pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-outfit">
              Find Skilled Workers in Your Area
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-2xl">
              Connect with trusted professionals for plumbing, cleaning, electrical work, tutoring, and more.
            </p>

            {/* Search Bar */}
            <div className="bg-white p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 shadow-2xl">
              <div className="flex-1 w-full flex items-center bg-slate-50 rounded-xl px-4 py-4 md:py-3 border border-transparent hover:border-slate-200 transition-colors">
                <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="What service do you need?"
                  className="bg-transparent border-none outline-none w-full text-slate-700 placeholder-slate-400 text-lg"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex-1 w-full flex items-center bg-slate-50 rounded-xl px-4 py-4 md:py-3 border border-transparent hover:border-slate-200 transition-colors">
                <MapPin className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Your location"
                  className="bg-transparent border-none outline-none w-full text-slate-700 placeholder-slate-400 text-lg"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 md:py-3 rounded-xl font-semibold text-lg transition-colors whitespace-nowrap shadow-md">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16 font-outfit">
            Popular Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl text-center shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm">{service.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
