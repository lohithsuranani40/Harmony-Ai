
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Harmony</h3>
          <p className="text-slate-400 text-sm">
            Connecting expertise with need. The all-in-one platform for reliable local services.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-indigo-400">Services</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="/#/poojari" className="hover:text-white transition">Priest Services</a></li>
            <li><a href="/#/plumber" className="hover:text-white transition">Plumbing</a></li>
            <li><a href="#" className="hover:text-white transition">Electrical (Coming Soon)</a></li>
            <li><a href="#" className="hover:text-white transition">Cleaning (Coming Soon)</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-indigo-400">Company</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-indigo-400">Support</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition">Grievances</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Harmony Technologies. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
