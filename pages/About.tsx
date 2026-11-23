import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { HeartHandshake, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface TeamTag {
  label: string;
  variant: 'accent' | 'brand';
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  objectPosition: string;
  paragraphs: string[];
  tags: TeamTag[];
  delay: number;
  isWideTablet?: boolean;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tresor',
    name: 'Tresor',
    role: 'Inhaberin & medizinische Fusspflegerin',
    image: '/images/Tresor_profile.jpg',
    alt: 'Tresor — Inhaberin & medizinische Fusspflegerin',
    objectPosition: '50% 0%',
    paragraphs: [
      'Zwei Schwestern, eine Vision – und vermutlich ein Hauch zu viel Kaffee im Vorfeld.',
      'Ich bin Tresor, und gemeinsam mit meiner Schwester habe ich das Schwesterherz Fußpflege & Head Spa Studio gegründet. Meine berufliche Reise begann 2019 mit einer fundierten Ausbildung in der Fußpflege. Seither habe ich meine Leidenschaft für Kosmetik, Massagen und unser exklusives Head Spa kontinuierlich vertieft.',
      'Unser Ziel ist simpel: Ein Ort, an dem Sie den Alltag einfach mal vor der Tür lassen, tief durchatmen und sich von Kopf bis Fuß verwöhnen lassen können. Bei uns verbinden sich fachliche Kompetenz und echte Herzlichkeit.',
      'Kurzum: Mehr als nur eine Behandlung – Ihre persönliche Oase für eine kleine Auszeit.'
    ],
    tags: [
      { label: 'Fußpflege', variant: 'accent' },
      { label: 'Head Spa', variant: 'brand' }
    ],
    delay: 0.15
  },
  {
    id: 'nenette',
    name: 'Nenette',
    role: 'Inhaberin & medizinische Fusspflegerin',
    image: '/images/nenette_profile_1.jpg',
    alt: 'Nenette — Inhaberin & medizinische Fusspflegerin',
    objectPosition: '50% 0%',
    paragraphs: [
      'Nenette verbindet fachliches Know-how mit einer großen Portion Empathie. Sie nimmt sich Zeit für Ihre individuellen Bedürfnisse und garantiert höchste Qualität bei jeder Fußpflege.'
    ],
    tags: [
      { label: 'Fußpflege', variant: 'accent' },
      { label: 'Wellness', variant: 'brand' }
    ],
    delay: 0.25
  },
  {
    id: 'marina',
    name: 'Marina',
    role: 'Fachwirtin für Kosmetologie & Wellness',
    image: '/images/Marina_profile.jpg',
    alt: 'Marina Tomic — Fachwirtin für Kosmetologie & Wellness',
    objectPosition: '50% 15%',
    paragraphs: [
      'Hallo! Ich bin Marina Tomic – Fachwirtin für Kosmetologie & Wellness (seit 2009 veredle ich Haut und Seele!) und Profi für Fußpflege nach medizinischer Art.',
      'Als Visagistin und Alessandro Nailstylistin bringe ich zusätzlich Farbe und Eleganz in Ihren Alltag.',
      'Nach Jahren der Selbstständigkeit (mobil und im eigenen Salon – ich habe wirklich jeden Haut- und Nagel-Notfall gesehen!) schlage ich nun ein neues Kapitel auf:',
      'Ab sofort bin ich Teil des fantastischen Schwesterherz-Teams. Ich freue mich schon riesig darauf, Sie bald persönlich zu verwöhnen und rundum zum Strahlen zu bringen!'
    ],
    tags: [
      { label: 'Kosmetologie', variant: 'accent' },
      { label: 'Fußpflege', variant: 'brand' },
      { label: 'Visagistik', variant: 'accent' },
      { label: 'Nailstyling', variant: 'brand' }
    ],
    delay: 0.35,
    isWideTablet: true
  }
];

