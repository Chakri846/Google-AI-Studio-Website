
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service, Doctor, Appointment, Inquiry, HealthArticle, SiteSettings } from './types';

interface AppContextType {
  services: Service[];
  doctors: Doctor[];
  appointments: Appointment[];
  inquiries: Inquiry[];
  articles: HealthArticle[];
  settings: SiteSettings;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
  setArticles: React.Dispatch<React.SetStateAction<HealthArticle[]>>;
  updateSettings: (newSettings: SiteSettings) => void;
}

const defaultSettings: SiteSettings = {
  brandName: "Sahasra Opticals",
  primaryColor: "#0369a1", // sky-700
  secondaryColor: "#0f172a", // slate-900
  accentColor: "#0ea5e9", // sky-500
  seoTitle: "Sahasra Opticals | Expert Eye Care & Consultations",
  seoDescription: "Professional eye check-ups and general practice services for families in a trust-focused environment.",
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com"
  }
};

const defaultServices: Service[] = [
  { id: '1', title: 'Comprehensive Eye Exam', description: 'Full vision assessment using state-of-the-art diagnostic equipment.', price: 1200, icon: 'Eye' },
  { id: '2', title: 'Pediatric Vision Care', description: 'Gentle and specialized eye exams for children of all ages.', price: 1000, icon: 'Baby' },
  { id: '3', title: 'Contact Lens Fitting', description: 'Professional fitting for various types of contact lenses.', price: 800, icon: 'Users' },
  { id: '4', title: 'Diabetic Screening', description: 'Retinal screening for early detection of diabetic retinopathy.', price: 1500, icon: 'Activity' },
];

const defaultDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sahasra Reddy',
    specialty: 'Senior Ophthalmologist',
    qualifications: ['MBBS', 'MS (Ophthalmology)', 'FICO'],
    image: 'https://picsum.photos/seed/doc1/400/400',
    bio: 'With over 15 years of experience, Dr. Sahasra leads our clinical team with a focus on patient-centric care.'
  },
  {
    id: '2',
    name: 'Dr. Arun Kumar',
    specialty: 'Optometry Specialist',
    qualifications: ['B.Optom', 'Fellowship in Binocular Vision'],
    image: 'https://picsum.photos/seed/doc2/400/400',
    bio: 'Dr. Arun specializes in pediatric optometry and advanced contact lens fittings.'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('sahasra_services');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('sahasra_doctors');
    return saved ? JSON.parse(saved) : defaultDoctors;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('sahasra_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('sahasra_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [articles, setArticles] = useState<HealthArticle[]>(() => {
    const saved = localStorage.getItem('sahasra_articles');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('sahasra_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('sahasra_services', JSON.stringify(services));
    localStorage.setItem('sahasra_doctors', JSON.stringify(doctors));
    localStorage.setItem('sahasra_appointments', JSON.stringify(appointments));
    localStorage.setItem('sahasra_inquiries', JSON.stringify(inquiries));
    localStorage.setItem('sahasra_articles', JSON.stringify(articles));
    localStorage.setItem('sahasra_settings', JSON.stringify(settings));
  }, [services, doctors, appointments, inquiries, articles, settings]);

  const updateSettings = (newSettings: SiteSettings) => setSettings(newSettings);

  return (
    <AppContext.Provider value={{
      services, doctors, appointments, inquiries, articles, settings,
      setServices, setDoctors, setAppointments, setInquiries, setArticles, updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within an AppProvider');
  return context;
};
