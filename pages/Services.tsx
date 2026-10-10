import React from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { SERVICES, BOOKING_URL } from '../constants';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CosmeticTreatment {
  title: string;
  badge: string;
  content: string;
  badgeStyle?: string;
  isExtra?: boolean;
}

const COSMETIC_TREATMENTS: CosmeticTreatment[] = [
  {
    title: "Glow Relax",
    badge: "Basis Behandlung",
    content: "Reinigung, Peeling, Bedampfen, Maske und Abschlusspflege.",
    badgeStyle: "bg-brand-100 text-brand-800 border-brand-200"
  },
  {
    title: "Beauty Balance",
    badge: "Intensivbehandlung",
    content: "Reinigung, Peeling, Bedampfen, Maske, Augenbrauen zupfen und färben, Wimpernfärben, Serum, Toner, Gesichtsmassage und Abschlusspflege.",
    badgeStyle: "bg-accent-100 text-accent-800 border-accent-200"
  },
  {
    title: "Timeless Beauty",
    badge: "Anti Ageing Treatment",
    content: "Reinigung, Peeling, Bedampfen, Maske, Augenbrauen zupfen und färben, Wimpernfärben, Serum Hyaluronsäure, Toner, Gesichts- und Dekolletémassage, Villes-Maske und Abschlusspflege.",
    badgeStyle: "bg-brand-200 text-brand-900 border-brand-300"
  },
  {
    title: "Wellnessextra",
    badge: "Zusatzverwöhnung",
    content: "Fuß- und Handmassage",
    badgeStyle: "bg-stone-100 text-stone-700 border-stone-200",
    isExtra: true
  },
  {
    title: "Männersache",
    badge: "Business-Grooming Cleanse",
    content: "Tiefenreinigung & Enzympeeling, vitalisierende Gesichts- und Kopfhautmassage, hydratisierende Tuchmaske und Augenpflege, mattierende Abschlusspflege.",
    badgeStyle: "bg-stone-800 text-stone-100 border-stone-700"
  }
];

const Services: React.FC = () => {
  return (
    <>
      <SEO 
        title="Leistungen" 
        description="Entdecken Sie unsere Leistungen: Fußpflege nach medizinischer Art, Wellness-Fußpflege, Shazay Head Spa Ritual, Kosmetik Behandlungen und Waxing."
      />
      <div className="bg-brand-50 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-brand-900 mb-4">Unsere Leistungen</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Von medizinischer Notwendigkeit bis zur puren Entspannung.
          </p>
        </div>
      </div>

      <div className="space-y-0">
        {SERVICES.map((service, index) => (
          <Section key={service.id} bg={index % 2 === 0 ? 'white' : 'light'} id={service.id}>
            <motion.div 
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group grid md:grid-cols-2 gap-12 items-center"
            >
              <div className={`${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent-50 rounded-2xl flex items-center justify-center text-accent-600 shadow-inner shrink-0 group-hover:bg-accent-100 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 ease-out">
                      <service.icon size={32} className="group-hover:text-accent-700 transition-colors duration-700" />
                    </div>
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-900">{service.title}</h2>
                </div>
                
                <p className="text-lg text-stone-600 mb-8 leading-relaxed border-l-4 border-brand-300 pl-4">
                  {service.description}
                </p>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-brand-100 hover:border-brand-300 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="font-bold text-lg mb-4 text-brand-900">Das erwartet Sie:</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.details?.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-stone-600 hover:text-stone-900 transition-colors">
                        <motion.div
                          variants={{
                            rest: { scale: 1, y: 0 },
                            hover: { 
                              scale: [1, 1.15, 1], 
                              y: [0, -2, 0],
                              transition: { 
                                duration: 1.5, 
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: idx * 0.15
                              } 
                            }
                          }}
                          className="mt-1 shrink-0"
                        >
                          <Check size={18} className="text-accent-500" />
                        </motion.div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-900 hover:bg-brand-800 text-white px-7 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
                  >
                    Termin buchen &rarr;
                  </a>
                  <Link to="/preise" className="text-brand-900 font-bold hover:text-brand-700 inline-flex items-center gap-2 border-b border-brand-300 pb-1 hover:border-brand-500 transition-colors">
                    Zum Paket &rarr;
                  </Link>
                </div>
              </div>
              
              <div className={`relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-xl ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                 <img 
                   src={
                     service.id === 'med-fuss' ? '/images/Foot_care_01.png' :
                     service.id === 'wellness' ? '/images/Spa_01.png' :
                     service.id === 'headspa' ? '/images/Head_massage_01.png' :
                     `https://picsum.photos/seed/${service.id}/600/800`
                   }
                   alt={service.title} 
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                 />
                 {service.isNew && (
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-brand-900 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                      NEU in Seelscheid
                    </div>
                 )}
              </div>
            </motion.div>
          </Section>
        ))}

        {/* Kosmetik Behandlungen Section */}
        <Section bg="light" id="kosmetik-behandlungen">
          <motion.div 
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Text & Treatments Column */}
            <div className="md:order-2">
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent-50 rounded-2xl flex items-center justify-center text-accent-600 shadow-inner shrink-0 group-hover:bg-accent-100 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 ease-out">
                    <Sparkles size={32} className="group-hover:text-accent-700 transition-colors duration-700" />
                  </div>
                </motion.div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-900">
                    Kosmetik Behandlungen
                  </h2>
                </div>
              </div>
              
              <p className="text-lg text-stone-600 mb-8 leading-relaxed border-l-4 border-brand-300 pl-4">
                Verwöhnende Pflegezeremonien für Gesicht und Sinne: Von tiefenwirksamer Klärung bis zu regenerierenden Anti-Aging-Ritualen – abgestimmt auf Ihre Hautbedürfnisse.
              </p>

              {/* Treatment Cards */}
              <div className="space-y-3.5">
                {COSMETIC_TREATMENTS.map((treatment, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-brand-100 hover:border-brand-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent-500 shrink-0" />
                        <h3 className="font-display font-bold text-base sm:text-lg text-brand-900">
                          {treatment.title}
                        </h3>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${treatment.badgeStyle}`}>
                        {treatment.badge}
                      </span>
                    </div>
                    
                    <div className="text-sm text-stone-600 leading-relaxed pl-5 border-l-2 border-brand-100">
                      {treatment.title === "Männersache" && (
                        <p className="font-semibold text-brand-900 mb-1">
                          Männersache! Business-Grooming Cleanse
                        </p>
                      )}
                      <p>
                        {!treatment.isExtra && (
                          <span className="font-bold text-brand-900">Inhalt: </span>
                        )}
                        {treatment.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-900 hover:bg-brand-800 text-white px-7 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
                >
                  Termin buchen &rarr;
                </a>
                <Link 
                  to="/preise" 
                  className="text-brand-900 font-bold hover:text-brand-700 inline-flex items-center gap-2 border-b border-brand-300 pb-1 hover:border-brand-500 transition-colors"
                >
                  Zu allen Paketen &rarr;
                </Link>
              </div>
            </div>
            
            {/* Side Image Column */}
            <div className="relative h-72 sm:h-96 md:h-full min-h-[420px] lg:min-h-[580px] rounded-3xl overflow-hidden shadow-xl md:order-1 self-stretch">
              <img 
                src="/images/Cosmetic_care_01.jpg" 
                alt="Kosmetik Behandlungen Schwesterherz" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-brand-900 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                NEU in Seelscheid
              </div>
            </div>
          </motion.div>
        </Section>
      </div>
    </>
  );
};

export default Services;