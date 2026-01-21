
export type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  qualifications: string[];
  image: string;
  bio: string;
};

export type Appointment = {
  id: string;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  serviceId: string;
  doctorId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
};

export type HealthArticle = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
};

export type SiteSettings = {
  brandName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  seoTitle: string;
  seoDescription: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
};
