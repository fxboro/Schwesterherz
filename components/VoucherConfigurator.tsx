import React, { useState, useRef, useId } from 'react';
import {
  Gift,
  Sparkles,
  MessageCircle,
  Mail,
  Check,
  MapPin,
  Clock,
  AlertCircle,
  Send
} from 'lucide-react';
import {
  VOUCHER_TREATMENTS,
  VOUCHER_AMOUNTS,
  CONTACT_INFO
} from '../constants';

type VoucherType = 'treatment' | 'amount';
type VoucherDesign = 'champagne' | 'espresso' | 'sage';
type DeliveryMethod = 'pickup' | 'digital';
type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface DesignOption {
  id: VoucherDesign;
  label: string;
  swatchClass: string;
  cardClass: string;
  textClass: string;
  mutedClass: string;
  badgeClass: string;
}

const DESIGN_OPTIONS: DesignOption[] = [
  {
    id: 'champagne',
    label: 'Champagner & Kaschmir',
    swatchClass: 'bg-[#ebe0dc] border-brand-400',
    cardClass: 'voucher-card-champagne border border-brand-300/70',
    textClass: 'text-brand-950',
    mutedClass: 'text-brand-700',
    badgeClass: 'bg-brand-900/10 text-brand-900 border-brand-900/15'
  },
  {
    id: 'espresso',
    label: 'Espresso & Gold',
    swatchClass: 'bg-brand-950 border-brand-300',
    cardClass: 'voucher-card-espresso border border-brand-800',
    textClass: 'text-brand-50',
    mutedClass: 'text-brand-300',
    badgeClass: 'bg-brand-300/15 text-brand-200 border-brand-300/30'
  },
  {
    id: 'sage',
    label: 'Salbei & Ruhe',
    swatchClass: 'bg-accent-200 border-accent-500',
    cardClass: 'voucher-card-sage border border-accent-300/80',
    textClass: 'text-accent-900',
    mutedClass: 'text-accent-700',
    badgeClass: 'bg-accent-900/10 text-accent-900 border-accent-900/15'
  }
];

const DELIVERY_LABELS: Record<DeliveryMethod, string> = {
  pickup: 'Abholung im Studio (edle Geschenkkarte)',
  digital: 'Digital per E-Mail oder WhatsApp (PDF)'
};

