
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { Icons } from '../constants';
import { Booking } from '../types';

const Checkout: React.FC = () => {
  const { user, cart, removeFromCart, clearCart, addBooking } = useAppContext();
  const navigate = useNavigate();
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Refs to trigger native pickers
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.service.price, 0);
  const platformFee = 49;
  const total = subtotal > 0 ? subtotal + platformFee : 0;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!date || !time) {
      alert("Please select a date and time for your service.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    cart.forEach(item => {
      const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        customerId: user.id,
        customerName: user.name,
        providerId: item.providerId,
        providerName: item.providerName,
        service: item.service,
        date,
        time,
        status: 'pending',
        totalAmount: item.service.price + (platformFee / cart.length),
        paymentMethod,
        createdAt: Date.now(),
      };
      addBooking(newBooking);
    });

    setIsProcessing(false);
    alert("Booking & Payment Successful! Your service provider has been notified.");
    clearCart();
    navigate('/profile');
  };

  // Helper to trigger native browser picker
  const triggerPicker = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current && 'showPicker' in HTMLInputElement.prototype) {
      try {
        ref.current.showPicker();
      } catch (e) {
        // Fallback for older browsers
        ref.current.focus();
      }
    } else {
      ref.current?.focus();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] bg-slate-50">
        <div className="bg-indigo-50 p-6 rounded-full mb-6">
          <Icons.Cart />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Add some services to get started.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
        >
          Browse Services
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">Confirm & Schedule</h1>
        
        <form onSubmit={handleBooking} className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            {/* Scheduling Section */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">1</span>
                Schedule Service
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">Select Date</label>
                  <div className="relative cursor-pointer" onClick={() => triggerPicker(dateInputRef)}>
                    <input 
                      ref={dateInputRef}
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      onFocus={() => triggerPicker(dateInputRef)}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer appearance-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-600 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">Select Preferred Time</label>
                  <div className="relative cursor-pointer" onClick={() => triggerPicker(timeInputRef)}>
                    <input 
                      ref={timeInputRef}
                      type="time" 
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      onFocus={() => triggerPicker(timeInputRef)}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer appearance-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-600 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">2</span>
                Secure Payment
              </h3>
              
              <div className="flex gap-4 mb-8 p-1 bg-slate-100 rounded-2xl">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${paymentMethod === 'card' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                >
                  Cards
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex-1 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${paymentMethod === 'upi' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                >
                  UPI
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex-1 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${paymentMethod === 'netbanking' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                >
                  Banking
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Card Number</label>
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="bg-slate-50 w-full p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">CVV</label>
                      <input type="password" placeholder="***" className="bg-slate-50 w-full p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
                    <p className="text-sm text-indigo-700 font-medium mb-4">Scan QR code or enter VPA</p>
                    <input type="text" placeholder="user@upi" className="w-full p-4 bg-white rounded-2xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none text-center font-bold" />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-4 animate-fade-in">
                   <select className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none">
                     <option>Select your bank</option>
                     <option>State Bank of India</option>
                     <option>HDFC Bank</option>
                     <option>ICICI Bank</option>
                     <option>Axis Bank</option>
                   </select>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-3xl shadow-sm h-fit sticky top-24 border border-slate-100">
              <h3 className="font-bold text-xl mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div className="flex-grow pr-2">
                      <p className="text-sm font-bold text-slate-800 line-clamp-1">{item.service.name}</p>
                      <p className="text-[11px] text-slate-400">by {item.providerName}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-bold text-slate-900">₹{item.service.price}</span>
                      <button 
                        type="button"
                        onClick={() => removeFromCart(item.service.id)}
                        className="text-[10px] text-red-400 font-bold hover:text-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-slate-50 space-y-2">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-extrabold text-2xl pt-4">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className={`w-full text-white font-bold py-5 rounded-2xl transition shadow-lg flex items-center justify-center gap-3 ${
                  isProcessing ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Complete Booking
                    <Icons.Check />
                  </>
                )}
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
                <Icons.Shield />
                Secure 256-Bit SSL Encryption
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
