import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Prices from './pages/Prices';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';
import KundenErfassungsbogen from './pages/KundenErfassungsbogen';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track Google Analytics Pageview
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }

    // Track Facebook Pixel Pageview
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <PageTracker />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ueber-uns" element={<About />} />
          <Route path="leistungen" element={<Services />} />
          <Route path="preise" element={<Prices />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="datenschutz" element={<Datenschutz />} />
          <Route path="impressum" element={<Impressum />} />
          <Route path="kunden-erfassungsbogen" element={<KundenErfassungsbogen />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;