const VoucherConfigurator: React.FC = () => {
  const headingId = useId();
  const customAmountId = useId();
  const recipientId = useId();
  const senderId = useId();
  const dedicationId = useId();
  const dedicationCountId = useId();
  const emailId = useId();
  const emailErrorId = useId();
  const phoneId = useId();
  const phoneErrorId = useId();

  const [voucherType, setVoucherType] = useState<VoucherType>('treatment');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(VOUCHER_TREATMENTS[0].id);
  const [selectedAmount, setSelectedAmount] = useState<string>('50');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [design, setDesign] = useState<VoucherDesign>('champagne');
  const [recipient, setRecipient] = useState<string>('');
  const [sender, setSender] = useState<string>('');
  const [dedication, setDedication] = useState<string>('');
  const [delivery, setDelivery] = useState<DeliveryMethod>('pickup');

  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [botField, setBotField] = useState<string>('');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<{ email?: string; phone?: string; customAmount?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; phone?: boolean; customAmount?: boolean }>({});

  const formRef = useRef<HTMLFormElement>(null);

  const activeDesign = DESIGN_OPTIONS.find((d) => d.id === design) || DESIGN_OPTIONS[0];
  const activeTreatment =
    VOUCHER_TREATMENTS.find((t) => t.id === selectedTreatmentId) || VOUCHER_TREATMENTS[0];

  const cleanCustomAmount = customAmount.trim();
  const effectiveAmount = cleanCustomAmount || selectedAmount;

  const selectionSummary =
    voucherType === 'treatment'
      ? activeTreatment.title
      : `Wertgutschein (${effectiveAmount} €)`;

  const selectionSubtitle =
    voucherType === 'treatment'
      ? activeTreatment.subtitle
      : 'Frei einlösbar für alle Fußpflege-, Kosmetik- und Head-Spa-Behandlungen';

  const displayRecipient = recipient.trim() || 'einen besonderen Menschen';
  const displaySender = sender.trim() || 'Herzen';
  const displayDedication = dedication.trim();

  const buildSummaryText = () => {
    const lines = [
      'Hallo liebes Schwesterherz-Team, ich möchte gerne einen Geschenkgutschein anfragen:',
      '',
      `• Gutschein-Art: ${voucherType === 'treatment' ? 'Behandlung' : 'Wertgutschein'}`,
      `• Auswahl: ${selectionSummary}`,
      `• Kartendesign: ${activeDesign.label}`,
      `• Für: ${recipient.trim() || '(noch offen)'}`,
      `• Von: ${sender.trim() || '(noch offen)'}`,
      ...(displayDedication ? [`• Widmung: „${displayDedication}“`] : []),
      `• Übergabe: ${DELIVERY_LABELS[delivery]}`
    ];
    return lines.join('\n');
  };

  const phoneDigits = CONTACT_INFO.phone.replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(buildSummaryText())}`;
  const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
    `Gutschein-Anfrage: ${selectionSummary}`
  )}&body=${encodeURIComponent(buildSummaryText())}`;

  const validateCustomAmount = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    if (!/^\d{2,4}$/.test(trimmed) || Number(trimmed) < 10) {
      return 'Bitte geben Sie einen Betrag ab 10 € (nur Ziffern) ein.';
    }
    return undefined;
  };

  const validateEmail = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) return 'Bitte geben Sie Ihre E-Mail-Adresse für die Bestätigung ein.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }
    return undefined;
  };

  const validatePhone = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (trimmed && !/^[\d\s+\-()]{6,}$/.test(trimmed)) {
      return 'Bitte geben Sie eine gültige Telefonnummer ein.';
    }
    return undefined;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const customAmtErr = voucherType === 'amount' ? validateCustomAmount(customAmount) : undefined;
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);

    const nextErrors = {
      customAmount: customAmtErr,
      email: emailErr,
      phone: phoneErr
    };
    setErrors(nextErrors);
    setTouched({ customAmount: true, email: true, phone: true });

    if (customAmtErr) {
      document.getElementById(customAmountId)?.focus();
      return;
    }
    if (emailErr) {
      document.getElementById(emailId)?.focus();
      return;
    }
    if (phoneErr) {
      document.getElementById(phoneId)?.focus();
      return;
    }

    setFormStatus('sending');
    try {
      const payload = new URLSearchParams({
        'form-name': 'gutschein',
        voucherType: voucherType === 'treatment' ? 'Behandlung' : 'Wertgutschein',
        selection: selectionSummary,
        design: activeDesign.label,
        recipient: recipient.trim(),
        sender: sender.trim(),
        dedication: displayDedication,
        delivery: DELIVERY_LABELS[delivery],
        email: email.trim(),
        phone: phone.trim(),
        'bot-field': botField
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString()
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setFormStatus('success');
      setEmail('');
      setPhone('');
      setTouched({});
    } catch (error) {
      console.error('Voucher inquiry submission failed:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Column: Live Boutique Card Preview */}
      <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-5">
        <div>
          <span className="inline-block text-[0.7rem] uppercase tracking-[0.22em] font-semibold text-brand-600 mb-2">
            Live-Vorschau
          </span>
          <h2 id={headingId} className="text-2xl sm:text-3xl font-display font-semibold text-brand-900">
            Deine persönliche Geschenkkarte
          </h2>
        </div>

        {/* Physical Voucher Card Mockup */}
        <article
          aria-label="Vorschau des Geschenkgutscheins"
          className={`rounded-2xl luxury-card-shadow relative overflow-hidden p-6 sm:p-8 min-h-[270px] sm:min-h-[310px] flex flex-col justify-between transition-all duration-500 ${activeDesign.cardClass} ${activeDesign.textClass}`}
        >
          {/* Double Hairline Boutique Inner Frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-xl border border-current opacity-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-current opacity-[0.04]"
          />

          {/* Top Bar */}
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-display font-semibold text-2xl sm:text-[1.75rem] leading-none tracking-tight">
                Schwesterherz
              </p>
              <p className={`text-[0.6rem] uppercase tracking-[0.18em] mt-1 ${activeDesign.mutedClass}`}>
                Deine Oase für Schönheit &amp; Entspannung
              </p>
            </div>
            <span
              className={`shrink-0 inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] px-3 py-1 rounded-full border ${activeDesign.badgeClass}`}
            >
              <Sparkles size={12} aria-hidden="true" />
              Geschenkgutschein
            </span>
          </div>

          {/* Center Showcase */}
          <div className="relative z-10 my-6 sm:my-7 space-y-2">
            {voucherType === 'treatment' ? (
              <>
                <span className={`block text-[0.7rem] uppercase tracking-[0.2em] font-semibold ${activeDesign.mutedClass}`}>
                  Verwöhnerlebnis
                </span>
                <p className="font-display font-semibold text-2xl sm:text-3xl leading-tight text-balance">
                  {activeTreatment.title}
                </p>
              </>
            ) : (
              <>
                <span className={`block text-[0.7rem] uppercase tracking-[0.2em] font-semibold ${activeDesign.mutedClass}`}>
                  Wertgutschein
                </span>
                <p className="font-display font-semibold text-3xl sm:text-4xl leading-none">
                  {effectiveAmount} €
                </p>
              </>
            )}
            <p className={`text-xs sm:text-sm leading-relaxed text-pretty max-w-md ${activeDesign.mutedClass}`}>
              {selectionSubtitle}
            </p>
          </div>

          {/* Dedication & Footer Metadata */}
          <div className="relative z-10 pt-4 border-t border-current/15 space-y-3">
            {displayDedication && (
              <p className="font-display italic text-base sm:text-lg leading-snug break-words">
                „{displayDedication}“
              </p>
            )}
            <div className="flex flex-wrap items-end justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <p>
                  <span className={activeDesign.mutedClass}>Für: </span>
                  <span className="font-semibold break-words">{displayRecipient}</span>
                </p>
                <p>
                  <span className={activeDesign.mutedClass}>Von: </span>
                  <span className="font-semibold break-words">{displaySender}</span>
                </p>
              </div>
              <div className={`text-right text-[0.7rem] ${activeDesign.mutedClass}`}>
                <p>Neunkirchen-Seelscheid · 3 Jahre gültig</p>
                <p className="font-medium">
                  {delivery === 'pickup' ? 'Gedruckte Geschenkkarte' : 'Digital als PDF'}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Trust Strip */}
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-600">
          <li className="flex items-center gap-2 bg-brand-50/80 border border-brand-200/60 rounded-xl px-3 py-2.5">
            <MessageCircle size={15} className="text-accent-600 shrink-0" aria-hidden="true" />
            <span>Sofort per WhatsApp anfragbar</span>
          </li>
          <li className="flex items-center gap-2 bg-brand-50/80 border border-brand-200/60 rounded-xl px-3 py-2.5">
            <Gift size={15} className="text-accent-600 shrink-0" aria-hidden="true" />
            <span>Liebevoll verpackt im Studio</span>
          </li>
          <li className="flex items-center gap-2 bg-brand-50/80 border border-brand-200/60 rounded-xl px-3 py-2.5">
            <Clock size={15} className="text-accent-600 shrink-0" aria-hidden="true" />
            <span>3 Jahre flexibel einlösbar</span>
          </li>
        </ul>
      </div>

      {/* Right Column: Accessible Configurator Form */}
      <div className="lg:col-span-6">
        <form
          ref={formRef}
          name="gutschein"
          method="POST"
          action="/"
          aria-labelledby={headingId}
          noValidate
          onSubmit={handleEmailSubmit}
          className="bg-white rounded-2xl border border-brand-200/70 p-6 sm:p-8 luxury-card-shadow space-y-7"
        >
          <input type="hidden" name="form-name" value="gutschein" />
          <p className="visually-hidden" aria-hidden="true">
            <label>
              Nicht ausfüllen:
              <input
                type="text"
                name="bot-field"
                tabIndex={-1}
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
              />
            </label>
          </p>

          {/* 1. Gutschein-Art */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-brand-900 tracking-wide">
              1. Gutschein-Art wählen
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { value: 'treatment' as VoucherType, label: 'Behandlung verschenken' },
                { value: 'amount' as VoucherType, label: 'Wertgutschein' }
              ].map((opt) => {
                const checked = voucherType === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`relative flex items-center justify-between gap-2 rounded-xl border px-4 py-3 min-h-[48px] cursor-pointer transition-all ${
                      checked
                        ? 'border-brand-700 bg-brand-50/90 text-brand-950 font-semibold shadow-sm'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-brand-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="voucherType"
                      value={opt.value}
                      checked={checked}
                      onChange={() => setVoucherType(opt.value)}
                      className="visually-hidden peer"
                    />
                    <span className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-brand-700 rounded">
                      {opt.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        checked ? 'border-brand-800 bg-brand-800 text-white' : 'border-stone-400'
                      }`}
                    >
                      {checked && <Check size={12} />}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* 2. Auswahl (Behandlung oder Betrag) */}
          {voucherType === 'treatment' ? (
            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-brand-900 tracking-wide">
                2. Behandlung auswählen
              </legend>
              <div className="space-y-2.5">
                {VOUCHER_TREATMENTS.map((item) => {
                  const checked = selectedTreatmentId === item.id;
                  return (
                    <label
                      key={item.id}
                      className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 min-h-[52px] cursor-pointer transition-all ${
                        checked
                          ? 'border-brand-700 bg-brand-50/90 shadow-sm'
                          : 'border-stone-300 bg-white hover:border-brand-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="treatmentSelection"
                        value={item.id}
                        checked={checked}
                        onChange={() => setSelectedTreatmentId(item.id)}
                        className="visually-hidden peer"
                      />
                      <span className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-700 rounded">
                        <span className="block text-sm font-semibold text-brand-900">
                          {item.title}
                        </span>
                        <span className="block text-xs text-stone-600 mt-0.5">
                          {item.subtitle}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          checked ? 'border-brand-800 bg-brand-800 text-white' : 'border-stone-400'
                        }`}
                      >
                        {checked && <Check size={12} />}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ) : (
            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-brand-900 tracking-wide">
                2. Betrag auswählen
              </legend>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {VOUCHER_AMOUNTS.map((amt) => {
                  const checked = !cleanCustomAmount && selectedAmount === amt;
                  return (
                    <label
                      key={amt}
                      className={`flex items-center justify-center rounded-xl border px-3 py-2.5 min-h-[48px] cursor-pointer text-sm font-semibold transition-all ${
                        checked
                          ? 'border-brand-800 bg-brand-900 text-white shadow-sm'
                          : 'border-stone-300 bg-white text-brand-900 hover:border-brand-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="amountSelection"
                        value={amt}
                        checked={selectedAmount === amt && !cleanCustomAmount}
                        onChange={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                          setErrors((prev) => ({ ...prev, customAmount: undefined }));
                        }}
                        className="visually-hidden peer"
                      />
                      <span className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500 rounded">
                        {amt} €
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="pt-1">
                <label
                  htmlFor={customAmountId}
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Eigener Betrag in € (optional)
                </label>
                <input
                  id={customAmountId}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{2,4}"
                  maxLength={4}
                  placeholder="z. B. 85"
                  value={customAmount}
                  aria-invalid={errors.customAmount ? 'true' : undefined}
                  aria-describedby={errors.customAmount ? `${customAmountId}-err` : undefined}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomAmount(val);
                    if (errors.customAmount) {
                      setErrors((prev) => ({
                        ...prev,
                        customAmount: validateCustomAmount(val)
                      }));
                    }
                  }}
                  onBlur={() => {
                    if (!customAmount && !touched.customAmount) return;
                    setTouched((prev) => ({ ...prev, customAmount: true }));
                    setErrors((prev) => ({
                      ...prev,
                      customAmount: validateCustomAmount(customAmount)
                    }));
                  }}
                  className="w-full px-4 py-3 min-h-[48px] text-base rounded-xl border border-stone-400 bg-white text-stone-900 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                />
                {errors.customAmount && (
                  <p id={`${customAmountId}-err`} className="mt-1.5 text-xs text-red-700 flex items-center gap-1.5">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.customAmount}</span>
                  </p>
                )}
              </div>
            </fieldset>
          )}

          {/* 3. Kartendesign */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-brand-900 tracking-wide">
              3. Kartendesign
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {DESIGN_OPTIONS.map((opt) => {
                const checked = design === opt.id;
                return (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 min-h-[48px] cursor-pointer transition-all ${
                      checked
                        ? 'border-brand-700 bg-brand-50/90 font-semibold text-brand-950 shadow-sm'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-brand-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="design"
                      value={opt.id}
                      checked={checked}
                      onChange={() => setDesign(opt.id)}
                      className="visually-hidden peer"
                    />
                    <span
                      aria-hidden="true"
                      className={`w-5 h-5 rounded-full border shrink-0 ${opt.swatchClass}`}
                    />
                    <span className="text-xs sm:text-sm leading-tight peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-700 rounded">
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* 4. Persönliche Widmung */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-brand-900 tracking-wide">
              4. Persönliche Widmung
            </legend>

            <div>
              <label
                htmlFor={recipientId}
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Für wen?
              </label>
              <input
                id={recipientId}
                name="recipient"
                type="text"
                maxLength={40}
                placeholder="z. B. Liebe Mama"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-3 min-h-[48px] text-base rounded-xl border border-stone-400 bg-white text-stone-900 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              />
            </div>

            <div>
              <label
                htmlFor={senderId}
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Von wem?
              </label>
              <input
                id={senderId}
                name="sender"
                type="text"
                autoComplete="name"
                maxLength={40}
                placeholder="z. B. Deine Anna"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full px-4 py-3 min-h-[48px] text-base rounded-xl border border-stone-400 bg-white text-stone-900 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-2 mb-1.5">
                <label
                  htmlFor={dedicationId}
                  className="block text-sm font-medium text-stone-700"
                >
                  Persönliche Nachricht (optional)
                </label>
                <span id={dedicationCountId} className="text-xs text-stone-500">
                  {dedication.length}/140
                </span>
              </div>
              <textarea
                id={dedicationId}
                name="dedication"
                rows={3}
                maxLength={140}
                aria-describedby={dedicationCountId}
                placeholder="z. B. Gönn dir eine wohltuende Auszeit nur für dich."
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                className="w-full px-4 py-3 text-base rounded-xl border border-stone-400 bg-white text-stone-900 resize-y focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              />
            </div>
          </fieldset>

          {/* 5. Übergabeart */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-brand-900 tracking-wide">
              5. Übergabeart
            </legend>
            <div className="space-y-2.5">
              {(Object.keys(DELIVERY_LABELS) as DeliveryMethod[]).map((method) => {
                const checked = delivery === method;
                return (
                  <label
                    key={method}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 min-h-[48px] cursor-pointer transition-all ${
                      checked
                        ? 'border-brand-700 bg-brand-50/90 font-semibold text-brand-950 shadow-sm'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-brand-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={method}
                      checked={checked}
                      onChange={() => setDelivery(method)}
                      className="visually-hidden peer"
                    />
                    <span className="text-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-700 rounded">
                      {DELIVERY_LABELS[method]}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        checked ? 'border-brand-800 bg-brand-800 text-white' : 'border-stone-400'
                      }`}
                    >
                      {checked && <Check size={12} />}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* 6. Anfrage senden */}
          <div className="pt-2 border-t border-brand-200/70 space-y-5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] bg-accent-600 hover:bg-accent-700 text-white font-semibold text-base px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-700"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Gutschein per WhatsApp anfragen
            </a>

            <div className="relative flex items-center justify-center">
              <span className="border-t border-stone-200 w-full" aria-hidden="true" />
              <span className="bg-white px-3 text-xs uppercase tracking-widest text-stone-500 shrink-0">
                Oder direkt per E-Mail anfragen
              </span>
              <span className="border-t border-stone-200 w-full" aria-hidden="true" />
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor={emailId}
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Deine E-Mail-Adresse <span aria-hidden="true">*</span>
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  value={email}
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? emailErrorId : undefined}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEmail(val);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
                    }
                  }}
                  onBlur={() => {
                    if (!email && !touched.email) return;
                    setTouched((prev) => ({ ...prev, email: true }));
                    setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
                  }}
                  placeholder="name@beispiel.de"
                  className="w-full px-4 py-3 min-h-[48px] text-base rounded-xl border border-stone-400 bg-white text-stone-900 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                />
                {errors.email && (
                  <p id={emailErrorId} className="mt-1.5 text-xs text-red-700 flex items-center gap-1.5">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={phoneId}
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Telefonnummer (optional)
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  aria-invalid={errors.phone ? 'true' : undefined}
                  aria-describedby={errors.phone ? phoneErrorId : undefined}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPhone(val);
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: validatePhone(val) }));
                    }
                  }}
                  onBlur={() => {
                    if (!phone && !touched.phone) return;
                    setTouched((prev) => ({ ...prev, phone: true }));
                    setErrors((prev) => ({ ...prev, phone: validatePhone(phone) }));
                  }}
                  placeholder="+49 170 1234567"
                  className="w-full px-4 py-3 min-h-[48px] text-base rounded-xl border border-stone-400 bg-white text-stone-900 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                />
                {errors.phone && (
                  <p id={phoneErrorId} className="mt-1.5 text-xs text-red-700 flex items-center gap-1.5">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full min-h-[48px] bg-brand-900 hover:bg-brand-800 disabled:opacity-60 text-white font-semibold text-base px-6 py-3.5 rounded-full shadow-md transition-colors flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900"
              >
                <Send size={18} aria-hidden="true" />
                {formStatus === 'sending' ? 'Anfrage wird gesendet…' : 'Anfrage per E-Mail absenden'}
              </button>

              {formStatus === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-4 rounded-xl bg-accent-50 border border-accent-200 text-accent-900 text-sm flex items-start gap-2.5"
                >
                  <Check size={18} className="text-accent-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Vielen Dank für deine Gutschein-Anfrage!</p>
                    <p className="text-xs text-accent-800 mt-1">
                      Wir melden uns schnellstmöglich mit den Details bei dir.
                    </p>
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-4 rounded-xl bg-brand-50 border border-brand-300 text-brand-950 text-sm space-y-2"
                >
                  <p className="font-semibold flex items-center gap-2">
                    <AlertCircle size={16} className="text-brand-700 shrink-0" aria-hidden="true" />
                    Direktversand derzeit nicht möglich
                  </p>
                  <p className="text-xs text-stone-700">
                    Kein Problem — du kannst deine fertig vorbereitete Anfrage direkt über dein E-Mail-Programm oder per WhatsApp absenden:
                  </p>
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-brand-900 underline underline-offset-4 hover:text-brand-700"
                  >
                    <Mail size={14} aria-hidden="true" />
                    Vorausgefüllte E-Mail öffnen ({CONTACT_INFO.email})
                  </a>
                </div>
              )}
            </div>

            <p className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
              <MapPin size={14} className="text-brand-500 shrink-0" aria-hidden="true" />
              <span>Abholung vor Ort: {CONTACT_INFO.address}</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoucherConfigurator;
