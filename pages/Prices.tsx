import React, { useState } from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { PRICES, BOOKING_URL } from '../constants';
import { PriceCategory } from '../types';
import { ChevronDown, ChevronUp, Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PriceCard: React.FC<{ category: PriceCategory; index: number }> = ({ category, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const disableExpand = category.disableExpand;

  // Determine if this card has multiple items or excess details that can be collapsed
  const hasMultipleItems = category.items.length > 1;
  const hasDetailedItems = category.items.some(item => item.details && item.details.length > 0);
  const firstItem = category.items[0];
  const firstItemDetails = firstItem?.details || [];
  const firstItemExtraDetails = firstItemDetails.slice(3);
  const remainingItems = category.items.slice(1);

  const isExpandable = !disableExpand && (
    (hasMultipleItems && hasDetailedItems) || 
    firstItemDetails.length > 3
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover="hover"
      animate="rest"
      className="group bg-white rounded-2xl shadow-sm border border-brand-100 hover:border-brand-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Card Header with unified minimum height for aligned rows */}
      <div className="bg-brand-300/30 p-6 border-b border-brand-200 flex flex-col gap-2 min-h-[110px] justify-center">
        <div className="flex items-center gap-4">
          {category.icon && (
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent-600 shadow-sm shrink-0 group-hover:bg-accent-50 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out">
              <category.icon size={24} className="group-hover:text-accent-700 transition-colors duration-500" />
            </div>
          )}
          <h2 className="text-xl font-bold text-brand-900 tracking-tight leading-snug">{category.title}</h2>
        </div>
        {category.description && (
          <p className="text-xs sm:text-sm text-brand-700 italic mt-0.5 line-clamp-2">{category.description}</p>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-4 mb-4">
          {/* Always Visible Section */}
          {firstItem && (
            <div className="flex flex-col border-b border-stone-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-stone-800 text-base">{firstItem.name}</span>
                {firstItem.description && (
                  <span className="text-xs font-medium text-stone-500 shrink-0 inline-flex items-center gap-1 bg-stone-50 px-2 py-0.5 rounded-full border border-stone-200/60">
                    <Clock size={12} className="text-brand-500" />
                    {firstItem.description}
                  </span>
                )}
              </div>

              {firstItemDetails.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {(isExpandable ? firstItemDetails.slice(0, 3) : firstItemDetails).map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-stone-600 hover:text-stone-900 transition-colors text-sm">
                      <motion.div
                        variants={{
                          rest: { scale: 1, y: 0 },
                          hover: { 
                            scale: [1, 1.2, 1], 
                            y: [0, -2, 0],
                            transition: { 
                              duration: 1.5, 
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: dIdx * 0.12
                            } 
                          }
                        }}
                        className="mt-0.5 shrink-0"
                      >
                        <Check size={16} className="text-accent-500" />
                      </motion.div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Preview badge if multiple items are collapsed */}
              {isExpandable && !isExpanded && remainingItems.length > 0 && (
                <div className="mt-3">
                  <span className="text-xs font-medium text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full inline-flex items-center gap-1 border border-brand-200/50">
                    +{remainingItems.length} weitere {remainingItems.length === 1 ? 'Behandlung' : 'Behandlungen'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* If the card is NOT expandable (e.g. short list of treatments without details), render all items directly */}
          {!isExpandable && remainingItems.map((item, itemIdx) => (
            <div key={itemIdx + 1} className="flex flex-col border-b border-stone-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-stone-800 text-base">{item.name}</span>
                {item.description && (
                  <span className="text-xs font-medium text-stone-500 shrink-0 inline-flex items-center gap-1 bg-stone-50 px-2 py-0.5 rounded-full border border-stone-200/60">
                    <Clock size={12} className="text-brand-500" />
                    {item.description}
                  </span>
                )}
              </div>
              {item.details && item.details.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-stone-600 hover:text-stone-900 transition-colors text-sm">
                      <motion.div
                        variants={{
                          rest: { scale: 1, y: 0 },
                          hover: { 
                            scale: [1, 1.2, 1], 
                            y: [0, -2, 0],
                            transition: { 
                              duration: 1.5, 
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: dIdx * 0.12
                            } 
                          }
                        }}
                        className="mt-0.5 shrink-0"
                      >
                        <Check size={16} className="text-accent-500" />
                      </motion.div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Smooth Expandable Section */}
          {isExpandable && (
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key="expandable-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden space-y-4 pt-1"
                >
                  {/* Excess details of the first item */}
                  {firstItemExtraDetails.length > 0 && (
                    <ul className="space-y-2 border-b border-stone-100 pb-3">
                      {firstItemExtraDetails.map((detail, dIdx) => (
                        <li key={dIdx + 3} className="flex items-start gap-2.5 text-stone-600 hover:text-stone-900 transition-colors text-sm">
                          <motion.div
                            variants={{
                              rest: { scale: 1, y: 0 },
                              hover: { 
                                scale: [1, 1.2, 1], 
                                y: [0, -2, 0],
                                transition: { 
                                  duration: 1.5, 
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: (dIdx + 3) * 0.1
                                } 
                              }
                            }}
                            className="mt-0.5 shrink-0"
                          >
                            <Check size={16} className="text-accent-500" />
                          </motion.div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Remaining items with complete details */}
                  {remainingItems.map((item, itemIdx) => (
                    <div key={itemIdx + 1} className="flex flex-col border-b border-stone-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-stone-800 text-base">{item.name}</span>
                        {item.description && (
                          <span className="text-xs font-medium text-stone-500 shrink-0 inline-flex items-center gap-1 bg-stone-50 px-2 py-0.5 rounded-full border border-stone-200/60">
                            <Clock size={12} className="text-brand-500" />
                            {item.description}
                          </span>
                        )}
                      </div>

                      {item.details && item.details.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {item.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5 text-stone-600 hover:text-stone-900 transition-colors text-sm">
                              <motion.div
                                variants={{
                                  rest: { scale: 1, y: 0 },
                                  hover: { 
                                    scale: [1, 1.2, 1], 
                                    y: [0, -2, 0],
                                    transition: { 
                                      duration: 1.5, 
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: dIdx * 0.1
                                    } 
                                  }
                                }}
                                className="mt-0.5 shrink-0"
                              >
                                <Check size={16} className="text-accent-500" />
                              </motion.div>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Card Footer: Expand Toggle & Quick Booking */}
        <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
          {isExpandable ? (
            <button 
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Details ausblenden" : "Mehr Details anzeigen"}
              className="text-brand-700 hover:text-accent-600 font-semibold text-sm inline-flex items-center gap-1.5 transition-colors focus:outline-none"
            >
              {isExpanded ? (
                <>Weniger anzeigen <ChevronUp size={16} /></>
              ) : (
                <>Mehr anzeigen <ChevronDown size={16} /></>
              )}
            </button>
          ) : (
            <span className="text-xs text-stone-600 italic">Individuelle Beratung vor Ort</span>
          )}

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-accent-600 hover:text-accent-700 hover:underline shrink-0"
          >
            Buchen &rarr;
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Prices: React.FC = () => {
  return (
    <>
      <SEO 
        title="Pakete & Preise" 
        description="Übersicht unserer Pflegepakete und Preise für medizinische Fußpflege, Kosmetik Behandlungen, Männer-Grooming, Wellness und das Shazay Head Spa Ritual."
      />

      {/* Page Header — consistent with other pages */}
      <div className="bg-brand-50 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold text-brand-900 mb-4">Pakete</h1>
          <p className="text-stone-600">Unsere Behandlungspakete im Überblick.</p>
        </div>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {PRICES.map((category, idx) => (
            <PriceCard key={idx} category={category} index={idx} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-stone-500 mb-6 max-w-2xl mx-auto text-sm">
            Bitte informieren Sie uns bei der Terminvereinbarung über spezielle Anforderungen.
          </p>
          <a 
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-900 hover:bg-brand-800 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Termin vereinbaren
          </a>
        </div>
      </Section>
    </>
  );
};

export default Prices;