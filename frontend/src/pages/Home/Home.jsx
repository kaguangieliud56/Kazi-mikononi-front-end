// Home Page
import React, { useState } from "react";
import imgHero from "../../assets/hero.png";

const Home = () => {
  const [search, setSearch] = useState("");
  //Each service has icon, title, subtitle (like database rows)
  const services = [
    { icon: "🔧", title: "Fundi Bomba", subtitle: "Kurekebisha mabomba" },
    { icon: "🧹", title: "House Cleaning", subtitle: "Kusafisha nyumba" },
    { icon: "📚", title: "Tutoring", subtitle: "Kufundisha watoto" },
    { icon: "⚡", title: "Fundi Umeme", subtitle: "Kurekebisha umeme" },
    { icon: "🔨", title: "Fundi Mbao", subtitle: "Kufanya mbao" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Text */}
            <div className="text-white">
              <h1 className="text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent leading-tight">
                Kazi <br />
                <span className="text-6xl">Mikononi</span>
              </h1>
              <p className="text-2xl mb-12 opacity-90 leading-relaxed max-w-lg">
                Find the best workers near you. Post a job, get bids, pay securely.
              </p>

              {/* Search */}
              <div className="relative max-w-lg mb-12">
                <input
                  type="text"
                  placeholder="Search for plumbers, cleaners, tutors..."
                  className="w-full p-6 pl-14 rounded-3xl text-xl bg-white/20 backdrop-blur-xl border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <svg
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35"
                  ></path>
                </svg>
              </div>

              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-12 py-6 rounded-3xl text-2xl font-black shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
                Start searching
              </button>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src={imgHero}
                alt="Hero"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-black text-white text-center mb-24">
            Services <span className="text-yellow-400">Zinazopatikana</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl text-center hover:bg-white/20 hover:-translate-y-6 hover:shadow-2xl border-2 border-transparent hover:border-yellow-400 transition-all duration-500 h-full">
                  <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-lg">{service.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
