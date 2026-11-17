import React, { useState } from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { FAQS } from '../constants';
import { ChevronDown } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([0]));
  const allOpen = openIndices.size === FAQS.length;

  const handleToggleAll = () => {
    if (allOpen) {
      setOpenIndices(new Set());
    } else {
      setOpenIndices(new Set(FAQS.map((_, i) => i)));
    }
  };

  const handleItemToggle = (index: number, isOpen: boolean) => {
    setOpenIndices((prev) => {
      if (prev.has(index) === isOpen) return prev;
      const next = new Set(prev);
      if (isOpen) {
        next.add(index);
      } else {
        next.delete(index);
      }
      return next;
    });
  };

  // FAQ Schema for Google Rich Results
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  return (
    <>
      <SEO 
        title="FAQ" 
        description="Häufig gestellte Fragen zu unseren Behandlungen, Terminvereinbarungen und dem Ablauf bei Schwesterherz in Neunkirchen-Seelscheid."
        schema={faqSchema}
      />
      <div className="bg-brand-50 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold text-brand-900 mb-4">Häufige Fragen</h1>
          <p className="text-stone-600">Alles Wichtige zu Ihrer Behandlung.</p>
        </div>
      </div>

      <Section>
        <section className="max-w-3xl mx-auto" aria-labelledby="faq-list-heading">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 id="faq-list-heading" className="text-lg font-display font-bold text-brand-900">
              Antworten auf Ihre Fragen
            </h2>
            <button
              type="button"
              onClick={handleToggleAll}
              aria-expanded={allOpen}
              className="text-sm font-semibold text-brand-800 hover:text-brand-950 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-4 py-2 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              {allOpen ? 'Alle schließen' : 'Alle öffnen'}
            </button>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details
                key={index}
                open={openIndices.has(index)}
                onToggle={(e) => handleItemToggle(index, (e.currentTarget as HTMLDetailsElement).open)}
                className="faq-item group rounded-xl bg-white border border-stone-200 shadow-sm open:border-brand-300 open:shadow-md transition-shadow"
              >
                <summary className="w-full cursor-pointer select-none px-6 py-4 rounded-xl flex items-center gap-3 font-bold text-stone-800 hover:bg-stone-50 group-open:bg-brand-900 group-open:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">
                  <ChevronDown size={20} className="faq-chevron shrink-0" aria-hidden="true" />
                  <span>{faq.question}</span>
                </summary>
                <div className="px-6 py-4 text-stone-600 whitespace-pre-wrap leading-relaxed border-t border-stone-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </Section>
    </>
  );
};

export default FAQ;