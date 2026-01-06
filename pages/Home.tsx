
import React from 'react';
import { Link } from 'react-router-dom';
// Fix: Import Icons from constants to resolve undefined reference error
import { Icons } from '../constants';

const Home: React.FC = () => {
  const serviceCategories = [
    {
      title: "Poojari & Spiritual",
      description: "Connect with learned priests for weddings, housewarmings, and rituals.",
      path: "/poojari",
      image: "https://picsum.photos/seed/pooja/800/600",
      cta: "Explore Priests"
    },
    {
      title: "Plumbing & Home Repair",
      description: "Experienced plumbers for leakages, installations, and cleaning.",
      path: "/plumber",
      image: "https://picsum.photos/seed/plumb/800/600",
      cta: "Find a Plumber"
    },
    {
      title: "Electrical & Lighting",
      description: "Safe and reliable electrical work for your home and office.",
      path: "#",
      image: "https://picsum.photos/seed/electro/800/600",
      cta: "Coming Soon",
      disabled: true
    },
    {
      title: "Professional Cleaning",
      description: "Deep cleaning services for a healthier, fresher living space.",
      path: "#",
      image: "https://picsum.photos/seed/clean/800/600",
      cta: "Coming Soon",
      disabled: true
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-white py-24 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-tight">
            Connecting You with <br/><span className="text-indigo-600">Verified Experts</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Harmony is your personal gateway to trusted local professionals. From sacred spiritual rituals to essential home maintenance, we bring the best experts directly to you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/poojari" className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-2xl shadow-indigo-200 text-lg">
              Book a Service
            </Link>
            <Link to="/#about" className="bg-white text-slate-700 border border-slate-200 px-10 py-5 rounded-2xl font-bold hover:bg-slate-50 transition shadow-sm text-lg">
              How it Works
            </Link>
          </div>
        </div>
      </section>

      {/* Service Selection Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Specialized Categories</h2>
              <p className="text-slate-500 max-w-md">Our growing list of services ensures you find exactly what you need, when you need it.</p>
            </div>
            <div className="hidden md:block">
              <div className="flex gap-2">
                <span className="w-12 h-1.5 bg-indigo-600 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {serviceCategories.map((cat, idx) => (
              <div key={idx} className={`group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 ${cat.disabled ? 'opacity-70' : ''}`}>
                <div className="h-72 overflow-hidden relative">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-extrabold mb-4 text-slate-900 group-hover:text-indigo-600 transition">{cat.title}</h3>
                  <p className="text-slate-600 mb-8 text-lg leading-relaxed">{cat.description}</p>
                  
                  {cat.disabled ? (
                    <span className="inline-flex items-center gap-2 text-slate-400 font-bold bg-slate-50 px-6 py-3 rounded-xl border border-slate-100">
                      Coming Soon
                    </span>
                  ) : (
                    <Link to={cat.path} className="inline-flex items-center gap-3 text-indigo-600 font-extrabold text-lg group/link">
                      {cat.cta}
                      <span className="group-hover/link:translate-x-3 transition-transform duration-300 text-2xl">→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Harmony? */}
      <section id="about" className="py-24 bg-white border-y border-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-6">Built for Trust & Ease</h2>
            <div className="h-2 w-24 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto transform -rotate-6 hover:rotate-0 transition duration-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 20.944a11.955 11.955 0 01-8.618-3.04m17.236 0a11.955 11.955 0 01-8.618 3.04v-9.338" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Identity Verified</h3>
              <p className="text-slate-500 leading-relaxed px-4">Every provider is vetted via Aadhar or official documents to ensure complete safety and reliability.</p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 mx-auto transform rotate-6 hover:rotate-0 transition duration-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Direct & Fair</h3>
              <p className="text-slate-500 leading-relaxed px-4">Bypass middlemen. See professional rates upfront, chat to discuss details, and pay securely within the app.</p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto transform -rotate-3 hover:rotate-0 transition duration-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Instant Updates</h3>
              <p className="text-slate-500 leading-relaxed px-4">Real-time chat, automated booking reminders, and easy sharing of item lists via WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white shadow-3xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-5xl font-extrabold mb-8 leading-tight">We're here to help</h2>
                <p className="text-slate-400 text-xl mb-12 leading-relaxed">Have a question about a service? Need help with a booking? Our support team is available round the clock.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-indigo-600/30 rounded-xl flex items-center justify-center text-indigo-400">
                      <Icons.Chat />
                    </div>
                    <span className="text-lg font-medium">support@harmony.app</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-indigo-600/30 rounded-xl flex items-center justify-center text-indigo-400">
                      <Icons.User />
                    </div>
                    <span className="text-lg font-medium">1800-HARMONY-SOS</span>
                  </div>
                </div>
              </div>
              <form className="space-y-6">
                <input type="text" placeholder="Your Name" className="w-full bg-slate-800 border-none rounded-2xl p-6 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 transition text-lg" />
                <input type="email" placeholder="Email Address" className="w-full bg-slate-800 border-none rounded-2xl p-6 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 transition text-lg" />
                <textarea placeholder="Message..." rows={4} className="w-full bg-slate-800 border-none rounded-2xl p-6 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 transition text-lg"></textarea>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-6 rounded-2xl transition shadow-xl shadow-indigo-900/50 text-xl">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
