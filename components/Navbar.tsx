
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { Icons } from '../constants';

const Navbar: React.FC = () => {
  const { user, setUser, cart } = useAppContext();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  
  const servicesRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close Services dropdown if click is outside
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      // Close Profile dropdown if click is outside
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
    navigate('/');
  };

  const services = [
    { name: 'Poojari Services', path: '/poojari' },
    { name: 'Plumbing Services', path: '/plumber' },
    { name: 'Electrical (Coming Soon)', path: '#', disabled: true },
    { name: 'Cleaning (Coming Soon)', path: '#', disabled: true },
    { name: 'Salon (Coming Soon)', path: '#', disabled: true },
    { name: 'Carpentry (Coming Soon)', path: '#', disabled: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 h-16 flex items-center shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center">
          Harmony
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="relative" ref={servicesRef}>
            <button 
              onMouseEnter={() => setIsServicesOpen(true)}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center space-x-1 text-slate-600 hover:text-indigo-600 font-medium transition py-2"
            >
              <span>Services</span>
              <Icons.ChevronDown />
            </button>
            
            {isServicesOpen && (
              <div 
                className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto animate-fade-in"
              >
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Categories</p>
                </div>
                {services.map((s, i) => (
                  <Link 
                    key={i}
                    to={s.disabled ? '#' : s.path}
                    onClick={() => {
                      if (!s.disabled) {
                        setIsServicesOpen(false);
                      }
                    }}
                    className={`block px-4 py-3 hover:bg-slate-50 text-sm font-medium transition ${s.disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:text-indigo-600'}`}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/#about" className="text-slate-600 hover:text-indigo-600 font-medium transition">About Us</Link>
          <Link to="/#contact" className="text-slate-600 hover:text-indigo-600 font-medium transition">Queries</Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Link to="/checkout" className="relative p-2 text-slate-600 hover:text-indigo-600 transition">
            <Icons.Cart />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200 hover:bg-indigo-200 transition"
              >
                <Icons.User />
              </button>
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{user.role}</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm" 
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-red-600 border-t border-slate-100 text-sm font-bold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md shadow-indigo-100"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
