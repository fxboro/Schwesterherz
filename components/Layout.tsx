import React, { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, MapPin, Mail, Instagram } from 'lucide-react';
import { NAV_ITEMS, CONTACT_INFO, BOOKING_URL } from '../constants';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-800 bg-stone-50">
      {/* Top Bar */}
      <div className="bg-brand-950 text-brand-100 py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-2"><Phone size={14} /> {CONTACT_INFO.phone}</span>
            <span className="flex items-center gap-2 text-brand-200 opacity-80">Mo–Fr: 9-18 Uhr</span>
          </div>
          <div className="flex gap-4">
             <a href={`https://wa.me/${CONTACT_INFO.phone.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
               <MessageCircle size={14} /> WhatsApp
             </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-md py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo Brand */}
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="flex flex-col mr-8 group shrink-0">
            <span className="text-2xl sm:text-3xl font-display font-bold text-brand-900 tracking-wide leading-none">
              Schwesterherz
            </span>
            <span className="text-[10px] sm:text-[11px] text-brand-500 font-medium tracking-widest uppercase mt-0.5 group-hover:text-brand-700 transition-colors">
              Deine Oase für Schönheit & Entspannung
            </span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-6 xl:gap-8 items-center">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-wider font-bold transition-colors duration-200 ${
                    isActive ? 'text-brand-900 border-b-2 border-brand-400' : 'text-stone-600 hover:text-brand-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a 
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-900 hover:bg-brand-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg text-xs tracking-wide uppercase"
            >
              Termin buchen
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <a 
              href={`tel:${CONTACT_INFO.phone}`} 
              className="p-2 text-brand-900 hover:bg-brand-50 rounded-full transition-colors"
              aria-label="Anrufen"
            >
              <Phone size={24} />
            </a>
            <button 
              className="p-2 text-stone-800 hover:bg-stone-50 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl border-t border-stone-100 flex flex-col p-4 animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg transition-colors text-lg ${
                    isActive ? 'bg-brand-50 text-brand-900 font-bold' : 'text-stone-600 hover:bg-stone-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-4 pt-4 border-t border-stone-100">
               <a 
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-brand-900 text-white px-5 py-3 rounded-xl font-bold shadow-md active:bg-brand-800"
              >
                Termin buchen
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-950 text-brand-100 py-12 border-t border-brand-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-display font-bold text-brand-300 leading-tight">Schwesterherz</h3>
              <p className="text-[10px] text-brand-400 uppercase tracking-widest mt-1">Deine Oase für Schönheit & Entspannung</p>
            </div>
            <p className="mb-6 text-brand-200/80 text-sm leading-relaxed">
              Ihre Praxis für Fußgesundheit & Wohlbefinden in Neunkirchen-Seelscheid. 
              Wir verbinden medizinische Kompetenz mit purer Entspannung.
            </p>
            <div className="flex gap-4">
               <a href="https://www.instagram.com/schwesterherzfusspflege?igsh=MTI1MjA5N25iMHVlbg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center border border-brand-800 text-brand-400 hover:text-brand-950 hover:bg-brand-300 hover:border-brand-300 hover:scale-110 transition-all duration-300 group">
                 <Instagram size={20} className="group-hover:scale-110 transition-transform" />
               </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm text-brand-200/80">
              <li className="flex items-start gap-3">
                <span className="mt-1 block w-4 text-brand-400"><MapPin size={16} /></span>
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="block w-4 text-brand-400"><Phone size={16} /></span>
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-brand-300 transition-colors">{CONTACT_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="block w-4 text-brand-400"><Mail size={16} /></span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-300 transition-colors">{CONTACT_INFO.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Öffnungszeiten</h4>
            <ul className="space-y-3 text-sm text-brand-200/80">
              {CONTACT_INFO.hours.map((h, i) => (
                <li key={i} className="flex justify-between max-w-[200px] border-b border-brand-900/50 pb-2 last:border-0 last:pb-0">
                  <span>{h.day}</span>
                  <span className="text-brand-400">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Instagram size={20} className="text-brand-400" /> Instagram
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                '/images/Foot_care_01.png',
                '/images/Spa_01.png',
                '/images/Head_massage_01.png',
                '/images/Head_massage_bed_01.png',
                '/images/Foot_care_02.png',
                '/images/nenette_image_01.png'
              ].map((src, i) => (
                <a 
                  key={i} 
                  href="https://www.instagram.com/schwesterherzfusspflege?igsh=MTI1MjA5N25iMHVlbg==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block aspect-square overflow-hidden rounded-md hover:opacity-80 transition-opacity bg-brand-900"
                >
                  <img 
                    src={src} 
                    alt={`Instagram Post ${i + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </a>
              ))}
            </div>
            <a 
              href="https://www.instagram.com/schwesterherzfusspflege?igsh=MTI1MjA5N25iMHVlbg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-brand-400 hover:text-white transition-colors"
            >
              @schwesterherzfusspflege
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-brand-900 text-center text-xs text-brand-500/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} Schwesterherz. Alle Rechte vorbehalten.</span>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
             <Link to="/kunden-erfassungsbogen" className="text-brand-300/80 hover:text-white transition-all duration-300 hover:underline decoration-accent-500 underline-offset-4 font-medium tracking-wide">Kunden-Erfassungsbogen</Link>
             <Link to="/impressum" className="text-brand-300/80 hover:text-white transition-all duration-300 hover:underline decoration-accent-500 underline-offset-4 font-medium tracking-wide">Impressum</Link>
             <Link to="/datenschutz" className="text-brand-300/80 hover:text-white transition-all duration-300 hover:underline decoration-accent-500 underline-offset-4 font-medium tracking-wide">Datenschutz</Link>
          </div>
        </div>
      </footer>
      
      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${CONTACT_INFO.phone.replace(/\s/g, '')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-accent-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1 z-40 flex items-center justify-center hover:bg-accent-500 ring-2 ring-white/20"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
};

export default Layout;