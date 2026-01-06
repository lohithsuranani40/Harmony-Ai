
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PROVIDERS } from '../mockData';
import { Icons } from '../constants';

const PlumberList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const plumbers = MOCK_PROVIDERS.filter(p => p.type === 'plumber').filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 max-w-5xl py-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-6">Expert Plumbers</h1>
          <div className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Search by name or specialty..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 rounded-2xl border-none shadow-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Icons.Search />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plumbers.map(p => (
            <div key={p.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100">
                  <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    {p.name}
                    {p.verified && <Icons.Shield />}
                  </h3>
                  <p className="text-indigo-600 text-sm font-semibold">{p.companyName || 'Individual Professional'}</p>
                </div>
                <div className="ml-auto flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg text-amber-700 font-bold text-sm">
                  <Icons.Star />
                  {p.rating}
                </div>
              </div>
              
              <p className="text-slate-600 text-sm mb-6 line-clamp-2">{p.bio}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {p.services.map(s => (
                  <span key={s.id} className="px-2 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded uppercase">
                    {s.name}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="text-slate-500 text-xs font-medium">{p.experience}y experience</span>
                <Link 
                  to={`/provider/${p.id}`}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition"
                >
                  Hire Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlumberList;
