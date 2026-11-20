import { 
  Footprints, 
  Sparkles, 
  Droplets, 
  HeartHandshake, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Scissors, 
  Stethoscope,
  Crown,
  Car,
  Flower2,
  User
} from "lucide-react";
import { NavItem, ServiceItem, PriceCategory, Testimonial, FaqItem } from "./types";

export const BOOKING_URL = "https://terminpanda.de/anbieter/SchwesterherzDeineOasefrSchnheitundEntspannung+aey6uw";

export const NAV_ITEMS: NavItem[] = [
  { label: "Start", path: "/" },
  { label: "Über uns", path: "/ueber-uns" },
  { label: "Leistungen", path: "/leistungen" },
  { label: "Pakete", path: "/preise" },
  { label: "Galerie", path: "/galerie" },
  { label: "FAQ", path: "/faq" },
  { label: "Kontakt", path: "/kontakt" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "med-fuss",
    title: "Professionelle Fußpflege & Wohlfühlpflege",
    description: "Behandlung von Problemnägeln, Hühneraugen, eingewachsenen Nägeln, Hornhaut & mehr.",
    icon: Stethoscope,
    details: [
      "Behandlung eingewachsener Nägel",
      "Entfernung von Hühneraugen",
      "Behandlung von Druckstellen",
      "Fachgerechte Nagel- und Hornhautpflege",
      "Diabetiker-Fußpflege",
      "Beratung zu Fußproblemen & Pflegeprodukten"
    ]
  },
  {
    id: "wellness",
    title: "Wellness-Fußpflege",
    description: "Pflegende Spa-Rituale für schöne, entspannte und gepflegte Füße.",
    icon: Footprints,
    details: [
      "Wohltuendes Fußbad",
      "Peeling",
      "Pflegende Maske",
      "Entspannende Fußmassage",
      "Hochwertige Cremes & Öle"
    ]
  },
  {
    id: "headspa",
    title: "Shazay Head Spa Ritual",
    description: "Ein luxuriöses Kopfhaut-Spa mit Massage, Reinigung, Detox und Tiefenentspannung.",
    icon: Droplets,
    isNew: true,
    details: [
      "Kopfhautdiagnose",
      "Tiefenreinigung & Detox",
      "Warme Kompressen",
      "Entspannende Kopf-, Nacken- & Schultermassage",
      "Pflegende Essenzen",
      "Optional: Haarpflege & Styling"
    ]
  }
];

