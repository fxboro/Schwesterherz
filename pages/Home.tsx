import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { SERVICES, TESTIMONIALS, BOOKING_URL } from '../constants';

const HERO_SLIDES = [
  {
    image: "/images/Foot_care_03.png",
    alt: "Entspannende Spa Atmosphäre"
  },
  {
    image: "/images/Spa_01.png",
    alt: "Shazay Head Spa Ritual Utensilien"
  },
  {
    image: "/images/Foot_care_02.png",
    alt: "Wohlbefinden und Entspannung"
  }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEO 
        title="Startseite" 
        description="Schwesterherz in Neunkirchen-Seelscheid bietet Fußpflege nach medizinischer Art und das luxuriöse Shazay Head Spa Ritual für Ihre Entspannung."
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthAndBeautyBusiness",
          "name": "Schwesterherz",
          "image": "https://schwesterherz-solingen.de/images/Foot_care_03.png",
          "@id": "",
          "url": "https://schwesterherz-solingen.de",
          "telephone": "+49 1525 5892182",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Zeithstrasse 111",
            "addressLocality": "Neunkirchen-Seelscheid",
            "postalCode": "53819",
            "addressCountry": "DE"
          }
        })}
      />
      {/* Hero Section */}
      <div className="relative min-h-[500px] md:min-h-[600px] h-[100svh] md:h-[80vh] flex items-center overflow-hidden">
        {/* Background Slider */}
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.alt} 
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Static Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b md:bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-brand-950/30 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-white w-full py-12 md:py-16 mt-12 md:mt-0">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-block py-1 px-3 rounded-full bg-brand-300/20 border border-brand-300 text-brand-200 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6 backdrop-blur-sm"
            >
              Willkommen bei Schwesterherz
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-display font-bold leading-[1.1] mb-4 sm:mb-6">
              „Entdecken Sie neue Dimensionen der Entspannung"
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-brand-100 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
              mit hochwertiger Fußpflege und unserem Shazay Head Spa Ritual, das Körper und Geist in Einklang bringt.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-brand-300 hover:bg-brand-200 text-brand-950 text-base sm:text-lg font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all shadow-lg hover:shadow-brand-300/25 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Jetzt Termin buchen <ArrowRight size={20} />
              </a>
              <Link 
                to="/leistungen" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-base sm:text-lg font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all flex items-center justify-center w-full sm:w-auto"
              >
                Unsere Leistungen
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
                index === currentSlide ? 'w-8 bg-brand-300' : 'w-2 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Intro Section */}
      <Section bg="white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-900 mb-6">
              Manchmal braucht es mehr als nur Pflege
            </h2>
            <p className="text-stone-600 mb-4 leading-relaxed">
              es braucht einen Ort, an dem Fachkompetenz auf echte Zuwendung trifft. In unserer Praxis verbinden wir medizinisch fundierte Fußpflege mit einem exklusiven Ambiente, das Ruhe und Vertrauen ausstrahlt. Jede Behandlung wird mit größter Sorgfalt, Präzision und Hingabe durchgeführt.
            </p>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Unser luxuriöses Shazay Head Spa Ritual schenkt Ihnen zusätzlich tiefe Entspannung und einen Moment, in dem Sie den Alltag vollkommen hinter sich lassen dürfen. Treten Sie ein, atmen Sie durch – und erleben Sie, wie sich Gesundheit und Wohlgefühl auf höchstem Niveau vereinen.
            </p>
            <Link to="/ueber-uns" className="text-brand-900 font-bold hover:text-brand-700 flex items-center gap-2 decoration-brand-300 underline underline-offset-4 hover:decoration-brand-500">
              Mehr über uns erfahren <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative mt-8 md:mt-0">
             <div className="absolute -inset-4 bg-brand-300 rounded-2xl rotate-3 -z-10"></div>
             <img 
               src="/images/Head_massage_01.png" 
               alt="Relaxed atmosphere" 
               className="rounded-2xl shadow-xl w-full object-cover" 
             />
          </div>
        </div>
      </Section>

      {/* Services Highlight */}
      <Section bg="light">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-900 mb-4">Unsere Hauptleistungen</h2>
          <div className="h-1 w-20 bg-brand-300 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-brand-100 flex flex-col items-start relative overflow-hidden group">
              {service.isNew && (
                <span className="absolute top-4 right-4 bg-brand-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Neu!
                </span>
              )}
              <div className="w-14 h-14 bg-accent-50 text-accent-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-accent-100">
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-900">{service.title}</h3>
              <p className="text-stone-600 mb-6 flex-grow">{service.description}</p>
              <Link to="/leistungen" className="text-brand-900 font-bold hover:text-brand-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                Details ansehen <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Feature: Shazay Head Spa Ritual */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
           <img src="https://picsum.photos/id/117/1600/900?grayscale" alt="Spa Background" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="order-2 md:order-1">
             <div className="grid grid-cols-2 gap-4">
               <motion.img 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 src="/images/Head_massage_bed_01.png" 
                 className="rounded-2xl shadow-lg mt-8 border-4 border-white w-full h-auto object-cover" 
                 alt="Head Spa Behandlung" 
               />
               <motion.img 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                 src="/images/Spa_01.png" 
                 className="rounded-2xl shadow-lg mb-8 border-4 border-white w-full h-auto object-cover" 
                 alt="Entspannende Atmosphäre" 
               />
             </div>
           </div>
           <div className="order-1 md:order-2">
             <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-900 mb-6">
               Neu: Shazay Head Spa Ritual
             </h2>
             <p className="text-lg text-stone-600 mb-6">
               Erleben Sie eine Behandlung, die Körper und Geist beruhigt.
               Sanfte Massagen, warme Tücher, pflegende Essenzen und ein Gefühl von absoluter Leichtigkeit.
             </p>
             <ul className="space-y-3 mb-8">
               <li className="flex items-center gap-3 text-stone-700">
                 <CheckCircle size={18} className="text-accent-500 shrink-0" /> Ideal bei Stress & Kopfschmerzen
               </li>
               <li className="flex items-center gap-3 text-stone-700">
                 <CheckCircle size={18} className="text-accent-500 shrink-0" /> Löst Nackenverspannungen
               </li>
               <li className="flex items-center gap-3 text-stone-700">
                 <CheckCircle size={18} className="text-accent-500 shrink-0" /> Fördert gesundes Haarwachstum
               </li>
             </ul>
             <Link 
               to="/leistungen" 
               className="inline-block bg-brand-900 text-brand-50 px-8 py-3 rounded-full font-semibold hover:bg-brand-800 transition-colors shadow-md w-full sm:w-auto text-center"
             >
               Mehr erfahren
             </Link>
           </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section bg="light">
        <h2 className="text-center text-2xl sm:text-3xl font-display font-bold mb-8 md:mb-10 text-brand-900">Kundenstimmen</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div 
              key={t.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-2xl shadow-sm relative border border-brand-50 hover:shadow-md transition-shadow"
            >
              <div className="text-brand-300 flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-stone-600 italic mb-6">"{t.text}"</p>
              <div className="font-bold text-brand-900">— {t.author}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Footer - Primary Brand Color Block */}
      <section className="bg-brand-300 py-10 md:py-12 text-brand-950 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Gönnen Sie sich eine Auszeit.</h2>
          <p className="text-brand-900 text-xl mb-8 opacity-80">
            Jetzt Termin vereinbaren – telefonisch, per WhatsApp oder über unser Kontaktformular.
          </p>
          <a 
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-900 text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-brand-800 transition-all transform hover:-translate-y-1 w-full sm:w-auto"
          >
            Jetzt Termin buchen
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;