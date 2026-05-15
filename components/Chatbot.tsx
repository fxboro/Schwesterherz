import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: 'Hallo! 👋 Ich bin die digitale Assistentin von Schwesterherz. Wie kann ich dir heute helfen?' }]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', parts: [{ text: userMessage }] }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Netlify function endpoint
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages.map(m => ({ role: m.role, parts: m.parts })),
          message: userMessage,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages([
          ...newMessages,
          { role: 'model', parts: [{ text: data.text }] }
        ]);
      } else {
        throw new Error(data.error || 'Failed to fetch response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        { role: 'model', parts: [{ text: 'Entschuldigung, es gab ein technisches Problem. Bitte versuche es später noch einmal oder nutze unser Kontaktformular.' }] }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const parseLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-brand-300 underline font-semibold">{part}</a>;
      }
      // If it contains /kontakt or /kunden-erfassungsbogen route texts, map them
      if (part.includes('/kontakt') || part.includes('/kunden-erfassungsbogen')) {
         const routeRegex = /(\/[a-zA-Z0-9-]+)/g;
         return part.split(routeRegex).map((subPart, j) => {
             if (subPart.match(routeRegex)) {
                return <Link key={`l-${j}`} to={subPart} className="text-brand-300 underline font-semibold">{subPart}</Link>
             }
             return subPart;
         });
      }
      return part;
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col border border-brand-100"
          >
            {/* Header */}
            <div className="bg-brand-900 text-white p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center">
                  <Sparkles size={16} className="text-brand-200" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-50">Schwesterherz KI</h3>
                  <p className="text-xs text-brand-200/80">Online & bereit zu helfen</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-200 hover:text-white transition-colors"
                aria-label="Chat schließen"
              >
                <X size={24} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-brand-900 text-white rounded-tr-sm'
                        : 'bg-white text-stone-800 border border-brand-100 rounded-tl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {parseLinks(msg.parts[0].text)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white text-stone-800 border border-brand-100 rounded-tl-sm shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-brand-600" />
                    <span className="text-sm text-stone-500">Tippt...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-brand-100 shrink-0">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Schreibe eine Nachricht..."
                  className="flex-1 bg-stone-100 text-stone-800 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 pr-12"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center bg-brand-900 text-white rounded-full hover:bg-brand-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[10px] text-stone-400">KI generierte Antworten können Fehler enthalten.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB to open chat */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-20 bg-brand-900 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-40 flex items-center justify-center border-2 border-brand-800/50"
        aria-label="KI Chat öffnen"
      >
        {isOpen ? <X size={28} /> : <Sparkles size={28} />}
      </motion.button>
    </>
  );
};

export default Chatbot;