const About: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <>
      <SEO 
        title="Über Uns" 
        description="Lernen Sie Tresor, Nenette und Marina kennen – Ihre Expertinnen für Fußpflege, Kosmetologie und Wellness bei Schwesterherz in Neunkirchen-Seelscheid."
      />
      <div className="bg-brand-50 py-10 md:py-14">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 text-center"
        >
          <h1 className="text-4xl font-display font-bold text-brand-900 mb-4">Über Uns</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Ihre Praxis für Fußgesundheit & Wohlbefinden
          </p>
        </motion.div>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-display font-bold text-brand-900 mb-6 text-center md:text-left">Schwesterherz</h2>
            <p className="text-stone-600 mb-4 leading-relaxed">
              Schwesterherz steht für hochwertige medizinische Fußpflege, moderne Wellness-Behandlungen und eine Atmosphäre, in der Sie sich sofort wohlfühlen.
            </p>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Wir nehmen uns Zeit für jeden Menschen, hören zu und behandeln mit größter Sorgfalt. Hygiene, Präzision und eine einfühlsame Behandlung stehen bei uns an erster Stelle.
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex gap-4">
                <div className="bg-accent-50 p-3 rounded-full text-accent-600 h-fit">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-brand-900">Unser Anspruch</h4>
                  <ul className="text-stone-600 mt-2 space-y-1">
                    <li>• Höchste Hygienestandards</li>
                    <li>• Moderne Behandlungsmethoden</li>
                    <li>• Individuelle Beratung</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <img 
              src="/images/Foot_care_02.png" 
              alt="Treatment Room" 
              className="rounded-2xl shadow-xl w-full max-w-md mx-auto md:ml-auto object-cover h-[350px] md:h-[500px]"
            />
          </motion.div>
        </div>
      </Section>

      <Section bg="light">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block text-[0.7rem] uppercase tracking-[0.22em] font-semibold text-brand-600 mb-2">
            Lernen Sie uns kennen
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-brand-900 text-balance">
            Unser Team
          </h2>
          <div className="h-0.5 w-16 bg-brand-300 mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="team-grid max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {TEAM_MEMBERS.map((member) => {
            const isExpandable = member.paragraphs.length > 1;
            const isExpanded = Boolean(expandedIds[member.id]);
            const bioId = `team-bio-${member.id}`;

            return (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: member.delay }}
                className={`team-card text-center bg-white p-6 sm:p-8 rounded-3xl border border-brand-200/60 luxury-card-shadow ${
                  member.isWideTablet
                    ? 'md:col-span-2 md:max-w-xl md:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0'
                    : ''
                }`}
              >
                <img
                  src={member.image}
                  alt={member.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: member.objectPosition }}
                  className="w-36 h-36 sm:w-40 sm:h-40 aspect-square rounded-full border-4 border-brand-200 shadow-lg object-cover block"
                />
                <hgroup className="text-center space-y-1.5">
                  <h3 className="text-2xl font-display font-semibold text-brand-900">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-brand-700 text-balance">
                    {member.role}
                  </p>
                </hgroup>

                <div className="w-full flex flex-col items-center">
                  {!isExpandable ? (
                    <p className="text-stone-600 text-sm sm:text-[0.95rem] leading-relaxed text-pretty">
                      {member.paragraphs[0]}
                    </p>
                  ) : isExpanded ? (
                    <div
                      id={bioId}
                      className="space-y-2.5 text-stone-600 text-sm sm:text-[0.95rem] leading-relaxed text-pretty text-left sm:text-center"
                    >
                      {member.paragraphs.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <p
                      id={bioId}
                      className="team-bio-clamped text-stone-600 text-sm sm:text-[0.95rem] leading-relaxed text-pretty"
                    >
                      {member.paragraphs.join(' ')}
                    </p>
                  )}

                  {isExpandable && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(member.id)}
                      aria-expanded={isExpanded}
                      aria-controls={bioId}
                      className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 hover:text-brand-950 transition-colors min-h-[44px] sm:min-h-[32px] px-2.5 rounded-full hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                    >
                      {isExpanded ? (
                        <>
                          Weniger anzeigen <ChevronUp size={15} aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          Mehr lesen <ChevronDown size={15} aria-hidden="true" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                <footer className="team-tag-list pt-2">
                  {member.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        tag.variant === 'accent'
                          ? 'bg-accent-50 text-accent-700'
                          : 'bg-brand-50 text-brand-700'
                      }`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </footer>
              </motion.article>
            );
          })}
        </div>
      </Section>
    </>
  );
};

export default About;