import React, { useState } from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { PRICES, BOOKING_URL } from '../constants';
import { PriceCategory } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PriceCard: React.FC<{ category: PriceCategory }> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const disableExpand = category.disableExpand;
  const hasExpandableDetails = !disableExpand && category.items.some(item => item.details && item.details.length > 3);

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 h-full">
      <div className="bg-brand-300/30 p-6 border-b border-brand-200 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          {category.icon && (
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent-600 shadow-sm shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <category.icon size={24} className="group-hover:text-accent-700 transition-colors duration-300" />
            </div>
          )}
          <h2 className="text-xl font-bold text-brand-900">{category.title}</h2>
        </div>
        {category.description && (
          <p className="text-sm text-brand-700 mt-2 italic">{category.description}</p>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <ul className="space-y-4 mb-4">
          {category.items.map((item, itemIdx) => (
            <li key={itemIdx} className="flex flex-col border-b border-stone-100 pb-4 last:border-0 last:pb-0">
              <span className="font-medium text-stone-800">{item.name}</span>
              {item.description && (
                <span className="text-sm text-stone-500 mt-1">{item.description}</span>
              )}
              {item.details && item.details.length > 0 && (
                <div className="mt-2">
                  <ul className="space-y-1 text-sm text-stone-600 list-disc pl-5">
                    {(disableExpand ? item.details : item.details.slice(0, 3)).map((detail, dIdx) => (
                      <li key={dIdx}>{detail}</li>
                    ))}
                  </ul>
                  {!disableExpand && item.details.length > 3 && (
                    <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
                      <ul className="space-y-1 text-sm text-stone-600 list-disc pl-5">
                        {item.details.slice(3).map((detail, dIdx) => (
                          <li key={dIdx + 3}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        {hasExpandableDetails && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-auto text-brand-600 font-medium text-sm hover:text-brand-700 self-start flex items-center gap-1 transition-colors"
          >
            {isExpanded ? (
              <>Weniger anzeigen <ChevronUp size={16} /></>
            ) : (
              <>Mehr anzeigen <ChevronDown size={16} /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const Prices: React.FC = () => {
  return (
    <Section>
      <SEO 
        title="Pakete & Preise" 
        description="Übersicht unserer Pflegepakete und Preise für medizinische Fußpflege, Wellness-Behandlungen und das Shazay Head Spa Ritual."
      />
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-4xl font-display font-bold text-brand-900">Pakete</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {PRICES.map((category, idx) => (
          <PriceCard key={idx} category={category} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-stone-500 mb-6 max-w-2xl mx-auto text-sm">
          Bitte informieren Sie uns bei der Terminvereinbarung über spezielle Anforderungen.
        </p>
        <a 
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-900 hover:bg-brand-800 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-md"
        >
          Termin vereinbaren
        </a>
      </div>
    </Section>
  );
};

export default Prices;