import React, { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, MapPin, Mail, Instagram } from 'lucide-react';
import { NAV_ITEMS, FOOTER_NAV_ITEMS, CONTACT_INFO, BOOKING_URL } from '../constants';
import Chatbot from './Chatbot';

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

  // Lock body scroll when mobile menu is open & close on Escape
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-800 bg-stone-50">
      {/* Skip to Content — Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold"
      >
        Zum Inhalt springen
      </a>

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

      {/* Site Header & Balanced 3-Zone Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FBF9F8]/95 backdrop-blur-xl shadow-md border-b border-brand-200/60 py-2'
            : 'bg-[#FBF9F8]/90 backdrop-blur-xl border-b border-brand-200/50 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
          {/* Left Zone: Logo Brand */}
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex flex-col lg:justify-self-start group shrink-0 min-w-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
          >
            <span className="text-[1.65rem] sm:text-[2rem] font-display font-semibold text-brand-900 tracking-wide leading-none">
              Schwesterherz
            </span>
            <span className="text-[0.55rem] sm:text-[0.6rem] text-brand-500/85 font-normal tracking-wider uppercase mt-0.5 group-hover:text-brand-700 transition-colors truncate">
              Deine Oase für Schönheit & Entspannung
            </span>
          </NavLink>

          {/* Center Zone: Evenly Spaced Primary Navigation */}
          <nav aria-label="Hauptnavigation" className="hidden lg:flex lg:justify-self-center">
            <ul className="flex items-center gap-8 xl:gap-10">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `whitespace-nowrap py-1.5 text-xs uppercase tracking-[0.16em] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 rounded-sm ${
                        isActive
                          ? 'text-brand-950 border-b-2 border-brand-600'
                          : 'text-stone-600 hover:text-brand-900 border-b-2 border-transparent'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Zone: Primary Booking CTA */}
          <div className="hidden lg:flex lg:justify-self-end items-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap bg-brand-900 hover:bg-brand-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg text-xs tracking-wider uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900"
            >
              Termin buchen
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-1.5">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-900 hover:bg-brand-50 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              aria-label="Anrufen"
            >
              <Phone size={22} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-800 hover:bg-stone-100 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <nav
          aria-label="Mobile Navigation"
          className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl border-t border-stone-100 flex flex-col p-4 max-h-[85dvh] overflow-y-auto transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          aria-hidden={!isMenuOpen}
          {...(!isMenuOpen ? ({ inert: '' } as any) : {})}
        >
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
          <div className="mt-3 pt-3 border-t border-brand-200/60 px-2">
            <span className="block px-2 mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-600">
              Studio
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {FOOTER_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-900 font-semibold'
                        : 'text-stone-600 hover:bg-stone-50 hover:text-brand-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
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
        </nav>
      </header>

      {/* Content */}
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-950 text-brand-100 pt-16 pb-10 border-t border-brand-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-8 lg:gap-x-10">
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="mb-5">
              <h3 className="text-3xl font-display font-semibold text-brand-200 leading-tight">Schwesterherz</h3>
              <p className="text-[0.65rem] sm:text-[0.7rem] text-brand-400/90 font-normal tracking-wide mt-0.5">Deine Oase für Schönheit &amp; Entspannung</p>
            </div>
            <p className="mb-6 text-brand-200/85 text-sm leading-relaxed text-pretty max-w-md">
              Dein Wohlfühlstudio für professionelle Fußpflege, Kosmetik und exklusive Wellnessbehandlungen in Neunkirchen-Seelscheid. Wir verbinden Schönheit, Pflege und Entspannung in einer persönlichen Wohlfühlatmosphäre.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/schwesterherzfusspflege?igsh=MTI1MjA5N25iMHVlbg=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center border border-brand-800 text-brand-300 hover:text-brand-950 hover:bg-brand-300 hover:border-brand-300 hover:scale-105 transition-all duration-300 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
              >
                <Instagram size={20} className="group-hover:scale-110 transition-transform" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer-Navigation" className="lg:col-span-2">
            <h3 className="text-[0.72rem] font-sans font-semibold uppercase tracking-[0.2em] text-brand-300 mb-5">
              Studio
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `inline-flex items-center py-0.5 transition-all duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-300 ${
                        isActive
                          ? 'text-white font-semibold underline underline-offset-4 decoration-brand-400'
                          : 'text-brand-200/80 hover:text-white hover:translate-x-0.5'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="text-[0.72rem] font-sans font-semibold uppercase tracking-[0.2em] text-brand-300 mb-5">
              Kontakt
            </h3>
            <ul className="space-y-3 text-sm text-brand-200/80">
              <li className="flex items-start gap-3">
                <span className="mt-1 block w-4 text-brand-400 shrink-0"><MapPin size={16} aria-hidden="true" /></span>
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="block w-4 text-brand-400 shrink-0"><Phone size={16} aria-hidden="true" /></span>
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300 rounded-sm">{CONTACT_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="block w-4 text-brand-400 shrink-0"><Mail size={16} aria-hidden="true" /></span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors break-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300 rounded-sm">{CONTACT_INFO.email}</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[0.72rem] font-sans font-semibold uppercase tracking-[0.2em] text-brand-300 mb-5">
              Öffnungszeiten
            </h3>
            <ul className="space-y-3 text-sm text-brand-200/80">
              {CONTACT_INFO.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-4 max-w-[220px] border-b border-brand-900/60 pb-2 last:border-0 last:pb-0">
                  <span>{h.day}</span>
                  <span className="text-brand-300 shrink-0">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[0.72rem] font-sans font-semibold uppercase tracking-[0.2em] text-brand-300 mb-5 flex items-center gap-2">
              <Instagram size={14} className="text-brand-300" aria-hidden="true" /> Instagram
            </h3>
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
                  className="block aspect-square overflow-hidden rounded-lg hover:opacity-85 hover:scale-105 transition-all duration-300 bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  <img 
                    src={src} 
                    alt={`Instagram Post ${i + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
            <a 
              href="https://www.instagram.com/schwesterherzfusspflege?igsh=MTI1MjA5N25iMHVlbg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-brand-300 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300 rounded-sm"
            >
              @schwesterherzfusspflege
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-brand-900/80 text-center text-xs text-brand-400/70 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6">
          <span>© {new Date().getFullYear()} Schwesterherz. Alle Rechte vorbehalten.</span>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
             <Link to="/gutscheine" className="text-brand-300/80 hover:text-white transition-all duration-300 hover:underline decoration-accent-500 underline-offset-4 font-medium tracking-wide">Gutscheine</Link>
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

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Layout;