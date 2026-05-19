import React, { useState } from "react";
import { Search, MapPin, Wrench, Brush, Zap, BookOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  
  //Each service has icon, title, subtitle
  const services = [
    { icon: <Wrench className="w-8 h-8 text-blue-600" />, title: "Plumbing", subtitle: "120+ Pros available" },
    { icon: <Brush className="w-8 h-8 text-blue-600" />, title: "Cleaning", subtitle: "250+ Pros available" },
    { icon: <Zap className="w-8 h-8 text-blue-600" />, title: "Electrician", subtitle: "85+ Pros available" },
    { icon: <BookOpen className="w-8 h-8 text-blue-600" />, title: "Tutoring", subtitle: "150+ Pros available" },
  ];

  return (
    <div className="font-outfit bg-white selection:bg-blue-100 selection:text-blue-600 flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero-bg.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Find Skilled Workers in Your Area
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl mx-auto font-light">
            Connect with trusted professionals for plumbing, cleaning, electrical work, tutoring, and more.
          </p>

          {/* Search Bar Container */}
          <div className="bg-white p-2 rounded-full shadow-2xl flex flex-col md:flex-row items-center max-w-4xl mx-auto border border-white/20">
            <div className="flex-1 w-full flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-slate-200">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="What service do you need?"
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder-slate-400 text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex-1 w-full flex items-center px-6 py-3">
              <MapPin className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Your location"
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder-slate-400 text-base"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button 
              onClick={() => navigate('/workers')}
              className="w-full md:w-auto bg-[#0a4fd4] hover:bg-blue-700 text-white px-10 py-3.5 rounded-full font-semibold text-base transition-colors whitespace-nowrap mt-2 md:mt-0"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fafbff]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-1">
                Popular Categories
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Trusted professionals ready to start today
              </p>
            </div>
            <button 
              onClick={() => navigate('/workers')}
              className="text-[#0a4fd4] font-bold hover:text-blue-800 transition-colors flex items-center gap-1 text-sm"
            >
              See all services
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                onClick={() => navigate('/workers')}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1e293b] mb-1">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-xs font-medium">{service.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f1f5f9]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Employers Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-10 md:p-12 shadow-sm border border-slate-100 flex flex-col justify-center">
            <p className="text-xs font-bold tracking-wider text-[#0a4fd4] uppercase mb-4">For Employers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-6 max-w-md">
              Access the best local talent instantly.
            </h2>
            <p className="text-slate-500 mb-10 max-w-lg leading-relaxed">
              Our vetting process ensures that only the most reliable and skilled professionals join our platform. Hire with confidence and get the job done right.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/post-job')}
                className="bg-[#0a4fd4] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Post a Job Now
              </button>
              
             
            </div>
          </div>

          {/* Safe & Secure Card */}
          <div className="bg-[#0a4fd4] rounded-3xl p-10 md:p-12 shadow-md text-white flex flex-col justify-center relative overflow-hidden">
            {/* Background subtle pattern/circle */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-xl"></div>
            
            <div className="relative z-10">
              <div className="mb-8">
                <svg width="40" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Safe & Secure</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-8">
                Every transaction and communication is encrypted and monitored for your peace of mind.
              </p>
              
              <div className="h-px bg-blue-500/50 w-full mb-8"></div>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {/* Dummy Avatars */}
                  <div className="w-8 h-8 rounded-full border-2 border-[#0a4fd4] overflow-hidden bg-slate-300">
                     <img src="https://i.pravatar.cc/150?img=11" alt="user" className="w-full h-full object-cover"/>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-[#0a4fd4] overflow-hidden bg-slate-300">
                     <img src="https://i.pravatar.cc/150?img=12" alt="user" className="w-full h-full object-cover"/>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-[#0a4fd4] overflow-hidden bg-slate-300">
                     <img src="https://i.pravatar.cc/150?img=13" alt="user" className="w-full h-full object-cover"/>
                  </div>
                </div>
                <p className="text-sm font-medium text-blue-50">Joined by 10k+ Pros</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-slate-100 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[#0a4fd4] font-bold text-xl tracking-tight">
            Kazi Mikononi
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-[#0a4fd4] transition-colors">About Us</a>
            <a href="#" className="hover:text-[#0a4fd4] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#0a4fd4] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#0a4fd4] transition-colors">Contact Support</a>
          </div>
          <div className="text-xs text-slate-400">
            © 2024 Kazi Mikononi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
