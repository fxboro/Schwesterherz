import React from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const images = [
  { id: 106, category: 'Praxis', caption: 'Empfangsbereich' },
  { id: 65, category: 'Wellness', caption: 'Entspannung pur' },
  { id: 453, category: 'Praxis', caption: 'Behandlungsraum' },
  { id: 117, category: 'Head Spa', caption: 'Premium Head Spa' },
  { id: 292, category: 'Head Spa', caption: 'Nackenmassage' },
  { id: 437, category: 'Behandlung', caption: 'Fußpflege nach medizinischer Art' },
];

const Gallery: React.FC = () => {
  return (
    <>
      <SEO 
        title="Galerie" 
        description="Einblicke in unsere Praxis Schwesterherz in Neunkirchen-Seelscheid. Sehen Sie Vorher-Nachher-Bilder unserer Fußpflege und Impressionen unseres Head Spas."
      />
      <div className="bg-brand-50 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold text-brand-900 mb-4">Galerie</h1>
          <p className="text-stone-600">Einblicke in unsere Praxis und unsere Arbeit.</p>
        </div>
      </div>

      <Section>
        {/* Before/After Placeholder - Hard to do with Picsum, using placeholders with text */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-brand-900">Vorher / Nachher</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img src="https://picsum.photos/id/1025/600/400" alt="Problemfüße vorher" className="w-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute top-4 left-4 bg-stone-800/80 text-white px-3 py-1 rounded-md text-sm font-bold">Vorher</div>
             </div>
             <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img src="https://picsum.photos/id/1025/600/400?blur=1" alt="Gepflegte Füße nachher" className="w-full" />
                <div className="absolute top-4 left-4 bg-accent-600/90 text-white px-3 py-1 rounded-md text-sm font-bold shadow-sm">Nachher</div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    (Symbolbild)
                </div>
             </div>
          </div>
          <p className="text-center text-stone-500 text-sm mt-4">Beispielhafte Darstellung. Ergebnisse können variieren.</p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-8 text-brand-900">Studio Impressionen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="group relative rounded-xl overflow-hidden shadow-sm aspect-[4/3] cursor-pointer">
              <img 
                src={`https://picsum.photos/id/${img.id}/600/450`} 
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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