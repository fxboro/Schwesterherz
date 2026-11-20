import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Star, Pause, Play, Gift, Sparkles } from 'lucide-react';
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
  const [isPaused, setIsPaused] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

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
      <section
        aria-label="Willkommen bei Schwesterherz"
        className="relative min-h-[max(500px,85svh)] md:min-h-[max(600px,80dvh)] flex items-center overflow-hidden"
      >
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
              fetchPriority={index === 0 ? 'high' : 'low'}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Static Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b md:bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-brand-950/30 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-white w-full py-12 md:py-16 mt-12 md:mt-0">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(1.9rem,1.35rem+2.2vw,3.15rem)] font-display font-semibold leading-[1.12] tracking-[-0.01em] text-balance mb-4 sm:mb-6">
              „Entdecken Sie neue Dimensionen der Entspannung"
            </h1>
            <p className="text-[clamp(0.95rem,0.9rem+0.35vw,1.125rem)] text-brand-100 mb-6 sm:mb-7 leading-relaxed text-pretty max-w-xl">
              mit hochwertiger Fußpflege und unserem Shazay Head Spa Ritual, das Körper und Geist in Einklang bringt.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-brand-300 hover:bg-brand-200 text-brand-950 text-sm sm:text-base font-semibold px-6 py-3 sm:px-7 sm:py-3.5 min-h-[44px] rounded-full transition-all shadow-lg hover:shadow-brand-300/25 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Jetzt Termin buchen <ArrowRight size={18} aria-hidden="true" />
              </a>
              <Link 
                to="/leistungen" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm sm:text-base font-semibold px-6 py-3 sm:px-7 sm:py-3.5 min-h-[44px] rounded-full transition-all flex items-center justify-center w-full sm:w-auto"
              >
                Unsere Leistungen
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Navigation Dots & Pause Control */}
        <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-1">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className="min-w-[44px] min-h-[44px] sm:min-w-[32px] sm:min-h-[32px] flex items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
              aria-label={`Folie ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : undefined}
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 shadow-sm ${
                  index === currentSlide ? 'w-8 bg-brand-300' : 'w-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Diashow fortsetzen' : 'Diashow pausieren'}
            className="ml-1 min-w-[44px] min-h-[44px] sm:min-w-[32px] sm:min-h-[32px] flex items-center justify-center rounded-full text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
          >
            <span className="p-1.5 rounded-full bg-brand-950/60 hover:bg-brand-950/90 border border-white/20 transition-colors flex items-center justify-center">
              {isPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            </span>
          </button>
        </div>
      </section>

      {/* Intro Section */}
      <Section bg="white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[0.7rem] uppercase tracking-[0.22em] text-brand-600 font-semibold mb-2.5">
              Willkommen bei Schwesterherz
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-brand-900 mb-6 text-balance">
              Manchmal braucht es mehr als nur Pflege
            </h2>
            <p className="text-stone-600 mb-4 leading-relaxed text-pretty">
              — es braucht einen Ort, an dem Fachkompetenz auf echte Zuwendung trifft. In unserer Praxis verbinden wir medizinisch fundierte Fußpflege mit einem exklusiven Ambiente, das Ruhe und Vertrauen ausstrahlt. Jede Behandlung wird mit größter Sorgfalt, Präzision und Hingabe durchgeführt.
            </p>
            <p className="text-stone-600 mb-8 leading-relaxed text-pretty">
              Unser luxuriöses Shazay Head Spa Ritual schenkt Ihnen zusätzlich tiefe Entspannung und einen Moment, in dem Sie den Alltag vollkommen hinter sich lassen dürfen. Treten Sie ein, atmen Sie durch – und erleben Sie, wie sich Gesundheit und Wohlgefühl auf höchstem Niveau vereinen.
            </p>
            <Link to="/ueber-uns" className="text-brand-900 font-semibold hover:text-brand-700 flex items-center gap-2 decoration-brand-300 underline underline-offset-4 hover:decoration-brand-500">
              Mehr über uns erfahren <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative mt-8 md:mt-0">
             <div className="absolute -inset-4 bg-brand-300 rounded-2xl rotate-3 -z-10 hidden md:block"></div>
             <img 
               src="/images/Head_massage_01.png" 
               alt="Entspannende Atmosphäre im Head Spa" 
               loading="lazy"
               className="rounded-2xl luxury-card-shadow w-full object-cover" 
             />
          </div>
        </div>
      </Section>

      {/* Services Highlight */}
      <Section bg="light">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="inline-block text-[0.7rem] uppercase tracking-[0.22em] text-brand-600 font-semibold mb-2.5">
            Kompetenz &amp; Entspannung
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-brand-900 mb-4">Unsere Hauptleistungen</h2>
          <div className="h-0.5 w-16 bg-brand-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-2xl luxury-card-shadow hover:shadow-xl transition-shadow border border-brand-200/60 flex flex-col items-start relative overflow-hidden group">
              {service.isNew && (
                <span className="absolute top-4 right-4 bg-brand-900 text-white text-[0.65rem] font-semibold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-sm">
                  Neu!
                </span>
              )}
              <div className="w-14 h-14 bg-accent-50 text-accent-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-accent-100">
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-3 text-brand-900">{service.title}</h3>
              <p className="text-stone-600 mb-6 flex-grow text-pretty leading-relaxed">{service.description}</p>
              <Link to="/leistungen" className="text-brand-900 font-semibold hover:text-brand-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                Details ansehen <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Feature: Shazay Head Spa Ritual */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
           <img src="/images/Head_massage_bed_01.png" alt="" className="w-full h-full object-cover opacity-5" aria-hidden="true" />
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
                 className="rounded-2xl luxury-card-shadow mt-8 border-4 border-white w-full h-auto object-cover" 
                 alt="Head Spa Behandlung" 
               />
               <motion.img 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                 src="/images/Spa_01.png" 
                 className="rounded-2xl luxury-card-shadow mb-8 border-4 border-white w-full h-auto object-cover" 
                 alt="Entspannende Atmosphäre" 
               />
             </div>
           </div>
           <div className="order-1 md:order-2">
             <span className="inline-block text-[0.7rem] uppercase tracking-[0.22em] text-brand-600 font-semibold mb-2.5">
               Exklusives Ritual
             </span>
             <h2 className="text-3xl sm:text-4xl font-display font-semibold text-brand-900 mb-6 text-balance">
               Neu: Shazay Head Spa Ritual
             </h2>
             <p className="text-lg text-stone-600 mb-6 text-pretty leading-relaxed">
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
        <span className="block text-center text-[0.7rem] uppercase tracking-[0.22em] text-brand-600 font-semibold mb-2.5">
          Vertrauen
        </span>
        <h2 className="text-center text-3xl sm:text-4xl font-display font-semibold mb-10 md:mb-14 text-brand-900">Kundenstimmen</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div 
              key={t.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-2xl luxury-card-shadow relative border border-brand-200/60 hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="text-brand-400 flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                </div>
                <p className="font-display italic text-xl leading-relaxed text-brand-900 mb-6 text-pretty">„{t.text}“</p>
              </div>
              <div className="text-xs uppercase tracking-[0.16em] font-semibold text-brand-700">— {t.author}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Quiet Luxury Voucher Teaser Section */}
      <Section bg="white">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="md:col-span-6 flex justify-center">
            <div className="w-full max-w-md md:-rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="voucher-card-champagne border border-brand-300/70 rounded-2xl luxury-card-shadow relative overflow-hidden p-7 sm:p-8 text-brand-950 min-h-[240px] flex flex-col justify-between">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3 rounded-xl border border-brand-900/15"
                />
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold text-2xl leading-none">Schwesterherz</p>
                    <p className="text-[0.55rem] uppercase tracking-[0.18em] text-brand-700 mt-1">
                      Deine Oase für Schönheit &amp; Entspannung
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-brand-900/10 text-brand-900 border border-brand-900/15">
                    <Sparkles size={11} aria-hidden="true" />
                    Gutschein
                  </span>
                </div>

                <div className="relative z-10 my-5">
                  <span className="block text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-brand-700">
                    Verwöhnerlebnis
                  </span>
                  <p className="font-display font-semibold text-2xl sm:text-[1.75rem] leading-tight mt-0.5">
                    Shazay Head Spa Ritual
                  </p>
                </div>

                <div className="relative z-10 pt-3.5 border-t border-brand-900/15 flex items-center justify-between text-xs text-brand-800">
                  <span className="font-display italic text-base">„Eine Auszeit von Herzen“</span>
                  <span className="text-[0.7rem] text-brand-700">3 Jahre gültig</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-6">
            <span className="inline-block text-[0.7rem] uppercase tracking-[0.22em] text-brand-600 font-semibold mb-2.5">
              Perfekt für jeden Anlass
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-brand-900 mb-5 text-balance">
              Zeit für Entspannung verschenken
            </h2>
            <p className="text-stone-600 mb-6 leading-relaxed text-pretty">
              Ob zum Geburtstag, als kleines Dankeschön oder einfach für einen lieben Menschen: Gestalte deinen individuellen Schwesterherz-Geschenkgutschein mit persönlicher Widmung – als edle Karte im Studio oder digital per PDF.
            </p>
            <Link
              to="/gutscheine"
              className="inline-flex items-center justify-center gap-2.5 bg-brand-900 hover:bg-brand-800 text-white font-semibold px-7 py-3.5 min-h-[48px] rounded-full shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
            >
              <Gift size={18} aria-hidden="true" />
              Gutschein gestalten
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      {/* CTA Footer - Primary Brand Color Block */}
      <section className="bg-brand-300 py-16 md:py-24 text-brand-950 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold mb-6 text-balance">Gönnen Sie sich eine Auszeit.</h2>
          <p className="text-brand-900 text-lg sm:text-xl mb-8 opacity-85 text-pretty">
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