export const PRICES: PriceCategory[] = [
  {
    title: "Professionelle Fußpflege & Wohlfühlpflege",
    icon: Stethoscope,
    items: [
      { 
        name: "Professionelle Fußpflege",
        details: [
          "Sorgfältige Nagelpflege",
          "Pflege beanspruchter Fußbereiche",
          "Wohltuendes Öl-Fußbad",
          "Klassische Fußpflege",
          "Abschlusspflege mit pflegender Lotion."
        ]
      },
      { 
        name: "Fußpflege & Wellness-Auszeit",
        details: [
          "Professionelle kosmetische Fußpflege.",
          "Wohltuendes Fußbad",
          "15 Minuten Aroma-Fußmassage",
          "Verwöhnende Pflege beanspruchter Fußbereiche",
          "Abschlusspflege mit reichhaltiger Pflegecreme."
        ]
      },
      { 
        name: "Füße im Fokus: Die Spangentechnik",
        details: [
          "Kosmetische Fußpflege",
          "Sorgfältige Nagelpflege",
          "Wohltuendes Öl-Fußbad",
          "Anbringen und Anpassen einer Nagelspange (55 € pro Spange)",
          "Abschlusspflege mit regenerierender Pflegecreme."
        ]
      }
    ]
  },
  {
    title: "Kosmetische Fußpflege",
    icon: Sparkles,
    items: [
      {
        name: "Fußpflege",
        details: [
          "Sanfte Fußwaschung",
          "Nägel kürzen und in Form feilen"
        ]
      },
      {
        name: "Fußpflege meets Lack",
        details: [
          "Klassische Fußpflege",
          "Fußwaschung",
          "Auftragen von Nagellack",
          "Abschlusspflege mit pflegender Lotion."
        ]
      },
      {
        name: "Füße zum Verlieben – Pflege & Shellac",
        details: [
          "Klassische Fußpflege",
          "Entspannendes Fußbad",
          "Shellac.",
          "Abschlusspflege mit pflegendem Balsam."
        ]
      }
    ]
  },
  {
    title: "Wellness Fußpflege",
    icon: Footprints,
    items: [
      {
        name: "Wellness-Fußbehandlung",
        details: [
          "Wohltuende Fußpflege",
          "Klassische Nagelpflege",
          "Entspannendes Fußbad",
          "Sanftes Peeling",
          "Abschlusspflege"
        ]
      },
      {
        name: "Classic Behandlung",
        details: [
          "Klassische Fußpflege",
          "Fußwaschung",
          "Sanftes Dampfpeeling",
          "Pflegende Abschlusspflege",
          "15 Minuten Aromatherapie-Fußmassage."
        ]
      },
      {
        name: "Jelly Spa Wellness Behandlung.",
        details: [
          "Klassische Fußpflege",
          "Entspannendes Fußbad",
          "Jelly-Spa-Peeling",
          "Nagellack",
          "Abschlusspflege mit beruhigender Creme",
          "20 Minuten entspannende Aromatherapie-Fußmassage."
        ]
      }
    ]
  },
  {
    title: "V.I.P. Platinum Fußpflege",
    description: "Eine exklusive Verwöhnbehandlung für anspruchsvolle Füße",
    icon: Crown,
    disableExpand: true,
    items: [
      {
        name: "V.I.P. Platinum Behandlung.",
        details: [
          "Klassische Fußpflege",
          "Entspannendes Kräuterfußbad",
          "Sanftes Dampfpeeling",
          "Wohltuende Dampf-Fußmaske",
          "Wahlweise Nagellack oder Klarlack",
          "Intensive Nagelölpflege mit Moringa.",
          "Professionelles Nagelpolieren",
          "Pflegende Abschlusspflege",
          "30 Minuten entspannende Aromatherapie-Fußmassage"
        ]
      }
    ]
  },
  {
    title: "Shazey Head Spa Ritual",
    description: "90 Minuten Premium-Erlebnis.\nDeine exklusive Auszeit für Kopf, Haar und Seele",
    icon: Droplets,
    items: [
      {
        name: "Tauche ein in ein einzigartiges Wellnesserlebnis und genieße die wohltuende Kombination aus entspannenden Ritualen, hochwertiger Haarpflege und unserem besonderen, diamantgefilterten Wasser",
        details: [
          "Exklusives Shazey Head Spa Ritual",
          "Diamantgefiltertes Wasser für ein besonderes Wassererlebnis",
          "Individuelle Kopfhaut- und Haarpflege",
          "Wohltuende Wasseranwendungen",
          "Entspannende Massageelemente",
          "Hochwertige Pflegeprodukte",
          "Eine Auszeit voller Ruhe und Entspannung",
          "*Dauer: 90 Minuten",
          "*Termine ausschließlich nach Vereinbarung."
        ]
      }
    ]
  },
  {
    title: "Fußpflege die zu dir kommt (Mobil)",
    description: "Flexible Fußpflege vor Ort.",
    icon: Car,
    items: [
      { name: "ab 10 km 5€" },
      { name: "ab 20 km 10€" }
    ]
  },
  {
    title: "Waxing",
    description: "Glatte Haut, gepflegtes Gefühl",
    icon: Sparkles,
    items: [
      {
        name: "For the Ladies",
        details: [
          "Gesicht",
          "Beine",
          "Füße und Zehen",
          "Abschließende Entspannungsmassage (15 Min.)"
        ]
      },
      {
        name: "Waxing & Relaxation Bikini",
        details: [
          "Bikini Line – klassische Bikinizone",
          "American Style – erweiterte Bikinizone",
          "French Style – mit schmalem Streifen",
          "Brazilian Style – vollständige Haarentfernung mit optionalem Muster",
          "Hollywood Style – vollständige Haarentfernung",
          "Pflege mit wohltuendem Puder",
          "Abschließende Entspannungsmassage (15 Min.)"
        ]
      },
      {
        name: "For the Gents",
        details: [
          "Gesicht",
          "Rücken",
          "Brust",
          "Arme",
          "Abschließende Entspannungsmassage (15 Min.)"
        ]
      },
      {
        name: "Waxing & Relaxation Beine",
        details: [
          "Beine komplett, Oberschenkel oder Unterschenkel",
          "Füße und Zehen",
          "Abschließende Entspannungsmassage (15 Min.)"
        ]
      }
    ]
  },
  {
    title: "Kosmetik Behandlungen",
    icon: Flower2,
    description: "Exklusive Gesichtsbehandlungen für strahlende Haut, neue Frische und wohltuende Entspannung.",
    items: [
      {
        name: "Glow Relax – Basisbehandlung",
        details: [
          "Gründliche Gesichtsreinigung",
          "Sanftes Peeling",
          "Bedampfen der Haut",
          "Verwöhnende Gesichtsmaske",
          "Abschließende Pflege"
        ]
      },
      {
        name: "Beauty Balance – Intensivbehandlung (75 Min.)",
        details: [
          "Gründliche Gesichtsreinigung",
          "Peeling",
          "Bedampfen",
          "Individuell abgestimmte Gesichtsmaske",
          "Augenbrauen zupfen und färben",
          "Wimpern färben",
          "Serum",
          "Gesichtstoner",
          "Gesichts- und Dekolletémassage",
          "Vliesmaske und Abschlusspflege"
        ]
      },
      {
        name: "Timeless Beauty – Anti-Aging-Behandlung (80 Min.)",
        details: [
          "Gründliche Gesichtsreinigung",
          "Peeling",
          "Bedampfen",
          "Verwöhnende Gesichtsmaske",
          "Augenbrauen zupfen und färben",
          "Wimpern färben",
          "Hyaluronsäure-Serum",
          "Gesichtstoner",
          "Gesichts- und Dekolletémassage",
          "Vliesmaske und Abschlusspflege"
        ]
      },
      {
        name: "Wellness-Extra",
        details: [
          "Fuß- und Handmassage (30 €)"
        ]
      }
    ]
  },
  {
    title: "Männerkosmetik",
    icon: User,
    description: "Psst! Männersache.\nPflege, Frische und Entspannung – eine Auszeit für den modernen Mann.",
    note: "Alle Kosmetikbehandlungen finden nach vorheriger Terminvereinbarung statt.\nBuche deinen persönlichen Verwöhntermin ganz einfach telefonisch oder per WhatsApp. Wir freuen uns auf dich! ❤️",
    items: [
      {
        name: "Männersache – Business Grooming",
        details: [
          "Gründliche Gesichtsreinigung",
          "Enzympeeling",
          "Vitalisierende Gesichts- und Kopfhautmassage",
          "Feuchtigkeitsspendende Tuchmaske",
          "Wohltuende Augenpflege",
          "Mattierende Abschlusspflege"
        ]
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "Sehr professionelle Fußpflege, angenehme Atmosphäre und tolle Ergebnisse.",
    author: "Maria S."
  },
  {
    id: 2,
    text: "Das Head Spa war unglaublich entspannend – ich komme definitiv wieder.",
    author: "Thomas K."
  },
  {
    id: 3,
    text: "Sauber, freundlich und kompetent. Absolute Empfehlung!",
    author: "Sabine L."
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "Wie läuft eine medizinische Fußpflege ab?",
    answer: "Nach einer kurzen Analyse behandeln wir Nägel, Hornhaut und Problemstellen schonend und hygienisch."
  },
  {
    question: "Ist die Behandlung schmerzhaft?",
    answer: "Nein – wir arbeiten präzise, sanft und mit viel Erfahrung."
  },
  {
    question: "Wie lange dauert ein Termin?",
    answer: "Je nach Behandlung 30–60 Minuten."
  },
  {
    question: "Was ist das Shazay Head Spa Ritual?",
    answer: `Das SHAZAY Head Spa Ritual ist eine exklusive Wellnessanwendung zur Tiefenentspannung für Haare, Kopfhaut und Seele. Es kombiniert tiefenwirksame Reinigung, intensive Pflege und wohltuende Massagen.

VOR DER BEHANDLUNG (Vorbereitung):
• Kleidung: Tragen Sie bequeme Kleidung, um das Ritual vollkommen entspannt genießen zu können.
• Haare: Sie können gerne mit ungewaschenem Haar kommen, da das Ritual immer mit einer sanften Reinigung beginnt. Bitte informieren Sie uns vorab, falls Sie eine Haarverlängerung tragen.
• Make-up & Schmuck: Verzichten Sie nach Möglichkeit auf starkes Make-up und großen Schmuck, um den vollen Genuss der Kopf- und Gesichtsmassage zu ermöglichen.
• Zeitliche Planung: Bitte kommen Sie etwa 15 Minuten vor Beginn Ihres Rituals an, um in Ruhe anzukommen.
• Digital Detox: Wir laden Sie ein, die Zeit ganz für sich zu nutzen. Bitte schalten Sie Ihr Handy während des Rituals aus.
• Gesundheit: Teilen Sie uns bitte vorab eventuelle Allergien, Duftempfindlichkeiten oder besondere Bedürfnisse mit.

WÄHREND DES RITUALS (Was Sie erwartet):
• Eine tiefenentspannende Kopfhaut- und Haarbehandlung, die individuell auf Ihre Bedürfnisse abgestimmt wird.
• Sanfte Reinigung und Peeling der Kopfhaut zur Entfernung von Ablagerungen.
• Wohltuende Massagen von Kopf, Nacken und Gesicht zur Lösung von Verspannungen und Förderung der Durchblutung.
• Intensive Pflege mit hochwertigen SHAZAY-Produkten für gesundes, glänzendes Haar.

NACH DER BEHANDLUNG (Aftercare & Ausklang):
• Styling: Nach der Behandlung stehen Haartrockner und Stylingprodukte für Ihr persönliches Finish bereit.
• Nachspüren: Gönnen Sie sich im Anschluss noch etwas Zeit zum Entspannen.
• Exklusivität: Das SHAZAY Ritual ist eine tiefgreifende Erfahrung. Wir empfehlen, keine stressigen Termine direkt im Anschluss zu planen, um die entspannende Wirkung lange nachklingen zu lassen.`
  },
  {
    question: "Kann ich kurzfristig absagen?",
    answer: "Bitte informieren Sie uns mindestens 24 Stunden vorher."
  }
];

export const CONTACT_INFO = {
  address: "Zeithstrasse 111, 53819 Neunkirchen-Seelscheid",
  phone: "+49 1525 5892182",
  email: "info@sh-pflegeoase.de",
  hours: [
    { day: "Mo–Fr", time: "9-18 Uhr" },
    { day: "Sa", time: "Nach Vereinbarung" }
  ]
};