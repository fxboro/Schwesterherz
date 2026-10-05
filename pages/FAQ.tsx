import React, { useState } from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { FAQS } from '../constants';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
        <div className="max-w-3xl mx-auto" role="list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div key={index} className="mb-4" role="listitem">
                <button
                  id={headingId}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={`w-full text-left px-6 py-4 rounded-xl flex justify-between items-center transition-all duration-200 ${
                    isOpen 
                      ? 'bg-brand-900 text-white shadow-md' 
                      : 'bg-white hover:bg-stone-50 text-stone-800 shadow-sm border border-stone-100'
                  }`}
                >
                  <span className="font-bold pr-4">{faq.question}</span>
                  {isOpen ? <ChevronUp size={20} className="shrink-0" /> : <ChevronDown size={20} className="shrink-0" />}
                </button>
                <div 
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-4 text-stone-600 bg-white rounded-xl border border-stone-100 whitespace-pre-wrap leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
};

export default FAQ;