import React from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const Datenschutz: React.FC = () => {
  return (
    <>
      <SEO 
        title="Datenschutzerklärung" 
        description="Datenschutzerklärung der Praxis für Fußpflege & Wellness Schwesterherz in Neunkirchen-Seelscheid."
      />
      
      {/* Header */}
      <div className="bg-brand-950 text-brand-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Datenschutzerklärung</h1>
          <div className="h-1 w-20 bg-brand-300 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Content */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto text-stone-700 leading-relaxed space-y-8">
          
          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">1. Verantwortliche Stelle</h2>
            <p className="mb-4">
              <strong className="text-brand-900">Praxis für Fußpflege & Wellness<br/>
              Schwesterherz</strong><br/>
              Zeithstrasse 111, 53819 Neunkirchen-Seelscheid<br/>
              +49 1525 5892182<br/>
              <a href="mailto:info@sh-pflegeoase.de" className="text-brand-700 hover:text-brand-900 underline transition-colors">info@sh-pflegeoase.de</a>
            </p>
            <p>
              Die verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung personenbezogener Daten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">2. Erhebung und Speicherung personenbezogener Daten</h2>
            <p className="mb-4">
              Wir verarbeiten personenbezogene Daten, die Sie uns im Rahmen einer Behandlung, Terminvereinbarung oder Anfrage freiwillig mitteilen. Dazu gehören insbesondere:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-stone-800">
              <li><strong className="text-brand-900">Name, Anschrift, Kontaktdaten</strong></li>
              <li><strong className="text-brand-900">Gesundheitsbezogene Angaben</strong>, die für die Behandlung notwendig sind</li>
              <li><strong className="text-brand-900">Abrechnungs- und Zahlungsinformationen</strong></li>
              <li><strong className="text-brand-900">Kommunikationsdaten</strong> (E‑Mails, Telefonnotizen)</li>
            </ul>
            <p>
              Diese Daten werden ausschließlich zur Durchführung unserer Dienstleistungen und zur Erfüllung gesetzlicher Pflichten verarbeitet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">3. Zweck der Datenverarbeitung</h2>
            <p className="mb-4">Ihre Daten werden verarbeitet, um:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-800">
              <li>Termine zu vereinbaren und Behandlungen durchzuführen</li>
              <li>Ihre medizinische Versorgung sicherzustellen</li>
              <li>gesetzliche Dokumentations- und Aufbewahrungspflichten zu erfüllen</li>
              <li>Rechnungen zu erstellen und Zahlungen abzuwickeln</li>
              <li>Ihre Anfragen zu beantworten</li>
            </ul>
            <p className="font-semibold text-brand-900 bg-brand-50 p-4 rounded-lg border-l-4 border-brand-300">
              Eine Verarbeitung zu Werbezwecken findet nicht statt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">4. Rechtsgrundlagen</h2>
            <p className="mb-4">Die Verarbeitung erfolgt auf Grundlage von:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-stone-800">
              <li><strong className="text-brand-900">Art. 6 Abs. 1 lit. b DSGVO</strong> (Vertrag / Behandlung)</li>
              <li><strong className="text-brand-900">Art. 6 Abs. 1 lit. c DSGVO</strong> (gesetzliche Pflichten)</li>
              <li><strong className="text-brand-900">Art. 9 Abs. 2 lit. h DSGVO</strong> (Gesundheitsdaten im Rahmen der Behandlung)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">5. Weitergabe von Daten</h2>
            <p className="mb-4">
              Eine Weitergabe Ihrer Daten erfolgt nur, wenn dies gesetzlich vorgeschrieben ist oder zur Behandlung notwendig wird, z. B. an:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-stone-800">
              <li>Krankenkassen</li>
              <li>Abrechnungsstellen</li>
              <li>Ärztinnen / Ärzte oder andere Gesundheitsdienstleister (nur mit Ihrer Einwilligung)</li>
            </ul>
            <p>Eine Übermittlung an Drittländer findet nicht statt.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">6. Speicherung und Löschung</h2>
            <p>
              Ihre Daten werden nur so lange gespeichert, wie es für die Behandlung und gesetzliche Aufbewahrungspflichten erforderlich ist. Medizinische Dokumentationen müssen in der Regel <strong className="text-brand-900">10 Jahre</strong> aufbewahrt werden.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">7. Ihre Rechte</h2>
            <p className="mb-4">Sie haben jederzeit das Recht auf:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-stone-800">
              <li>Auskunft über Ihre gespeicherten Daten</li>
              <li>Berichtigung unrichtiger Daten</li>
              <li>Löschung, soweit keine gesetzlichen Pflichten entgegenstehen</li>
              <li>Einschränkung der Verarbeitung</li>
              <li>Widerspruch gegen die Verarbeitung</li>
              <li>Datenübertragbarkeit</li>
            </ul>
            <p>
              Bitte richten Sie Ihre Anfrage an die oben genannte verantwortliche Stelle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">8. Datensicherheit</h2>
            <p>
              Wir schützen Ihre Daten durch technische und organisatorische Maßnahmen vor Verlust, Missbrauch und unbefugtem Zugriff.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">9. Kontakt bei Datenschutzfragen</h2>
            <div className="bg-brand-50 p-6 rounded-xl border border-brand-100">
              <p className="mb-2">Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:</p>
              <a href="mailto:info@sh-pflegeoase.de" className="text-brand-700 font-bold hover:text-brand-900 transition-colors text-lg">
                info@sh-pflegeoase.de
              </a>
            </div>
          </section>

        </div>
      </Section>
    </>
  );
};

export default Datenschutz;
