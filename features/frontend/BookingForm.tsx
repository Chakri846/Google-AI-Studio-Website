
import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { Calendar, Clock, User, Mail, ChevronRight, CheckCircle } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const { services, doctors, setAppointments } = useAppStore();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceId: services[0]?.id || '',
    doctorId: doctors[0]?.id || '',
    date: '',
    time: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newAppointment = {
        id: Math.random().toString(36).substr(2, 9),
        patientName: formData.name,
        patientEmail: formData.email,
        date: formData.date,
        time: formData.time,
        serviceId: formData.serviceId,
        doctorId: formData.doctorId,
        status: 'pending' as const
      };

      setAppointments(prev => [...prev, newAppointment]);
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
        <p className="text-slate-600 mb-6">Thank you for choosing Sahasra Opticals. Our team will contact you shortly to confirm your slot.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-sky-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-sky-700"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              type="text" 
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              type="email" 
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Select Service</label>
          <select 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
            value={formData.serviceId}
            onChange={e => setFormData({...formData, serviceId: e.target.value})}
          >
            {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Specialist</label>
          <select 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
            value={formData.doctorId}
            onChange={e => setFormData({...formData, doctorId: e.target.value})}
          >
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              type="date" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Time Slot</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              type="time" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
              value={formData.time}
              onChange={e => setFormData({...formData, time: e.target.value})}
            />
          </div>
        </div>
      </div>
      <button 
        disabled={loading}
        type="submit"
        className="w-full mt-8 bg-sky-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-sky-700 transition-all shadow-lg shadow-sky-100 disabled:opacity-50"
      >
        {loading ? 'Processing...' : (
          <>Confirm Booking Request <ChevronRight size={20} /></>
        )}
      </button>
      <p className="mt-4 text-center text-xs text-slate-400">
        * By clicking confirm, you agree to our patient confidentiality terms.
      </p>
    </form>
  );
};
