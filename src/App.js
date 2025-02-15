import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Menu, X } from 'lucide-react';
import BlogPage from './pages/BlogPage';
import SocialsDropdown from './components/SocialsDropdown';
import HomePage from './pages/HomePage';

const API_KEY = process.env.REACT_APP_CMC_API_KEY;
const TOKEN_ID = '31798'; // UCID for JENNER token

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg z-50 transition-all duration-300" style={{ backgroundColor: `rgba(23, 25, 35, ${Math.min(scrollY / 500, 0.9)})` }}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-400 glow">CoinBag</h1>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-teal-300 hover:text-teal-100 transition duration-200 hover:glow">Home</Link>
          <Link to="/blog" className="text-teal-300 hover:text-teal-100 transition duration-200 hover:glow">Blog</Link>
          <SocialsDropdown />
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-teal-300 hover:text-teal-100">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-800 py-2">
          <Link to="/" className="block px-4 py-2 text-teal-300 hover:text-teal-100 hover:bg-gray-700">Home</Link>
          <Link to="/blog" className="block px-4 py-2 text-teal-300 hover:text-teal-100 hover:bg-gray-700">Blog</Link>
          <SocialsDropdown />
        </div>
      )}
    </header>
  );

  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
        <footer className="bg-gray-900 py-8 px-4">
          <div className="container mx-auto text-center">
            <p className="text-teal-300">
              Data provided by <a href="https://coinmarketcap.com/" className="underline hover:text-teal-100" target="_blank" rel="noopener noreferrer">CoinMarketCap</a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
