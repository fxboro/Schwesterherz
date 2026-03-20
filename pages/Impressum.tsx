import React from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const Impressum: React.FC = () => {
  return (
    <>
      <SEO 
        title="Impressum" 
        description="Impressum der Praxis für Fußpflege & Wellness Schwesterherz in Neunkirchen-Seelscheid."
      />
      
      {/* Header */}
      <div className="bg-brand-950 text-brand-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Impressum</h1>
          <div className="h-1 w-20 bg-brand-300 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Content */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto text-stone-700 leading-relaxed space-y-8">
          
          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="mb-4">
              <strong className="text-brand-900">Praxis für Fußpflege & Wellness Schwesterherz</strong><br/>
              Vertreten durch: Tresor<br/>
              Zeithstrasse 111<br/>
              53819 Neunkirchen-Seelscheid
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">Kontakt</h2>
            <div className="bg-brand-50 p-6 rounded-xl border border-brand-100 mb-4">
              <p className="mb-2">
                <strong className="text-brand-900">Telefon:</strong> +49 1525 5892182<br/>
                <strong className="text-brand-900">E-Mail:</strong> <a href="mailto:info@sh-pflegeoase.de" className="text-brand-700 hover:text-brand-900 underline transition-colors">info@sh-pflegeoase.de</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Tresor<br/>
              Zeithstrasse 111<br/>
              53819 Neunkirchen-Seelscheid
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:text-brand-900 underline transition-colors">https://ec.europa.eu/consumers/odr/</a>.<br/>
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">Haftung für Inhalte</h2>
            <p className="mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">Haftung für Links</h2>
            <p className="mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p>
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">Urheberrecht</h2>
            <p className="mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>

        </div>
      </Section>
    </>
  );
};

export default Impressum;
