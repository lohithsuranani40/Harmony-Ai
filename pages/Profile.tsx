
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../App';
import { Icons } from '../constants';
import { BookingStatus, Service } from '../types';

const Profile: React.FC = () => {
  const { user, bookings, updateBookingStatus, providers, updateProvider } = useAppContext();
  const isProvider = user?.role === 'provider';
  const [activeTab, setActiveTab] = useState<'details' | 'bookings' | 'services'>(isProvider ? 'bookings' : 'bookings');
  
  // Find professional profile for logged in provider
  const professionalProfile = useMemo(() => {
    return providers.find(p => p.id === user?.id) || providers[0]; // Fallback to first mock for demo
  }, [providers, user]);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '9876543210',
    bio: professionalProfile?.bio || '',
    experience: professionalProfile?.experience.toString() || '0',
  });

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    name: '',
    price: 0,
    description: '',
    items: []
  });

  const filteredBookings = isProvider 
    ? bookings.filter(b => b.providerId === professionalProfile.id)
    : bookings.filter(b => b.customerId === user?.id);

  const handleSaveProfile = () => {
    if (isProvider) {
      updateProvider({
        ...professionalProfile,
        name: profileData.name,
        bio: profileData.bio,
        experience: parseInt(profileData.experience) || 0
      });
    }
    alert("Profile updated successfully!");
  };

  const handleOpenServiceModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setNewService({ ...service });
    } else {
      setEditingService(null);
      setNewService({ name: '', price: 0, description: '', items: [] });
    }
    setIsServiceModalOpen(true);
  };

  const handleSaveService = () => {
    if (!newService.name || !newService.price) {
      alert("Please fill in service name and price.");
      return;
    }

    const serviceToSave = {
      ...newService,
      id: editingService?.id || Math.random().toString(36).substr(2, 9),
    } as Service;

    const updatedServices = editingService 
      ? professionalProfile.services.map(s => s.id === editingService.id ? serviceToSave : s)
      : [...professionalProfile.services, serviceToSave];

    updateProvider({
      ...professionalProfile,
      services: updatedServices
    });

    setIsServiceModalOpen(false);
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm("Are you sure you want to remove this service?")) {
      updateProvider({
        ...professionalProfile,
        services: professionalProfile.services.filter(s => s.id !== serviceId)
      });
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch(status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-1/4 space-y-4">
            <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col items-center border border-slate-100">
              <div className="w-24 h-24 rounded-full bg-indigo-100 mb-4 flex items-center justify-center text-indigo-600 text-4xl font-bold shadow-inner">
                {user?.name?.[0]}
              </div>
              <h3 className="font-bold text-xl text-slate-800">{profileData.name}</h3>
              <p className="text-slate-500 text-sm font-medium capitalize mb-6">{user?.role}</p>
              
              <nav className="w-full space-y-1">
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition ${activeTab === 'bookings' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  My Bookings
                </button>
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition ${activeTab === 'details' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  Account Details
                </button>
                {isProvider && (
                  <button 
                    onClick={() => setActiveTab('services')}
                    className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition ${activeTab === 'services' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    My Services
                  </button>
                )}
              </nav>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h4 className="font-bold mb-4 text-[10px] uppercase text-slate-400 tracking-widest">Trust & Safety</h4>
              <div className="flex items-center gap-3 text-emerald-600 font-bold text-sm">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Icons.Shield />
                </div>
                Identity Verified
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="md:w-3/4 animate-fade-in">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800">Recent Appointments</h2>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Total: {filteredBookings.length}</div>
                </div>
                
                {filteredBookings.length > 0 ? (
                  <div className="space-y-4">
                    {filteredBookings.map(b => (
                      <div key={b.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                              {b.service.name[0]}
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-bold text-slate-900">{b.service.name}</h4>
                                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider ${getStatusColor(b.status)}`}>
                                  {b.status}
                                </span>
                              </div>
                              <p className="text-xs text-indigo-600 font-bold">
                                {isProvider ? `Client: ${b.customerName}` : `Provider: ${b.providerName}`}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:items-end justify-center">
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
                              <Icons.User />
                              {new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {b.time}
                            </div>
                            <p className="text-slate-900 font-extrabold">₹{b.totalAmount}</p>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-50 flex flex-wrap gap-2">
                          {isProvider && b.status === 'pending' && (
                            <button 
                              onClick={() => updateBookingStatus(b.id, 'confirmed')}
                              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition"
                            >
                              Confirm Booking
                            </button>
                          )}
                          {b.status === 'confirmed' && (
                            <button 
                              onClick={() => updateBookingStatus(b.id, 'completed')}
                              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition"
                            >
                              Mark as Completed
                            </button>
                          )}
                          {(b.status === 'pending' || b.status === 'confirmed') && (
                            <button 
                              onClick={() => updateBookingStatus(b.id, 'cancelled')}
                              className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition"
                            >
                              Cancel Appointment
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-20 rounded-3xl text-center shadow-sm border border-slate-100">
                    <p className="text-slate-400 font-medium">No bookings found in your history.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-8">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" value={profileData.name} 
                      onChange={e => setProfileData({...profileData, name: e.target.value})}
                      className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Contact Phone</label>
                    <input 
                      type="tel" value={profileData.phone}
                      onChange={e => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" value={profileData.email} disabled
                      className="w-full p-4 bg-slate-100 rounded-2xl outline-none text-slate-400 cursor-not-allowed border-none" 
                    />
                  </div>
                  {isProvider && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Years of Experience</label>
                        <input 
                          type="number" value={profileData.experience}
                          onChange={e => setProfileData({...profileData, experience: e.target.value})}
                          className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none" 
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Professional Bio</label>
                        <textarea 
                          rows={4}
                          value={profileData.bio}
                          onChange={e => setProfileData({...profileData, bio: e.target.value})}
                          className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none" 
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-10 flex justify-end gap-4">
                   <button 
                    onClick={handleSaveProfile}
                    className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                   >
                     Save Profile
                   </button>
                </div>
              </div>
            )}

            {activeTab === 'services' && isProvider && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-xl font-bold">My Service Catalog</h3>
                    <p className="text-sm text-slate-500 mt-1">Manage the services customers can book from you.</p>
                  </div>
                  <button 
                    onClick={() => handleOpenServiceModal()}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                    <span>+ Add New Service</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {professionalProfile.services.map(s => (
                    <div key={s.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-slate-900 text-lg">{s.name}</h4>
                            <span className="font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-sm">₹{s.price}</span>
                          </div>
                          <p className="text-sm text-slate-500 line-clamp-2 mb-3">{s.description}</p>
                          {s.items && s.items.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {s.items.map(item => (
                                <span key={item} className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-md uppercase">{item}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex sm:flex-col justify-end gap-2">
                          <button 
                            onClick={() => handleOpenServiceModal(s)}
                            className="p-3 bg-white text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition shadow-sm border border-slate-200"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteService(s.id)}
                            className="p-3 bg-white text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition shadow-sm border border-slate-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {professionalProfile.services.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl">
                      <p className="text-slate-400 font-medium">You haven't added any services yet.</p>
                      <button onClick={() => handleOpenServiceModal()} className="text-indigo-600 font-bold mt-2 hover:underline">Click here to start</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Add/Edit Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900">{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                <button onClick={() => setIsServiceModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition">✕</button>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Service Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Premium House Havan"
                    value={newService.name}
                    onChange={e => setNewService({...newService, name: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none" 
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Base Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="2500"
                    value={newService.price || ''}
                    onChange={e => setNewService({...newService, price: parseInt(e.target.value) || 0})}
                    className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Service Description</label>
                  <textarea 
                    placeholder="Briefly describe what's included..."
                    value={newService.description}
                    onChange={e => setNewService({...newService, description: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none" 
                    rows={3}
                  />
                </div>

                {professionalProfile.type === 'poojari' && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Required Items (comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="Coconut, Ghee, Sandalwood..."
                      value={newService.items?.join(', ')}
                      onChange={e => setNewService({...newService, items: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')})}
                      className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none" 
                    />
                  </div>
                )}
              </div>

              <div className="mt-10 flex gap-4">
                <button 
                  onClick={handleSaveService}
                  className="flex-grow bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                >
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
                <button 
                  onClick={() => setIsServiceModalOpen(false)}
                  className="bg-slate-100 text-slate-600 font-bold px-8 py-4 rounded-2xl hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
