
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User, CartItem, Booking, BookingStatus, ServiceProvider } from './types';
import { MOCK_PROVIDERS } from './mockData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import PoojariList from './pages/PoojariList';
import PlumberList from './pages/PlumberList';
import ServiceDetail from './pages/ServiceDetail';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';

// Component to handle scroll reset and anchor scrolling on navigation
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash (like #about), scroll to that element
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Use a slight timeout to ensure content is rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Otherwise, scroll to the top of the page
      window.scrollTo(0, 0);
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;
    }
  }, [pathname, hash]);

  return null;
};

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  providers: ServiceProvider[];
  updateProvider: (provider: ServiceProvider) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('harmony_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('harmony_bookings');
    return saved ? JSON.parse(saved) : [];
  });
  const [providers, setProviders] = useState<ServiceProvider[]>(() => {
    const saved = localStorage.getItem('harmony_providers');
    return saved ? JSON.parse(saved) : MOCK_PROVIDERS;
  });

  useEffect(() => {
    if (user) localStorage.setItem('harmony_user', JSON.stringify(user));
    else localStorage.removeItem('harmony_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('harmony_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('harmony_providers', JSON.stringify(providers));
  }, [providers]);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (serviceId: string) => {
    setCart(prev => prev.filter(i => i.service.id !== serviceId));
  };

  const clearCart = () => setCart([]);

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const updateProvider = (updatedProvider: ServiceProvider) => {
    setProviders(prev => prev.map(p => p.id === updatedProvider.id ? updatedProvider : p));
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, cart, addToCart, removeFromCart, clearCart, 
      bookings, addBooking, updateBookingStatus,
      providers, updateProvider
    }}>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/poojari" element={<PoojariList />} />
              <Route path="/plumber" element={<PlumberList />} />
              <Route path="/provider/:id" element={<ServiceDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
