
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { Icons } from '../constants';

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const { addToCart, cart, providers } = useAppContext();
  const provider = providers.find(p => p.id === id);
  const [showChat, setShowChat] = useState(false);

  if (!provider) return (
    <div className="p-32 text-center bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold text-slate-400">Provider not found.</h2>
      <Link to="/" className="text-indigo-600 font-bold mt-4 inline-block hover:underline">Back to Home</Link>
    </div>
  );

  const isInCart = (serviceId: string) => cart.some(i => i.service.id === serviceId);

  const handleShareToWhatsApp = (serviceName: string, items?: string[]) => {
    if (!items || items.length === 0) return;
    const text = `*Pooja Items List for ${serviceName}*%0A%0A` + 
                 items.map(i => `- ${i}`).join('%0A') + 
                 `%0A%0ABooked via Harmony App.`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 max-w-6xl py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-[3rem] p-10 shadow-sm mb-12 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-2xl flex-shrink-0 border-4 border-white">
              <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div>
                  <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-4 mb-2">
                    {provider.name}
                    {provider.verified && <Icons.Shield />}
                  </h1>
                  <p className="text-indigo-600 font-extrabold text-lg">{provider.companyName || provider.temple || 'Individual Professional'}</p>
                  
                  <div className="flex flex-wrap items-center gap-10 mt-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-50 p-2 rounded-xl text-amber-600">
                        <Icons.Star />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 leading-none">{provider.rating}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Rating</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                        <Icons.User />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 leading-none">{provider.experience}y</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Experience</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                        <Icons.Check />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 leading-none">Verified</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Background Check</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button 
                    onClick={() => setShowChat(true)}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-100 text-slate-800 rounded-2xl font-bold hover:bg-slate-200 transition text-lg"
                  >
                    <Icons.Chat />
                    Start Chat
                  </button>
                  <Link to="/checkout" className="flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 text-lg">
                    Proceed to Cart
                  </Link>
                </div>
              </div>
              
              <div className="mt-12 border-t border-slate-50 pt-10">
                <h3 className="text-xl font-extrabold text-slate-900 mb-4">About {provider.type === 'poojari' ? 'the Pandit' : 'the Professional'}</h3>
                <p className="text-slate-600 text-lg leading-relaxed max-w-4xl">{provider.bio}</p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Fluent In:</span>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages.map(l => (
                      <span key={l} className="text-sm font-bold text-indigo-700 bg-indigo-50 px-5 py-2 rounded-full border border-indigo-100">{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services List Grid */}
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Service Catalog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {provider.services.map(s => (
            <div key={s.id} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:border-indigo-200 transition-all duration-300 flex flex-col group">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition">{s.name}</h3>
                <span className="text-indigo-600 font-extrabold text-2xl bg-indigo-50 px-4 py-2 rounded-2xl">₹{s.price}</span>
              </div>
              <p className="text-slate-500 text-lg mb-8 flex-grow leading-relaxed">{s.description}</p>
              
              {provider.type === 'poojari' && s.items && s.items.length > 0 && (
                <div className="mb-10 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Required Pooja Items</h4>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map(item => (
                      <span key={item} className="px-3 py-1 bg-white text-slate-600 text-[11px] font-extrabold rounded-lg border border-slate-200">{item}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-auto">
                <button 
                  onClick={() => addToCart({ providerId: provider.id, providerName: provider.name, service: s })}
                  disabled={isInCart(s.id)}
                  className={`flex-grow py-5 rounded-2xl font-extrabold transition flex items-center justify-center gap-3 text-lg ${
                    isInCart(s.id) ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'
                  }`}
                >
                  {isInCart(s.id) ? (
                    <>
                      <Icons.Check />
                      In Your Cart
                    </>
                  ) : (
                    <>
                      Add to Booking
                    </>
                  )}
                </button>
                
                {provider.type === 'poojari' && s.items && s.items.length > 0 && (
                  <button 
                    onClick={() => handleShareToWhatsApp(s.name, s.items)}
                    title="Send item list to WhatsApp"
                    className="p-5 bg-emerald-100 text-emerald-600 rounded-2xl hover:bg-emerald-200 transition border border-emerald-200 shadow-sm"
                  >
                    <Icons.WhatsApp />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Modal Mock */}
      {showChat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up">
            <div className="bg-indigo-600 p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={provider.avatar} alt="" className="w-12 h-12 rounded-2xl border border-white/20 shadow-sm" />
                <div>
                  <p className="font-extrabold text-lg leading-tight">{provider.name}</p>
                  <p className="text-xs font-medium opacity-80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    Currently Online
                  </p>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">✕</button>
            </div>
            <div className="h-[400px] p-8 overflow-y-auto bg-slate-50 flex flex-col gap-6">
              <div className="bg-white border border-slate-100 p-5 rounded-3xl rounded-tl-none self-start max-w-[85%] text-slate-700 shadow-sm leading-relaxed">
                Namaste! I am available to discuss your requirements. Which ceremony or service are you planning for?
              </div>
              <div className="bg-indigo-600 text-white p-5 rounded-3xl rounded-tr-none self-end max-w-[85%] shadow-lg shadow-indigo-100 leading-relaxed">
                Hello Pandit Ji, I need to discuss the auspicious timing for the Griha Pravesh.
              </div>
            </div>
            <div className="p-8 border-t border-slate-100 bg-white">
              <div className="flex gap-4">
                <input type="text" placeholder="Type your message..." className="flex-grow p-5 bg-slate-100 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-600 text-slate-800 font-medium" />
                <button className="p-5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
                  <Icons.Check />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-6">
                <Icons.Shield />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">End-to-End Encrypted Private Chat</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
