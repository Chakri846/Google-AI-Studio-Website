
import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, ShieldCheck, ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
  onNavigate?: (page: 'home' | 'admin') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isAdmin, onNavigate }) => {
  const { settings } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      {!isAdmin && (
        <div className="bg-sky-900 text-white text-xs py-2 px-4 flex justify-between items-center overflow-hidden">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1"><Phone size={12}/> +1 (555) 000-1234</span>
            <span className="hidden sm:flex items-center gap-1"><Mail size={12}/> info@sahasraopticals.com</span>
          </div>
          <div className="flex gap-3">
            <a href={settings.socialLinks.facebook}><Facebook size={12}/></a>
            <a href={settings.socialLinks.instagram}><Instagram size={12}/></a>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate?.('home')}>
            <div className="bg-sky-600 p-2 rounded-lg text-white">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">{settings.brandName}</h1>
              <p className="text-[10px] uppercase tracking-widest text-sky-600 font-semibold">Vision & Health Care</p>
            </div>
          </div>

          {!isAdmin && (
            <>
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">
                    {link.name}
                  </a>
                ))}
                <button 
                  onClick={() => onNavigate?.('admin')}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Admin Portal
                </button>
                <a href="#booking" className="bg-sky-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-sky-700 transition-all shadow-md shadow-sky-100">
                  Book Appointment
                </a>
              </div>

              <div className="md:hidden">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </>
          )}

          {isAdmin && (
             <div className="flex items-center space-x-4">
               <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded">Admin Dashboard</span>
               <button onClick={() => onNavigate?.('home')} className="text-sm text-sky-600 font-medium flex items-center gap-1">
                 View Website <ChevronRight size={16} />
               </button>
             </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {!isAdmin && mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4 space-y-4 animate-fade-in-down">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-600 hover:text-sky-600"
              >
                {link.name}
              </a>
            ))}
            <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="block bg-sky-600 text-white px-5 py-3 rounded-xl text-center font-semibold">
              Book Appointment
            </a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      {!isAdmin && (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-sky-600 p-2 rounded-lg text-white">
                  <ShieldCheck size={20} />
                </div>
                <h2 className="text-xl font-bold text-white leading-none">{settings.brandName}</h2>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Providing specialized eye care and general practice services with a focus on trust, precision, and patient satisfaction since 2008.
              </p>
              <div className="flex space-x-4">
                <a href={settings.socialLinks.facebook} className="hover:text-white"><Facebook size={20}/></a>
                <a href={settings.socialLinks.twitter} className="hover:text-white"><Twitter size={20}/></a>
                <a href={settings.socialLinks.instagram} className="hover:text-white"><Instagram size={20}/></a>
                <a href={settings.socialLinks.linkedin} className="hover:text-white"><Linkedin size={20}/></a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#services" className="hover:text-sky-400">Services</a></li>
                <li><a href="#about" className="hover:text-sky-400">Our Doctors</a></li>
                <li><a href="#faq" className="hover:text-sky-400">FAQs</a></li>
                <li><a href="#privacy" className="hover:text-sky-400">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Contact Us</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="text-sky-500 shrink-0" size={18} />
                  <span>123 Vision Avenue, Health District<br/>Silicon Valley, CA 94000</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-sky-500 shrink-0" size={18} />
                  <span>+1 (555) 000-1234</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-sky-500 shrink-0" size={18} />
                  <span>info@sahasraopticals.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Opening Hours</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span>Mon - Fri</span> <span className="text-white">9:00 AM - 7:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span className="text-white">10:00 AM - 4:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span className="text-sky-400">Closed</span></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} {settings.brandName}. All rights reserved. Registered Healthcare Provider.</p>
          </div>
        </footer>
      )}
    </div>
  );
};
