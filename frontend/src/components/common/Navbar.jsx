// Navbar Component
// src/components/common/Navbar.jsx - NO Link import!
const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-xl border-b border-white/20 z-50 py-4">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="text-4xl">🔨</div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Kazi Mikononi
            </h1>
          </a>
          
          {/* Links */}
          <div className="space-x-8">
            <a href="/" className="text-white hover:text-yellow-400 font-semibold transition-all">🏠 Home</a>
            <a href="/login" className="text-white hover:text-yellow-400 font-semibold transition-all">🔐 Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;