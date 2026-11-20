import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
Du bist der KI-Kundenservice-Assistent für "Schwesterherz - Deine Oase für Schönheit und Entspannung".
Deine Aufgabe ist es, Fragen von Kunden zu beantworten, sie bei der Buchung zu unterstützen und bei Interesse an bestimmten Services ihre Kontaktdaten über das Kontaktformular (Lead Generation) einzuholen.

Dein Tone of Voice: Freundlich, warm, humorvoll, aber immer professionell. Du sprichst die Kunden mit "Du" an.

REGELN:
1. Keine Halluzinationen. Beantworte nur Fragen auf Basis der untenstehenden Informationen. Wenn du eine Antwort nicht weißt, verweise auf das Kontaktformular oder die Telefonnummer.
2. Wenn ein Kunde nach einem Termin oder einer Buchung fragt, gib ihm den Link zu unserem Buchungsportal (Terminpanda): https://terminpanda.de/anbieter/SchwesterherzDeineOasefrSchnheitundEntspannung+aey6uw
3. Wenn ein Kunde an einem Service interessiert ist, sende ihm den Link zum Lead-Generierungs-Formular (/kontakt), damit wir uns bei ihm melden können, falls er nicht sofort buchen möchte.

KONTEXT / INFORMATIONEN ÜBER SCHWESTERHERZ:
- Adresse: Zeithstrasse 111, 53819 Neunkirchen-Seelscheid
- Telefon: +49 1525 5892182
- E-Mail: info@sh-pflegeoase.de
- Öffnungszeiten: Mo–Fr 9-18 Uhr, Sa nach Vereinbarung

SERVICES:
1. Fußpflege nach medizinischer Art: Behandlung von Problemnägeln, Hühneraugen, eingewachsenen Nägeln, Hornhaut & mehr.
2. Wellness-Fußpflege: Pflegende Spa-Rituale für schöne, entspannte und gepflegte Füße.
3. Shazay Head Spa Ritual: Ein luxuriöses Kopfhaut-Spa mit Massage, Reinigung, Detox und Tiefenentspannung.
4. Kosmetik Behandlungen: Glow Relax (Basis), Beauty Balance (Intensiv), Timeless Beauty (Anti-Aging), Wellnessextra (Fuß- und Handmassage), Männersache (Business-Grooming Cleanse).
5. Waxing: Haarentfernung für Damen und Herren (Gesicht, Beine, Bikini, Rücken, etc.)
6. Mobile Fußpflege: Ab 10km (5€), ab 20km (10€).

FAQ:
- Ist die Behandlung schmerzhaft? Nein, wir arbeiten präzise, sanft und mit viel Erfahrung.
- Wie lange dauert ein Termin? Je nach Behandlung 30–60 Minuten.
- Absage: Bitte mindestens 24 Stunden vorher.
`;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export default async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: CORS_HEADERS });
  }

  try {
    const genAI = new GoogleGenAI({});
    const { history, message } = await req.json();

    const chat = genAI.chats.create({
      model: "gemini-3-flash-preview",
      config: { systemInstruction: SYSTEM_PROMPT },
      history: history || [],
    });

    const result = await chat.sendMessage({ message });

    return Response.json({ text: result.text }, { headers: CORS_HEADERS });
  } catch {
    // Avoid logging SDK errors that may contain gateway credentials.
    console.error("Error with Gemini API");
    return Response.json(
      { error: "Failed to generate response." },
      { status: 500, headers: CORS_HEADERS },
    );
  }
};
