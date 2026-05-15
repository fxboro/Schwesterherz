import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

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
4. Waxing: Haarentfernung für Damen und Herren (Gesicht, Beine, Bikini, Rücken, etc.)
5. Mobile Fußpflege: Ab 10km (5€), ab 20km (10€).

FAQ:
- Ist die Behandlung schmerzhaft? Nein, wir arbeiten präzise, sanft und mit viel Erfahrung.
- Wie lange dauert ein Termin? Je nach Behandlung 30–60 Minuten.
- Absage: Bitte mindestens 24 Stunden vorher.
`;

export const handler = async (event: any, context: any) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gemini API key is missing." }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { history, message } = body; // history is an array of { role: 'user' | 'model', parts: [{ text: string }] }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ text: responseText }),
    };
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate response." }),
    };
  }
};
