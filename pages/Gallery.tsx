import React from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const galleryImages = [
  { src: '/images/Foot_care_01.png', category: 'Behandlung', caption: 'Fußpflege nach medizinischer Art' },
  { src: '/images/Head_massage_01.png', category: 'Head Spa', caption: 'Shazay Head Spa Massage' },
  { src: '/images/Spa_01.png', category: 'Wellness', caption: 'Entspannende Spa Atmosphäre' },
  { src: '/images/Head_massage_bed_01.png', category: 'Head Spa', caption: 'Head Spa Behandlungsraum' },
  { src: '/images/Foot_care_02.png', category: 'Behandlung', caption: 'Professionelle Fußpflege' },
  { src: '/images/nenette_image_01.png', category: 'Team', caption: 'Unser Team bei der Arbeit' },
];

const Gallery: React.FC = () => {
  return (
    <>
      <SEO 
        title="Galerie" 
        description="Einblicke in unsere Praxis Schwesterherz in Neunkirchen-Seelscheid. Sehen Sie Impressionen unserer Fußpflege und unseres Head Spas."
      />
      <div className="bg-brand-50 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold text-brand-900 mb-4">Galerie</h1>
          <p className="text-stone-600">Einblicke in unsere Praxis und unsere Arbeit.</p>
        </div>
      </div>

      <Section>
        {/* Before/After Section — placeholder until real images are available */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl font-bold text-center mb-8 text-brand-900">Vorher / Nachher</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img src="/images/Foot_care_03.png" alt="Fußpflege vorher" className="w-full h-64 sm:h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute top-4 left-4 bg-stone-800/80 text-white px-3 py-1 rounded-md text-sm font-bold">Vorher</div>
             </div>
             <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img src="/images/Foot_care_01.png" alt="Gepflegte Füße nachher" className="w-full h-64 sm:h-80 object-cover" />
                <div className="absolute top-4 left-4 bg-accent-600/90 text-white px-3 py-1 rounded-md text-sm font-bold shadow-sm">Nachher</div>
             </div>
          </div>
          <p className="text-center text-stone-500 text-sm mt-4">Beispielhafte Darstellung. Ergebnisse können variieren.</p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-8 text-brand-900">Studio Impressionen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="group relative rounded-xl overflow-hidden shadow-sm aspect-[4/3] cursor-pointer">
              <img 
                src={img.src} 
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-1">{img.category}</span>
                <span className="text-white font-bold text-lg">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Gallery;