
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { Icons } from '../constants';

const PoojariList: React.FC = () => {
  const { providers } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    experience: 0,
    language: 'All',
    temple: 'All'
  });

  const poojaris = useMemo(() => {
    return providers.filter(p => p.type === 'poojari').filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.services.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesExp = p.experience >= filters.experience;
      const matchesLang = filters.language === 'All' || p.languages.includes(filters.language);
      return matchesSearch && matchesExp && matchesLang;
    });
  }, [providers, searchTerm, filters]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 max-w-6xl py-12">
        {/* Header Search */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold mb-8 text-slate-900">Spiritual Guidance & Rituals</h1>
          <div className="relative max-w-3xl mx-auto group">
            <input 
              type="text" 
              placeholder="Search by name, pooja type, or temple..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-6 pl-14 rounded-3xl border-none shadow-xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg transition-all group-focus-within:shadow-indigo-100"
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition">
              <Icons.Search />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters */}
          <aside className="lg:w-1/4 bg-white p-8 rounded-[2rem] shadow-sm h-fit sticky top-24 border border-slate-100">
            <h3 className="font-extrabold text-xl mb-8 flex items-center text-slate-900">
              Refine Results
            </h3>
            
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Experience Level</label>
                <input 
                  type="range" min="0" max="25" step="5" 
                  value={filters.experience}
                  onChange={(e) => setFilters({...filters, experience: parseInt(e.target.value)})}
                  className="w-full accent-indigo-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer" 
                />
                <div className="flex justify-between text-xs font-bold text-slate-400 mt-3">
                  <span>0y</span>
                  <span className="text-indigo-600 font-extrabold">{filters.experience}y+</span>
                  <span>25y</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Preferred Language</label>
                <select 
                  value={filters.language}
                  onChange={(e) => setFilters({...filters, language: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  <option>All</option>
                  <option>Sanskrit</option>
                  <option>Hindi</option>
                  <option>Kannada</option>
                  <option>English</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Association</label>
                <select 
                  value={filters.temple}
                  onChange={(e) => setFilters({...filters, temple: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  <option>All</option>
                  <option>Local Temples</option>
                  <option>Independent</option>
                </select>
              </div>

              <button 
                onClick={() => setFilters({ experience: 0, language: 'All', temple: 'All' })}
                className="w-full py-4 text-slate-400 font-bold text-sm hover:text-indigo-600 transition"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* List */}
          <div className="lg:w-3/4 space-y-8">
            {poojaris.length > 0 ? poojaris.map(p => (
              <div key={p.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col sm:flex-row gap-8 group">
                <div className="w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0 shadow-lg group-hover:scale-105 transition duration-500">
                  <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                        {p.name}
                        {p.verified && <Icons.Shield />}
                      </h3>
                      <p className="text-indigo-600 font-bold text-sm">{p.temple || 'Independent Expert'}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl text-amber-700 font-extrabold text-sm border border-amber-100">
                      <Icons.Star />
                      {p.rating}
                    </div>
                  </div>
                  <p className="text-slate-500 leading-relaxed mb-6 line-clamp-2">{p.bio}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {p.services.slice(0, 3).map(s => (
                      <span key={s.id} className="px-4 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-full border border-slate-100">
                        {s.name}
                      </span>
                    ))}
                    {p.services.length > 3 && <span className="text-xs font-bold text-slate-300 self-center">+{p.services.length - 3} more</span>}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                    <div className="flex gap-4 items-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Experience</span>
                        <span className="text-sm font-extrabold text-slate-900">{p.experience} Years</span>
                      </div>
                      <div className="w-px h-8 bg-slate-100 mx-2"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reviews</span>
                        <span className="text-sm font-extrabold text-slate-900">120+</span>
                      </div>
                    </div>
                    <Link 
                      to={`/provider/${p.id}`}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                    >
                      Check Availability
                    </Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
                  <Icons.Search />
                </div>
                <h3 className="text-xl font-bold text-slate-400">No priests found matching your criteria.</h3>
                <button onClick={() => setFilters({ experience: 0, language: 'All', temple: 'All' })} className="mt-4 text-indigo-600 font-bold hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoojariList;
