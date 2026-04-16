import React, { useState } from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { CONTACT_INFO } from '../constants';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    treatment: 'general',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Bitte geben Sie Ihren Namen ein.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Der Name muss mindestens 2 Zeichen lang sein.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }

    if (formData.phone && !/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Bitte geben Sie eine Nachricht ein.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Die Nachricht muss mindestens 10 Zeichen lang sein.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setFormStatus('sending');
    // Simulate email sending
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        treatment: 'general',
        message: ''
      });
    }, 1500);
  };

  return (
    <>
      <SEO 
        title="Kontakt & Termin" 
        description="Vereinbaren Sie einen Termin bei Schwesterherz in Neunkirchen-Seelscheid. Hier finden Sie unsere Adresse, Telefonnummer und Öffnungszeiten."
      />
      <div className="bg-brand-50 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold text-brand-900 mb-4">Kontakt & Termin</h1>
          <p className="text-stone-600">Wir freuen uns auf Ihren Besuch.</p>
        </div>
      </div>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Side */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-100">
              <h2 className="text-2xl font-bold mb-6 text-brand-900">Kontaktdaten</h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center text-accent-600 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block font-bold text-stone-800">Adresse</span>
                    <span className="text-stone-600">{CONTACT_INFO.address}</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center text-accent-600 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block font-bold text-stone-800">Telefon</span>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="text-stone-600 hover:text-brand-700">{CONTACT_INFO.phone}</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center text-accent-600 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block font-bold text-stone-800">E-Mail</span>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-stone-600 hover:text-brand-700">{CONTACT_INFO.email}</a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-brand-900 text-brand-50 p-8 rounded-2xl shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-brand-300" />
                <h2 className="text-2xl font-bold">Öffnungszeiten</h2>
              </div>
              <ul className="space-y-3">
                {CONTACT_INFO.hours.map((h, i) => (
                  <li key={i} className="flex justify-between border-b border-brand-800 pb-2 last:border-0 last:pb-0">
                    <span>{h.day}</span>
                    <span className="text-brand-200">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-brand-100">
             <h2 className="text-2xl font-bold mb-2 text-brand-900">Nachricht senden</h2>
             <p className="text-stone-500 mb-8 text-sm">Hinweis: Ihre Anfrage wird direkt an unsere Praxis-E-Mail gesendet.</p>
             
             {formStatus === 'success' ? (
               <div className="bg-brand-50 border border-brand-200 text-brand-900 p-8 rounded-2xl text-center">
                 <div className="inline-flex bg-brand-100 p-3 rounded-full mb-4">
                   <Mail size={32} className="text-brand-700"/>
                 </div>
                 <h3 className="text-xl font-bold mb-2">Vielen Dank!</h3>
                 <p>Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.</p>
                 <button 
                   onClick={() => setFormStatus('idle')}
                   className="mt-6 text-sm font-bold text-brand-700 hover:underline"
                 >
                   Neue Nachricht senden
                 </button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8" noValidate>
                 <div className="flex flex-col">
                   <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">Name <span className="text-red-500">*</span></label>
                   <input 
                     type="text" 
                     id="name" 
                     value={formData.name}
                     onChange={handleChange}
                     className={`w-full px-4 py-3.5 md:py-4 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-brand-200 focus:ring-brand-300 focus:border-brand-300'} focus:ring-2 outline-none transition-all`} 
                     placeholder="Ihr Name" 
                   />
                   {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">E-Mail <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 md:py-4 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-brand-200 focus:ring-brand-300 focus:border-brand-300'} focus:ring-2 outline-none transition-all`} 
                        placeholder="ihre@email.de" 
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">Telefon</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 md:py-4 rounded-xl border ${errors.phone ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-brand-200 focus:ring-brand-300 focus:border-brand-300'} focus:ring-2 outline-none transition-all`} 
                        placeholder="0123 456789" 
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                    </div>
                 </div>
                 <div className="flex flex-col">
                   <label htmlFor="treatment" className="block text-sm font-medium text-stone-700 mb-2">Gewünschte Behandlung</label>
                   <select 
                     id="treatment" 
                     value={formData.treatment}
                     onChange={handleChange}
                     className="w-full px-4 py-3.5 md:py-4 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-300 focus:border-brand-300 outline-none transition-all bg-white"
                   >
                     <option value="general">Allgemeine Anfrage</option>
                     <option value="med-fuss">Fußpflege nach medizinischer Art</option>
                     <option value="wellness">Wellness Fußpflege</option>
                     <option value="headspa">Shazay Head Spa Ritual</option>
                   </select>
                 </div>
                 <div className="flex flex-col">
                   <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">Nachricht <span className="text-red-500">*</span></label>
                   <textarea 
                     id="message" 
                     rows={4} 
                     value={formData.message}
                     onChange={handleChange}
                     className={`w-full px-4 py-3.5 md:py-4 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-brand-200 focus:ring-brand-300 focus:border-brand-300'} focus:ring-2 outline-none transition-all`} 
                     placeholder="Wie können wir Ihnen helfen?"
                   ></textarea>
                   {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
                 </div>
                 <button 
                   type="submit" 
                   disabled={formStatus === 'sending'}
                   className="w-full bg-brand-900 text-white font-bold py-4 rounded-xl hover:bg-brand-800 transition-colors shadow-md disabled:opacity-70 flex justify-center items-center"
                 >
                   {formStatus === 'sending' ? 'Wird gesendet...' : 'Nachricht absenden'}
                 </button>
               </form>
             )}
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mt-10 md:mt-12 rounded-3xl overflow-hidden h-[400px] shadow-lg border border-brand-100 relative bg-stone-100">
          <iframe 
            src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_INFO.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Standort"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      </Section>
    </>
  );
};

export default Contact;