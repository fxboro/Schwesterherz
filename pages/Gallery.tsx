import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  const closeLightbox = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    }
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % galleryImages.length
    );
  }, []);

  // Light-dismiss fallback for browsers without native <dialog closedby="any">
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setActiveIndex(null);
    dialog.addEventListener('close', handleClose);

    if ('closedBy' in HTMLDialogElement.prototype) {
      return () => dialog.removeEventListener('close', handleClose);
    }

    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };

    let pressedOutside = false;
    const onPointerDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);

    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const activeImage = activeIndex !== null ? galleryImages[activeIndex] : null;

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
            <button
              key={idx}
              type="button"
              onClick={() => openLightbox(idx)}
              aria-label={`${img.caption} vergrößern`}
              className="group relative rounded-xl overflow-hidden shadow-sm aspect-[4/3] cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              <img 
                src={img.src} 
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-1">{img.category}</span>
                <span className="text-white font-bold text-lg flex items-center justify-between gap-2">
                  <span>{img.caption}</span>
                  <ZoomIn size={18} className="shrink-0 text-brand-200" aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Native Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        aria-labelledby="lightbox-title"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') showPrev();
          if (e.key === 'ArrowRight') showNext();
        }}
        {...({ closedby: 'any' } as any)}
        className="lightbox-dialog m-auto max-w-4xl w-[calc(100vw-2rem)] rounded-2xl bg-stone-900 text-white p-0 shadow-2xl border border-stone-700/60 overflow-hidden"
      >
        {activeImage && (
          <div className="relative flex flex-col">
            <div className="flex items-center justify-between px-5 py-3.5 bg-stone-950/80 border-b border-stone-800">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-300">
                  {activeImage.category}
                </span>
                <h2 id="lightbox-title" className="text-base sm:text-lg font-display font-bold text-white">
                  {activeImage.caption}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                autoFocus
                aria-label="Lightbox schließen"
                className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-300"
              >
                <X size={22} />
              </button>
            </div>

            <div className="relative bg-black flex items-center justify-center">
              <img
                src={activeImage.src}
                alt={activeImage.caption}
                className="max-h-[75vh] w-full object-contain"
              />
              <button
                type="button"
                onClick={showPrev}
                aria-label="Vorheriges Bild"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/75 hover:bg-stone-900 text-white border border-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-300"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Nächstes Bild"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/75 hover:bg-stone-900 text-white border border-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-300"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export default Gallery;