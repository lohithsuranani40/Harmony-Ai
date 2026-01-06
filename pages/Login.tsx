
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const [role, setRole] = useState<UserRole>('customer');
  const [isLogin, setIsLogin] = useState(true);
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful auth
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'customer' ? 'John Doe' : 'Pandit Ravi',
      email: 'user@example.com',
      role: role,
    });
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar Info */}
        <div className="bg-indigo-600 p-8 md:w-5/12 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Harmony</h2>
          <p className="text-indigo-100 mb-8">Join the community of trusted professionals and happy customers.</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs">✓</div>
              <span className="text-sm">Verified Providers</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs">✓</div>
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs">✓</div>
              <span className="text-sm">Reliable Ratings</span>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <div className="p-8 md:w-7/12">
          <div className="flex mb-8 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setRole('customer')}
              className={`flex-1 py-2 rounded-lg font-medium transition ${role === 'customer' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
            >
              Customer
            </button>
            <button 
              onClick={() => setRole('provider')}
              className={`flex-1 py-2 rounded-lg font-medium transition ${role === 'provider' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
            >
              Professional
            </button>
          </div>

          <h3 className="text-2xl font-bold mb-6 text-slate-800">
            {isLogin ? 'Welcome Back!' : `Register as ${role === 'customer' ? 'a Customer' : 'an Expert'}`}
          </h3>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" required className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                {role === 'provider' && (
                  <>
                    <input type="text" placeholder="Company Name (Optional)" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    <select className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                      <option>Priest / Poojari</option>
                      <option>Plumbing Contractor</option>
                    </select>
                    <input type="text" placeholder="Experience (Years)" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    <div className="border-2 border-dashed border-slate-200 p-4 rounded-xl text-center">
                      <p className="text-sm text-slate-500 mb-2">Upload Aadhar / Driving License</p>
                      <input type="file" className="hidden" id="file-upload" />
                      <label htmlFor="file-upload" className="cursor-pointer text-indigo-600 font-bold hover:underline">Browse Files</label>
                    </div>
                  </>
                )}
              </div>
            )}
            <input type="email" placeholder="Email Address" required className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            <input type="password" placeholder="Password" required className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            
            <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-600 font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
