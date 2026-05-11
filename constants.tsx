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
  Gift,
  Crown,
  Car
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
    title: "Fußpflege nach medizinischer Art",
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
    title: "Fußpflege nach medizinischer Art",
    icon: Stethoscope,
    items: [
      { 
        name: "Problemzonen Pflege",
        details: [
          "Behebung der Nagelprobleme",
          "Ölfußbad",
          "Fußpflege",
          "Abschlusspflege mit lindernden Lotion"
        ]
      },
      { 
        name: "Problemzonen Pflege meets entspannende",
        details: [
          "Fußmassage",
          "Fußpflege nach medizinischer Art",
          "Beheben von Problemzonen",
          "15min Aromatherapie Fußmassage",
          "sprudelndes Fußbad",
          "Abschlusspflege mit heilender Salbe."
        ]
      },
      { 
        name: "Füße im Fokus: Die Spangentechnik",
        details: [
          "Fußpflege",
          "beseitigen der Nagelprobleme",
          "Ölfußbad",
          "setzen und anpassen der Spangen (55€ pro Spange)",
          "Abschlusspflege mit regenerierende Creme."
        ]
      }
    ]
  },
  {
    title: "Kosmetische Fusspflege",
    icon: Sparkles,
    items: [
      {
        name: "Fußpflege",
        details: [
          "Fußwaschung",
          "Nägel schneiden und feilen"
        ]
      },
      {
        name: "Fußpflege meets Lack",
        details: [
          "Fußpflege",
          "Fußwaschung",
          "Nagellack",
          "Abschlusspflege mit Lotion"
        ]
      },
      {
        name: "Füße zum Verlieben: Pflege und farbiger Shellac",
        details: [
          "Fußpflege",
          "Fusswellnessbad",
          "Shellac",
          "Abschlusspflege mit einer heilsamen Balsam"
        ]
      }
    ]
  },
  {
    title: "Wellness Fußpflege",
    icon: Footprints,
    items: [
      {
        name: "Wellness Fußbehandlung",
        description: "Vitalisierende Fußpflege für Wohlbefinden und Gesundheit",
        details: [
          "Fußwellness",
          "klassische Fußpflege",
          "Fußbad",
          "Peeling",
          "Abschlusspflege."
        ]
      },
      {
        name: "Classic Behandlung",
        details: [
          "klassisch Fußpflege",
          "Fußwaschung",
          "Dampfpeeling",
          "Abschlusspflege",
          "Aromatherapie Massage 15 min"
        ]
      },
      {
        name: "Jelly Spa Wellness Behandlung",
        details: [
          "klassische Fußpflege",
          "Fußbad",
          "Jellyspa Peeling",
          "Nagellack",
          "Abschlusspflege mit beruhigend Creme",
          "entspanntes Aromatherapie Massage 20 min."
        ]
      }
    ]
  },
  {
    title: "V.I.P Platinum Fußpflege",
    icon: Crown,
    disableExpand: true,
    items: [
      {
        name: "V.I.P Platinum Behandlung",
        details: [
          "klassische Fußpflege",
          "heilendes Kräuterbad",
          "Dampf Peeling",
          "Dampf Fußmaske",
          "Nagellack/Klarlack",
          "Nagelölpflege mit Moringa",
          "Nagelpolitur",
          "Abschlusspflege",
          "erholsame Aromatherapie Massage 30 min"
        ]
      }
    ]
  },
  {
    title: "Shazay Head Spa Ritual",
    icon: Droplets,
    items: [
      { name: "Classic Head Spa (45 Min)" },
      { name: "Premium Head Spa (60 Min)" },
      { name: "Deluxe Head Spa (90 Min)" },
    ]
  },
  {
    title: "Kombi-Pakete",
    icon: Gift,
    items: [
      { name: "Fußpflege + Head Spa Classic" },
      { name: "Wellness Fußpflege + Head Spa Premium" },
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
    description: "Waxing ist eine Methode der Haarentfernung, bei der Körperhaare mithilfe von warmem oder kaltem Wachs samt Haarwurzel aus der Haut entfernt werden.",
    icon: Sparkles,
    items: [
      {
        name: "For the Ladies",
        description: "Waxing & Relaxation Body",
        details: [
          "Gesicht",
          "Beine",
          "Füße mit Zehen",
          "Finalmassage 15 min."
        ]
      },
      {
        name: "Waxing & Relaxation Bikini",
        details: [
          "Bikini Line oder",
          "Bikini Cut/American Style oder",
          "Landing Strip/French Style oder",
          "Brazilian mit Muster oder",
          "Full Brazilian/Hollywood Style",
          "mit Pofalte",
          "Abschlussmassage 15 min."
        ]
      },
      {
        name: "For the Gents",
        description: "Waxing & Relaxation Body",
        details: [
          "Gesicht",
          "Rücken",
          "Brust",
          "Arme",
          "Finalmassage 15 min."
        ]
      },
      {
        name: "Waxing & Relaxation Beine",
        details: [
          "Beine komplett",
          "Oberschenkel & Unterschenkel",
          "Füße mit Zehen",
          "Abschlussmassage 15 min"
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