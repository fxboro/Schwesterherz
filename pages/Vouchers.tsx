import React from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import VoucherConfigurator from '../components/VoucherConfigurator';
import { Sparkles, Send, Gift } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Sparkles,
    title: '1. Gestalten',
    text: 'Wähle eine unserer Verwöhnbehandlungen oder einen freien Wertgutschein im passenden Kartendesign und ergänze deine persönliche Widmung.'
  },
  {
    number: '02',
    icon: Send,
    title: '2. Anfragen',
    text: 'Sende deinen Entwurf mit einem Klick per WhatsApp oder E-Mail an uns ab – alle Angaben sind bereits vollständig vorbereitet.'
  },
  {
    number: '03',
    icon: Gift,
    title: '3. Freude schenken',
    text: 'Hole deine edel verpackte Geschenkkarte im Studio in Neunkirchen-Seelscheid ab oder erhalte deinen Gutschein bequem digital als PDF.'
  }
];

const Vouchers: React.FC = () => {
  return (
    <>
      <SEO
        title="Gutscheine"
        description="Verschenke wohltuende Entspannung: Gestalte deinen persönlichen Schwesterherz Geschenkgutschein für Fußpflege, Kosmetik oder das Shazay Head Spa Ritual."
      />

      {/* Quiet Luxury Editorial Header */}
      <div className="luxury-surface py-12 md:py-16 border-b border-brand-200/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[0.7rem] uppercase tracking-[0.22em] font-semibold text-brand-600 mb-3">
            Geschenkideen · Schwesterherz
          </span>
          <h1 className="text-[clamp(2rem,1.5rem+2.2vw,3.25rem)] font-display font-semibold text-brand-900 leading-tight text-balance mb-4">
            Zeit für Entspannung verschenken
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            Ob als gedruckte Boutique-Geschenkkarte zur Abholung oder kurzfristig digital per PDF – gestalte jetzt deinen individuellen Wohlfühlgutschein.
          </p>
        </div>
      </div>

      {/* Configurator */}
      <Section bg="white">
        <VoucherConfigurator />
      </Section>

      {/* 3-Step Guide */}
      <Section bg="light" className="border-t border-brand-200/50">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="inline-block text-[0.7rem] uppercase tracking-[0.22em] font-semibold text-brand-600 mb-2">
            Ablauf
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-brand-900 text-balance">
            So einfach funktioniert&apos;s
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-7 border border-brand-200/60 luxury-card-shadow flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center">
                  <step.icon size={20} aria-hidden="true" />
                </div>
                <span className="font-display italic text-2xl text-brand-400 font-semibold">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-display font-semibold text-brand-900 mt-1">
                {step.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed text-pretty">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Vouchers;
