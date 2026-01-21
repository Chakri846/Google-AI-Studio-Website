
import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { 
  Users, Calendar, Activity, Settings, Layout, Plus, Trash2, 
  Check, X, Search, MoreVertical, Globe, Smartphone, Palette
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    services, appointments, inquiries, settings, setServices, setAppointments, updateSettings 
  } = useAppStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'services' | 'settings'>('overview');

  const updateAppointmentStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const removeService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addService = () => {
    const newService = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Service',
      description: 'Service description goes here.',
      price: 0,
      icon: 'Shield'
    };
    setServices([...services, newService]);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 space-y-2">
            {[
              { id: 'overview', icon: <Activity size={18}/>, label: 'Overview' },
              { id: 'appointments', icon: <Calendar size={18}/>, label: 'Bookings' },
              { id: 'services', icon: <Smartphone size={18}/>, label: 'Services' },
              { id: 'settings', icon: <Settings size={18}/>, label: 'Site Settings' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id ? 'bg-sky-600 text-white shadow-lg shadow-sky-100' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </aside>

          {/* Main Workspace */}
          <main className="flex-grow">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                      <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Users size={20}/></div>
                      <span className="text-xs font-bold text-green-500">+12%</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Total Patients</p>
                    <h4 className="text-2xl font-bold text-slate-900">1,284</h4>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                      <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Calendar size={20}/></div>
                      <span className="text-xs font-bold text-slate-400">Steady</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Pending Requests</p>
                    <h4 className="text-2xl font-bold text-slate-900">{appointments.filter(a => a.status === 'pending').length}</h4>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                      <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Smartphone size={20}/></div>
                      <span className="text-xs font-bold text-sky-500">Active</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Active Services</p>
                    <h4 className="text-2xl font-bold text-slate-900">{services.length}</h4>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                  <h4 className="font-bold text-slate-900 mb-6">Recent Activity</h4>
                  <div className="space-y-6">
                    {appointments.slice(-5).reverse().map(a => (
                      <div key={a.id} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-xs">
                            {a.patientName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{a.patientName}</p>
                            <p className="text-xs text-slate-500">{a.date} at {a.time}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          a.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                          a.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
                 <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <h4 className="font-bold text-slate-900">Appointment Management</h4>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none w-64" placeholder="Search patients..." />
                    </div>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                          <th className="px-6 py-4">Patient</th>
                          <th className="px-6 py-4">Service</th>
                          <th className="px-6 py-4">Schedule</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {appointments.length === 0 ? (
                          <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic">No appointments yet</td></tr>
                        ) : (
                          appointments.map(a => (
                            <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4">
                                <p className="font-bold text-slate-900">{a.patientName}</p>
                                <p className="text-xs text-slate-500">{a.patientEmail}</p>
                              </td>
                              <td className="px-6 py-4 text-slate-600">
                                {services.find(s => s.id === a.serviceId)?.title || 'Service'}
                              </td>
                              <td className="px-6 py-4">
                                <p className="text-slate-900 font-medium">{a.date}</p>
                                <p className="text-xs text-slate-500">{a.time}</p>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                  a.status === 'pending' ? 'bg-amber-100 text-amber-600' : 
                                  a.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                }`}>
                                  {a.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  {a.status === 'pending' && (
                                    <>
                                      <button onClick={() => updateAppointmentStatus(a.id, 'confirmed')} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Check size={18}/></button>
                                      <button onClick={() => updateAppointmentStatus(a.id, 'cancelled')} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><X size={18}/></button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                 </div>
               </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                   <h4 className="font-bold text-slate-900 text-xl">Manage Clinical Services</h4>
                   <button onClick={addService} className="bg-sky-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-sky-100 hover:bg-sky-700">
                     <Plus size={18} /> Add New Service
                   </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map(s => (
                    <div key={s.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group">
                      <div className="flex justify-between items-start mb-4">
                         <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center">
                            <Activity size={24} />
                         </div>
                         <button onClick={() => removeService(s.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                           <Trash2 size={18} />
                         </button>
                      </div>
                      <input 
                        className="w-full text-lg font-bold text-slate-900 bg-transparent outline-none focus:ring-2 focus:ring-sky-100 rounded px-1" 
                        value={s.title}
                        onChange={(e) => setServices(prev => prev.map(item => item.id === s.id ? {...item, title: e.target.value} : item))}
                      />
                      <textarea 
                        className="w-full text-sm text-slate-500 bg-transparent outline-none focus:ring-2 focus:ring-sky-100 rounded px-1 mt-2 resize-none" 
                        rows={2}
                        value={s.description}
                        onChange={(e) => setServices(prev => prev.map(item => item.id === s.id ? {...item, description: e.target.value} : item))}
                      />
                      <div className="mt-4 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-slate-600">
                           <span className="text-sm font-bold">₹</span>
                           <input 
                             type="number"
                             className="w-24 font-bold text-slate-900 bg-slate-50 px-2 py-1 rounded outline-none" 
                             value={s.price}
                             onChange={(e) => setServices(prev => prev.map(item => item.id === s.id ? {...item, price: parseInt(e.target.value) || 0} : item))}
                           />
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-10 animate-fade-in">
                <section>
                  <div className="flex items-center gap-2 mb-6 text-slate-900">
                    <Globe size={20} className="text-sky-600" />
                    <h5 className="font-bold text-lg">General & SEO</h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Clinic Name</label>
                      <input 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
                        value={settings.brandName}
                        onChange={e => updateSettings({...settings, brandName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">SEO Title</label>
                      <input 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
                        value={settings.seoTitle}
                        onChange={e => updateSettings({...settings, seoTitle: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Meta Description</label>
                      <textarea 
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" 
                        value={settings.seoDescription}
                        onChange={e => updateSettings({...settings, seoDescription: e.target.value})}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-6 text-slate-900">
                    <Palette size={20} className="text-sky-600" />
                    <h5 className="font-bold text-lg">Visual Theme</h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Color</label>
                      <div className="flex gap-2">
                         <input 
                           type="color" 
                           className="w-12 h-12 rounded bg-transparent border-0 cursor-pointer" 
                           value={settings.primaryColor}
                           onChange={e => updateSettings({...settings, primaryColor: e.target.value})}
                         />
                         <input className="flex-grow px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={settings.primaryColor} readOnly />
                      </div>
                    </div>
                  </div>
                </section>
                
                <div className="pt-6 border-t border-slate-50 text-right">
                  <p className="text-sm text-slate-400 italic">Settings are automatically saved to browser storage.</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
