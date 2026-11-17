import React, { useState, useRef } from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { CONTACT_INFO } from '../constants';
import { MapPin, Phone, Mail, Clock, AlertCircle } from 'lucide-react';

type FieldName = 'name' | 'email' | 'phone' | 'message';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    treatment: 'general',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (field: FieldName, value: string): string => {
    if (field === 'name') {
      if (!value.trim()) return 'Bitte geben Sie Ihren Namen ein.';
      if (value.trim().length < 2) return 'Der Name muss mindestens 2 Zeichen lang sein.';
    }
    if (field === 'email') {
      if (!value.trim()) return 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }
    if (field === 'phone') {
      if (value && !/^[\d\s+\-()]+$/.test(value)) return 'Bitte geben Sie eine gültige Telefonnummer ein.';
    }
    if (field === 'message') {
      if (!value.trim()) return 'Bitte geben Sie eine Nachricht ein.';
      if (value.trim().length < 10) return 'Die Nachricht muss mindestens 10 Zeichen lang sein.';
    }
    return '';
  };

  const validate = () => {
    const fields: FieldName[] = ['name', 'email', 'phone', 'message'];
    const newErrors: Partial<Record<FieldName, string>> = {};
    for (const field of fields) {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (id in errors && errors[id as FieldName]) {
      const err = validateField(id as FieldName, value);
      setErrors(prev => ({ ...prev, [id]: err || undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.id as FieldName;
    if (!formData[field] && !touched[field]) return;
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: err || undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    const firstInvalidField = (['name', 'email', 'phone', 'message'] as FieldName[]).find(
      (f) => Boolean(newErrors[f])
    );
    if (firstInvalidField) {
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalidField}`)?.focus();
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
      setTouched({});
    }, 1500);
  };

  return (
    <>
      <SEO 
        title="Kontakt & Termin" 
        description="Vereinbaren Sie einen Termin bei Schwesterherz in Neunkirchen-Seelscheid. Hier finden Sie unsere Adresse, Telefonnummer und Öffnungszeiten."
      />
      <div className="bg-brand-50 py-10 md:py-14">
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
               <div role="status" className="bg-brand-50 border border-brand-200 text-brand-900 p-8 rounded-2xl text-center">
                 <div className="inline-flex bg-brand-100 p-3 rounded-full mb-4">
                   <Mail size={32} className="text-brand-700" aria-hidden="true"/>
                 </div>
                 <h3 className="text-xl font-bold mb-2">Vielen Dank!</h3>
                 <p>Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.</p>
                 <button 
                   type="button"
                   onClick={() => setFormStatus('idle')}
                   className="mt-6 text-sm font-bold text-brand-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                 >
                   Neue Nachricht senden
                 </button>
               </div>
             ) : (
               <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 md:space-y-8" noValidate>
                 <div className="flex flex-col">
                   <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">Name <span className="text-red-600" aria-hidden="true">*</span></label>
                   <input 
                     type="text" 
                     id="name"
                     name="name"
                     required
                     autoComplete="name"
                     enterKeyHint="next"
                     aria-invalid={errors.name ? 'true' : 'false'}
                     aria-describedby={errors.name ? 'name-error' : undefined}
                     value={formData.name}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     className={`w-full text-base px-4 py-3.5 md:py-4 rounded-xl border ${errors.name ? 'border-red-600 bg-red-50/40 focus:ring-red-200 focus:border-red-600' : 'border-brand-200 focus:ring-brand-300 focus:border-brand-300'} focus:ring-2 outline-none transition-all`} 
                     placeholder="Ihr Name" 
                   />
                   {errors.name && (
                     <p id="name-error" className="text-red-700 text-sm mt-2 flex items-center gap-1.5">
                       <AlertCircle size={15} className="shrink-0" aria-hidden="true" />
                       <span>{errors.name}</span>
                     </p>
                   )}
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">E-Mail <span className="text-red-600" aria-hidden="true">*</span></label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        enterKeyHint="next"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full text-base px-4 py-3.5 md:py-4 rounded-xl border ${errors.email ? 'border-red-600 bg-red-50/40 focus:ring-red-200 focus:border-red-600' : 'border-brand-200 focus:ring-brand-300 focus:border-brand-300'} focus:ring-2 outline-none transition-all`} 
                        placeholder="ihre@email.de" 
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-700 text-sm mt-2 flex items-center gap-1.5">
                          <AlertCircle size={15} className="shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">Telefon</label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        enterKeyHint="next"
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full text-base px-4 py-3.5 md:py-4 rounded-xl border ${errors.phone ? 'border-red-600 bg-red-50/40 focus:ring-red-200 focus:border-red-600' : 'border-brand-200 focus:ring-brand-300 focus:border-brand-300'} focus:ring-2 outline-none transition-all`} 
                        placeholder="0123 456789" 
                      />
                      {errors.phone && (
                        <p id="phone-error" className="text-red-700 text-sm mt-2 flex items-center gap-1.5">
                          <AlertCircle size={15} className="shrink-0" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                 </div>
                 <div className="flex flex-col">
                   <label htmlFor="treatment" className="block text-sm font-medium text-stone-700 mb-2">Gewünschte Behandlung</label>
                   <select 
                     id="treatment"
                     name="treatment"
                     value={formData.treatment}
                     onChange={handleChange}
                     className="w-full text-base px-4 py-3.5 md:py-4 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-300 focus:border-brand-300 outline-none transition-all bg-white"
                   >
                     <option value="general">Allgemeine Anfrage</option>
                     <option value="med-fuss">Fußpflege nach medizinischer Art</option>
                     <option value="wellness">Wellness Fußpflege</option>
                     <option value="headspa">Shazay Head Spa Ritual</option>
                   </select>
                 </div>
                 <div className="flex flex-col">
                   <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">Nachricht <span className="text-red-600" aria-hidden="true">*</span></label>
                   <textarea 
                     id="message"
                     name="message"
                     required
                     rows={4} 
                     enterKeyHint="send"
                     aria-invalid={errors.message ? 'true' : 'false'}
                     aria-describedby={errors.message ? 'message-error' : undefined}
                     value={formData.message}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     className={`w-full text-base px-4 py-3.5 md:py-4 rounded-xl border ${errors.message ? 'border-red-600 bg-red-50/40 focus:ring-red-200 focus:border-red-600' : 'border-brand-200 focus:ring-brand-300 focus:border-brand-300'} focus:ring-2 outline-none transition-all`} 
                     placeholder="Wie können wir Ihnen helfen?"
                   ></textarea>
                   {errors.message && (
                     <p id="message-error" className="text-red-700 text-sm mt-2 flex items-center gap-1.5">
                       <AlertCircle size={15} className="shrink-0" aria-hidden="true" />
                       <span>{errors.message}</span>
                     </p>
                   )}
                 </div>
                 <button 
                   type="submit" 
                   disabled={formStatus === 'sending'}
                   className="w-full min-h-[48px] bg-brand-900 text-white font-bold py-4 rounded-xl hover:bg-brand-800 transition-colors shadow-md disabled:opacity-70 flex justify-center items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900"
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