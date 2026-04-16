import React, { useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import SEO from '../components/SEO';
import { CONTACT_INFO } from '../constants';
import { Download, Mail, CheckCircle2 } from 'lucide-react';

const KundenErfassungsbogen: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPdfMode, setIsPdfMode] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    vorname: '',
    strasse: '',
    hausnummer: '',
    plz: '',
    wohnort: '',
    geburtsdatum: '',
    telefon: '',
    diabetiker: '',
    rheumatiker: '',
    blutverduennend: '',
    durchblutung: '',
    bluthochdruck: '',
    herzerkrankungen: '',
    herzschrittmacher: '',
    infektionen: '',
    ops: '',
    krampfadern: '',
    thrombose: '',
    tetanus: '',
    allergien: '',
    ortDatum: '',
    unterschrift: '',
    consent: false
  });

  const isFormValid = Object.values(formData).every(value => {
    if (typeof value === 'string') return value.trim() !== '';
    if (typeof value === 'boolean') return value === true;
    return false;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('Bitte bestätigen Sie Ihr Einverständnis am Ende des Formulars.');
      return;
    }

    setIsGenerating(true);
    setIsPdfMode(true);
    
    try {
      // Wait for React to render the div replacements for inputs
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (!formRef.current) return;
      
      const canvas = await html2canvas(formRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollY: -window.scrollY,
        windowWidth: 1000,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('pdf-content');
          if (el) {
            el.style.width = '800px';
            el.style.maxWidth = 'none';
            el.style.padding = '40px';
            el.style.margin = '0';
            el.style.backgroundColor = 'white';
            el.style.height = 'auto';
            el.style.overflow = 'visible';
            el.style.transform = 'none';
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add subsequent pages if the form is longer than one A4 page
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const fileName = `Kunden-Erfassungsbogen_${formData.name || 'Kunde'}_${formData.vorname || ''}.pdf`.replace(/\s+/g, '_');
      pdf.save(fileName);
      
      const subject = encodeURIComponent(`Kunden-Erfassungsbogen: ${formData.name}, ${formData.vorname}`);
      const body = encodeURIComponent(`Guten Tag,\n\nanbei erhalten Sie meinen ausgefüllten Kunden-Erfassungsbogen als PDF-Datei.\n\n(Bitte vergessen Sie nicht, die soeben heruntergeladene PDF-Datei "${fileName}" an diese E-Mail anzuhängen!)\n\nMit freundlichen Grüßen\n${formData.vorname} ${formData.name}`);
      
      window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 8000);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Es gab einen Fehler bei der PDF-Erstellung. Bitte versuchen Sie es erneut.');
    } finally {
      setIsPdfMode(false);
      setIsGenerating(false);
    }
  };

  const renderRadioGroup = (name: string, label: string) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-stone-100 last:border-0">
      <span className="text-stone-700 font-medium mb-2 sm:mb-0 pr-4">{label}</span>
      {isPdfMode ? (
        <div className="font-bold text-brand-700 text-lg">
          {formData[name as keyof typeof formData]}
        </div>
      ) : (
        <div className="flex gap-6 shrink-0">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name={name} 
              value="Ja" 
              checked={formData[name as keyof typeof formData] === 'Ja'}
              onChange={handleInputChange}
              className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-stone-300"
              required
            />
            <span className="text-stone-700">Ja</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name={name} 
              value="Nein" 
              checked={formData[name as keyof typeof formData] === 'Nein'}
              onChange={handleInputChange}
              className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-stone-300"
              required
            />
            <span className="text-stone-700">Nein</span>
          </label>
        </div>
      )}
    </div>
  );

  const renderInput = (name: string, label: string, type: string = 'text', required: boolean = true) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-stone-700">{label}</label>
      {isPdfMode ? (
        <div className="w-full border-b-2 border-stone-300 bg-transparent px-0 py-2 min-h-[42px] flex items-end text-stone-900 font-semibold text-lg break-words whitespace-pre-wrap">
          {formData[name as keyof typeof formData] || '\u00A0'}
        </div>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name as keyof typeof formData] as string}
          onChange={handleInputChange}
          required={required}
          className="w-full border-b-2 border-stone-200 bg-transparent px-0 py-2 h-[42px] focus:border-brand-500 focus:ring-0 transition-colors outline-none"
          placeholder={`Ihr ${label}`}
        />
      )}
    </div>
  );

  return (
    <>
      <SEO 
        title="Kunden-Erfassungsbogen" 
        description="Füllen Sie unseren Kunden-Erfassungsbogen bequem online aus."
      />
      <div className="bg-brand-50 min-h-screen py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-brand-900 mb-4">Kunden-Erfassungsbogen</h1>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Bitte füllen Sie das Formular vollständig aus. Nach dem Klick auf "Speichern & Senden" wird ein PDF generiert, das Sie uns per E-Mail zusenden können.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-0">
              
              {/* This div is the one that gets converted to PDF */}
              <div id="pdf-content" ref={formRef} className="p-6 sm:p-10 bg-white text-stone-900">
                <h2 className="text-2xl font-bold border-b-2 border-brand-900 pb-2 mb-6 inline-block">Kunden-Erfassungsbogen</h2>
                
                <p className="mb-8 text-stone-800 leading-relaxed">
                  Sehr geehrte Kundin, sehr geehrter Kunde,<br/><br/>
                  die sorgfältige Behandlung Ihrer Füße hat bei mir höchste Priorität. Um Komplikationen auszuschließen und Risiken zu kennen, bitte ich Sie, alle Fragen korrekt zu beantworten. Alle Angaben unterliegen dem Datenschutz und werden nicht an Dritte weitergeleitet.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                  {renderInput('name', 'Name')}
                  {renderInput('vorname', 'Vorname')}
                  {renderInput('strasse', 'Strasse')}
                  {renderInput('hausnummer', 'Hausnummer')}
                  {renderInput('plz', 'PLZ')}
                  {renderInput('wohnort', 'Wohnort')}
                  {renderInput('geburtsdatum', 'Geburtsdatum', 'text')}
                  {renderInput('telefon', 'Telefon', 'tel')}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-10">
                  <div className="space-y-2">
                    {renderRadioGroup('diabetiker', 'Sind Sie Diabetiker?')}
                    {renderRadioGroup('rheumatiker', 'Sind Sie Rheumatiker?')}
                    {renderRadioGroup('blutverduennend', 'Nehmen sie Blutverdünnende Mittel ein?')}
                    {renderRadioGroup('durchblutung', 'Leiden Sie an Durchblutungsstörungen?')}
                    {renderRadioGroup('bluthochdruck', 'Leiden sie unter Bluthochdruck?')}
                    {renderRadioGroup('herzerkrankungen', 'Liegen Herzerkrankungen vor?')}
                  </div>
                  <div className="space-y-2">
                    {renderRadioGroup('herzschrittmacher', 'Tragen sie einen Herzschrittmacher?')}
                    {renderRadioGroup('infektionen', 'Liegen Infektionskrankheiten vor? HIV/Hepatitis')}
                    {renderRadioGroup('ops', 'OP\'s an den Füßen/Beinen')}
                    {renderRadioGroup('krampfadern', 'Haben sie Krampfadern?')}
                    {renderRadioGroup('thrombose', 'Besteht Thrombosegefahr oder liegt eine vor?')}
                    {renderRadioGroup('tetanus', 'Sind sie Tetanus geimpft?')}
                  </div>
                </div>

                <div className="mb-10">
                  <label htmlFor="allergien" className="text-sm font-medium text-stone-700 mb-2 block">Bestehen Allergien?</label>
                  {isPdfMode ? (
                    <div className="w-full border-b-2 border-stone-300 bg-transparent px-0 py-2 min-h-[42px] flex items-end text-stone-900 font-semibold text-lg break-words whitespace-pre-wrap">
                      {formData.allergien || '\u00A0'}
                    </div>
                  ) : (
                    <input
                      type="text"
                      id="allergien"
                      name="allergien"
                      value={formData.allergien}
                      onChange={handleInputChange}
                      required
                      className="w-full border-b-2 border-stone-200 bg-transparent px-0 py-2 h-[42px] focus:border-brand-500 focus:ring-0 transition-colors outline-none"
                      placeholder="Falls ja, bitte hier eintragen (oder 'Nein' eintragen)..."
                    />
                  )}
                </div>

                <div className="bg-stone-50 p-6 rounded-xl mb-8 text-sm text-stone-800 leading-relaxed border border-stone-200">
                  <strong>Die Risiken einer Behandlung sind erfahrungsgemäß gering.</strong> Trotzdem möchte ich darauf hinweisen dass es zu Stich- oder Schnittverletzungen kommen kann. Welche von mir sofort versorgt werden. Durch Desinfektionsmittel oder Pflegeprodukte können allergische Reaktionen auftreten, weshalb mir Ihre Hinweise auf eventuelle Unverträglichkeiten sehr wichtig sind.
                </div>

                <div className="mb-8">
                  {isPdfMode ? (
                    <div className="flex items-start gap-3 p-4 border-2 border-brand-100 rounded-xl bg-brand-50">
                      <CheckCircle2 className="text-brand-600 shrink-0 mt-0.5" size={20} />
                      <span className="text-stone-800 font-medium">
                        Alle Fragen habe ich nach besten Wissen beantwortet. Mögliche Risiken sind mir bekannt. Den Behandlungen stimme ich uneingeschränkt zu.
                      </span>
                    </div>
                  ) : (
                    <label className="flex items-start gap-3 cursor-pointer p-4 border-2 border-brand-100 rounded-xl hover:bg-brand-50 transition-colors">
                      <input 
                        type="checkbox" 
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-stone-300 shrink-0"
                        required
                      />
                      <span className="text-stone-800 font-medium">
                        Alle Fragen habe ich nach besten Wissen beantwortet. Mögliche Risiken sind mir bekannt. Den Behandlungen stimme ich uneingeschränkt zu.
                      </span>
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-stone-200">
                  {renderInput('ortDatum', 'Ort, Datum')}
                  {renderInput('unterschrift', 'Digitale Unterschrift (Vor- und Nachname)')}
                </div>
              </div>

              {/* Action Buttons (Not included in PDF) */}
              <div className="bg-stone-50 p-6 sm:p-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-2 max-w-md">
                  <p className="text-sm text-stone-500">
                    Ihre Daten werden lokal in ein PDF umgewandelt und nicht auf unseren Servern gespeichert.
                  </p>
                  {!isFormValid && (
                    <p className="text-sm text-red-500 font-medium flex items-center gap-1.5 animate-in fade-in">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                      Bitte füllen Sie alle Felder aus und bestätigen Sie Ihr Einverständnis, um fortzufahren.
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isGenerating || !isFormValid}
                  className="w-full sm:w-auto bg-brand-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-800 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Wird generiert...
                    </span>
                  ) : (
                    <>
                      <Download size={20} />
                      Speichern & Senden
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {isSuccess && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4">
              <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={24} />
              <div>
                <h3 className="text-green-900 font-bold text-lg mb-1">PDF erfolgreich erstellt!</h3>
                <p className="text-green-800">
                  Das PDF wurde heruntergeladen und Ihr E-Mail-Programm sollte sich geöffnet haben. 
                  <strong> Bitte vergessen Sie nicht, die heruntergeladene PDF-Datei an die E-Mail anzuhängen</strong>, bevor Sie diese absenden.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default KundenErfassungsbogen;
