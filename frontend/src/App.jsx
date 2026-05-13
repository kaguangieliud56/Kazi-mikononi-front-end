
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';  
import Home from './pages/Home/Home.jsx';             
import Login from './pages/Login/Login.jsx';  
import Register from './pages/Login/register.jsx';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;