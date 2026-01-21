
import React from 'react';
import { useAppStore } from '../../store';
import { BookingForm } from './BookingForm';
import { 
  Shield, Heart, Award, Users, Search, ChevronRight, 
  MapPin, Phone, Mail, Clock, CheckCircle2, Star 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { services, doctors, settings } = useAppStore();

  const benefits = [
    { title: "Expert Care", desc: "Certified ophthalmologists and optometrists.", icon: <Award className="text-sky-600" /> },
    { title: "Modern Tech", desc: "Latest diagnostic and screening equipment.", icon: <Shield className="text-sky-600" /> },
    { title: "Family Focused", desc: "Special care for children and seniors.", icon: <Heart className="text-sky-600" /> },
  ];

  const testimonials = [
    { name: "John Doe", text: "The eye exam was incredibly thorough. Dr. Sahasra is very professional.", stars: 5 },
    { name: "Sarah Miller", text: "Best optical shop in the city! The frames collection is amazing.", stars: 5 },
    { name: "Robert Wilson", text: "Great service and friendly staff. Highly recommended for kids.", stars: 4 },
  ];

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-50 rounded-l-[100px] -z-10 hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-bold mb-6">
              <Star size={16} fill="currentColor" /> 15+ Years of Excellence in Vision Care
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight mb-6">
              Clear Vision Starts With <span className="text-sky-600">Expert Care</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Experience the highest standards of clinical eye care and optical solutions. Trust your vision to specialists who care about your family's health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#booking" className="bg-sky-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-sky-700 transition-all text-center shadow-xl shadow-sky-100">
                Book Appointment
              </a>
              <a href="#services" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all text-center">
                Our Services
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/face${i}/100/100`} className="w-12 h-12 rounded-full border-4 border-white object-cover" alt="User" />
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">4,500+ Happy Patients</p>
                <div className="flex text-amber-400"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-4 rounded-3xl shadow-2xl relative z-10">
              <img 
                src="https://picsum.photos/seed/medical/800/600" 
                alt="Clinic Interior" 
                className="rounded-2xl w-full h-[450px] object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-sky-50">
              <p className="text-3xl font-bold text-sky-600">99%</p>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Satisfaction Rate</p>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-sky-500 rounded-full -z-0 opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20 border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl hover:bg-sky-50 transition-colors group">
                <div className="bg-sky-50 p-3 rounded-xl group-hover:bg-white transition-colors h-fit">
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{b.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">What We Offer</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-slate-900">Comprehensive Solutions for Your Vision</h3>
            <div className="w-16 h-1 bg-sky-500 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s) => (
              <div key={s.id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                   {s.icon === 'Eye' && <Search size={28} />}
                   {s.icon === 'Baby' && <Users size={28} />}
                   {s.icon !== 'Eye' && s.icon !== 'Baby' && <Shield size={28} />}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{s.description}</p>
                <p className="mt-auto text-sky-600 font-bold text-lg">₹{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-4">Meet Our Experts</h2>
              <h3 className="text-3xl md:text-4xl font-serif text-slate-900 mb-8">Dedicated Specialists Committed to Your Eye Health</h3>
              
              <div className="space-y-8">
                {doctors.map(doc => (
                  <div key={doc.id} className="flex flex-col sm:flex-row gap-6 p-6 border border-slate-100 rounded-2xl bg-slate-50/50">
                    <img src={doc.image} className="w-32 h-32 rounded-2xl object-cover shadow-md" alt={doc.name} />
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{doc.name}</h4>
                      <p className="text-sky-600 font-medium text-sm mb-2">{doc.specialty}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {doc.qualifications.map(q => (
                          <span key={q} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold text-slate-500">{q}</span>
                        ))}
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{doc.bio}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-sky-900 rounded-3xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-4">Why Choose Us?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sky-400"/> Compassionate & Personal Approach</li>
                    <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sky-400"/> Transparent Pricing & Insurance Support</li>
                    <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sky-400"/> Emergency Eye Care Available</li>
                  </ul>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
              </div>
            </div>
            <div className="flex-1 w-full lg:w-auto">
               <div id="booking" className="scroll-mt-24">
                  <div className="text-center mb-10 lg:text-left">
                    <h3 className="text-2xl font-bold text-slate-900">Request a Consultation</h3>
                    <p className="text-slate-500 mt-2">Choose your preferred date and time slot.</p>
                  </div>
                  <BookingForm />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-serif text-slate-900">Common Questions</h2>
             <p className="text-slate-600 mt-4">Everything you need to know about your first visit.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "What should I bring to my first appointment?", a: "Please bring your current glasses/contacts, a list of medications, and your insurance card." },
              { q: "Do you accept vision insurance?", a: "Yes, we accept most major vision and health insurance plans. Please contact our front desk to verify yours." },
              { q: "How long does a comprehensive eye exam take?", a: "Typically, a full exam takes about 45-60 minutes depending on the tests required." },
              { q: "Is pediatric eye care available?", a: "Absolutely! We specialize in eye care for children as young as 6 months." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-slate-800 list-none">
                  {faq.q}
                  <ChevronRight size={18} className="group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-4">Testimonials</h2>
          <h3 className="text-3xl font-serif text-slate-900 mb-16">Patient Experiences</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-left">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-sky-200"></div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{t.name}</h5>
                    <p className="text-xs text-slate-400">Verified Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-serif mb-8">Get In Touch</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-sky-500/20 p-3 rounded-xl h-fit"><MapPin className="text-sky-400" /></div>
                <div>
                  <h4 className="font-bold text-lg">Main Clinic Location</h4>
                  <p className="text-slate-400">123 Vision Avenue, Health District, Silicon Valley, CA 94000</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-sky-500/20 p-3 rounded-xl h-fit"><Phone className="text-sky-400" /></div>
                <div>
                  <h4 className="font-bold text-lg">Direct Contact</h4>
                  <p className="text-slate-400">+1 (555) 000-1234</p>
                  <p className="text-slate-400">info@sahasraopticals.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-sky-500/20 p-3 rounded-xl h-fit"><Clock className="text-sky-400" /></div>
                <div>
                  <h4 className="font-bold text-lg">Opening Hours</h4>
                  <p className="text-slate-400">Mon - Fri: 9:00 AM - 7:00 PM</p>
                  <p className="text-slate-400">Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl text-slate-900">
            <h4 className="text-xl font-bold mb-6">Send an Inquiry</h4>
            <div className="space-y-4">
               <input placeholder="Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500" />
               <input placeholder="Email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500" />
               <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500" />
               <button className="w-full bg-sky-600 text-white font-bold py-4 rounded-xl hover:bg-sky-700 transition-colors">Send Message</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
