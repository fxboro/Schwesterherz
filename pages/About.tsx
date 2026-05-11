import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { HeartHandshake, ShieldCheck, User } from 'lucide-react';

const About: React.FC = () => {
  return (
    <>
      <SEO 
        title="Über Uns" 
        description="Lernen Sie Tresor und Nenette kennen – Ihre Expertinnen für medizinische Fußpflege und Wellness bei Schwesterherz in Neunkirchen-Seelscheid."
      />
      <div className="bg-brand-50 py-8 md:py-10">
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
              className="rounded-2xl shadow-xl w-full max-w-md mx-auto md:ml-auto object-cover h-[500px]"
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
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-3xl font-display font-bold text-brand-900">Unser Team</h2>
          <div className="h-1 w-16 bg-brand-300 mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center text-center bg-white p-8 md:p-10 rounded-3xl shadow-sm"
          >
            <div className="w-40 h-40 mb-6 flex-shrink-0 bg-stone-100 rounded-full border-4 border-brand-200 shadow-lg flex items-center justify-center text-stone-400">
               <User size={64} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-brand-900 mb-2">Tresor</h3>
            <p className="text-brand-700 font-semibold mb-4">Inhaberin & medizinische Fusspflegerin</p>
            <p className="text-stone-600 leading-relaxed">
              Mit Hingabe und Expertise sorgt Tresor für das Wohlbefinden Ihrer Füße. Ihre präzise Arbeitsweise und ihr freundliches Auftreten machen jede Behandlung zu einem entspannenden Erlebnis.
            </p>
            <div className="mt-6 flex gap-4 justify-center text-stone-400">
               <User size={20} className="text-accent-400" />
               <HeartHandshake size={20} className="text-accent-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col items-center text-center bg-white p-8 md:p-10 rounded-3xl shadow-sm"
          >
            <div className="w-40 h-40 mb-6 flex-shrink-0 bg-stone-100 rounded-full border-4 border-brand-200 shadow-lg flex items-center justify-center text-stone-400">
               <User size={64} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-brand-900 mb-2">Nenette</h3>
            <p className="text-brand-700 font-semibold mb-4">Inhaberin & medizinische Fusspflegerin</p>
            <p className="text-stone-600 leading-relaxed">
              Nenette verbindet fachliches Know-how mit einer großen Portion Empathie. Sie nimmt sich Zeit für Ihre individuellen Bedürfnisse und garantiert höchste Qualität bei jeder Fußpflege.
            </p>
            <div className="mt-6 flex gap-4 justify-center text-stone-400">
               <User size={20} className="text-accent-400" />
               <HeartHandshake size={20} className="text-accent-400" />
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default About;