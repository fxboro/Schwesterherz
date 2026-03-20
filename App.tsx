import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Prices from './pages/Prices';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';

const App: React.FC = () => {
  return (
    <HashRouter>
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
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;