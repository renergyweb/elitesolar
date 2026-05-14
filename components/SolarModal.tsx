'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Copy, Sun, Bot, User } from 'lucide-react';
import Image from 'next/image';

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

const ModelMessage = ({ text, onUpdate }: { text: string; onUpdate: () => void }) => {
  const [visibleCount, setVisibleCount] = useState(1);
  const parts = text.split('[typing]');
  const partsLength = parts.length;
  const isTyping = partsLength > visibleCount;

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setVisibleCount((v) => v + 1);
        onUpdate();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isTyping, visibleCount, onUpdate]);

  if (!text) {
    return (
      <div className="flex justify-start w-full">
        <div className="flex gap-2 max-w-[85%] md:max-w-[75%]">
          <div className="px-5 py-4 rounded-2xl bg-white border border-slate-100 rounded-tl-none shadow-sm flex items-center gap-1.5">
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  const visibleParts = parts.slice(0, visibleCount);

  return (
    <div className="space-y-4 w-full">
      {visibleParts.map((part, index) => {
        const trimmed = part.trim();
        if (!trimmed) return null;
        return (
          <div key={index} className="flex justify-start">
            <div className="flex gap-2 max-w-[85%] md:max-w-[75%]">
              <div className="px-5 py-3.5 rounded-2xl bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm">
                <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{trimmed}</p>
              </div>
            </div>
          </div>
        );
      })}
      {isTyping && (
        <div className="flex justify-start">
          <div className="flex gap-2 max-w-[85%] md:max-w-[75%]">
            <div className="px-5 py-4 rounded-2xl bg-white border border-slate-100 rounded-tl-none shadow-sm flex items-center gap-1.5">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function SolarModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<{role: string, text: string}[]>([]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-solar-modal', handleOpen);
    return () => window.removeEventListener('open-solar-modal', handleOpen);
  }, []);

  const systemInstruction = `Eres Alejandra, una asesora solar amigable y experta de Elite Solar en México. Tu objetivo es ayudar a la gente a dejar de pagarle tanto dinero a la CFE.

Tono de comunicación:
- Habla de forma natural, como si estuvieras platicando por WhatsApp.
- Usa un lenguaje cercano ("tú"), evita ser demasiado formal o sonar como un bot de soporte técnico.
- Puedes usar expresiones comunes pero profesionales como "Oye", "Fíjate que", "Está súper bien".

Reglas de Oro:
1. Empatía primero: Si el recibo es alto, reconoce que es un dolor de cabeza pagarle tanto dinero a la CFE.
2. No satures: No avientes toda la info de golpe. Ve paso a paso.
3. Cálculos rápidos (para tu uso interno):
   - Cada $500 MXN de recibo = 1 panel.
   - Inversión = $12,000 MXN por panel.
   - Ahorro = 95%.
   - Recuperación = 3 a 4 años.

Flujo de la charla:
- Saluda breve: "¡Hola! Qué gusto saludarte. Soy Alejandra de Elite Solar. Pra darte una idea de cuánto podrías ahorrar, ¿en cuánto te llega más o menos tu recibo de CFE?"
- Cuando den el monto: Reacciona de forma humana y profesional y luego da la solución: "Mira, para ese consumo necesitarías unos [X] paneles. La inversión anda sobre los $[X], pero básicamente se pagan solitos con lo que te vas a ahorrar en 3 años".
- Cierre: Pregúntales si quieren que les mandes el resumen por aquí o si prefieren agendar una vuelta rápida para revisar su techo.

REGLA DE FORMATO CRÍTICA:
- No respondas con párrafos largos.
- Divide tu respuesta en 2 a 3 partes cortas (maximo 40 palabras por parte) para que parezcan mensajes de WhatsApp independientes.
- Usa el separador "[typing]" entre cada parte.
- Ejemplo: "¡Hola! ¿Cómo estás? [typing] Oye, fíjate que revisé tu caso... [typing] ¿Te parece si agendamos?"`;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleInitialGreeting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleInitialGreeting = () => {
    setIsLoading(true);
    setTimeout(() => {
      const initialText = "¡Hola! Qué gusto saludarte. Soy Alejandra de Elite Solar. [typing] Para darte una idea de cuánto podrías ahorrar, ¿en cuánto te llega más o menos tu recibo de CFE?";
      const aiMessageId = Date.now().toString();
      setMessages([{ id: aiMessageId, role: 'model', text: initialText }]);
      
      historyRef.current = [
        { role: 'user', text: 'Hola, me gustaría una cotización.' },
        { role: 'model', text: initialText }
      ];
      setIsLoading(false);
    }, 2000);
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
    e?.preventDefault();
    const userText = textOverride || input.trim();
    if (!userText || isLoading) return;

    if (!textOverride) setInput('');
    const userMessageId = Date.now().toString();
    
    setMessages((prev) => [...prev, { id: userMessageId, role: 'user', text: userText }]);
    
    const userMsg = { role: 'user', text: userText };
    historyRef.current.push(userMsg);
    
    setIsLoading(true);

    try {
      const formattedMessages = historyRef.current.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: formattedMessages,
          systemInstruction
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error en la respuesta del servidor');
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No se pudo inicializar el lector de respuesta');

      let fullText = '';
      const aiMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: aiMessageId, role: 'model', text: '' }]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === aiMessageId ? { ...msg, text: fullText } : msg
          )
        );
      }
      
      historyRef.current.push({ role: 'model', text: fullText });
      
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'model', text: 'Lo siento, hubo un error al procesar tu mensaje. ¿Podrías intentar de nuevo?' }]);
      historyRef.current.pop();
    } finally {
      setIsLoading(false);
    }
  };

  const copySummary = () => {
    const chatText = messages.map(m => {
      const text = m.role === 'model' ? m.text.replace(/\[typing\]/g, '\n\n') : m.text;
      return `${m.role === 'user' ? 'Tú' : 'Asesor'}: ${text}`;
    }).join('\n\n');
    navigator.clipboard.writeText(chatText);
    alert('¡Resumen copiado al portapapeles!');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl p-1 shadow-2xl transition-transform hover:scale-105 items-center justify-center z-40 group border border-emerald-400/30"
      >
        <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-inner group-hover:rotate-3 transition-transform">
          <Image src="https://i.postimg.cc/PfMpjyF5/avatar-elite-solar.jpg" alt="Asesora Solar" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#F8FAFC]"
          >
            {/* Header / Top Section */}
            <div className="relative pt-12 pb-8 flex flex-col items-center justify-center shrink-0 z-10 bg-gradient-to-b from-white to-[#F8FAFC]">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-3 bg-white shadow-sm border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-all hover:scale-105"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-20 rounded-full"></div>
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4">
                  <Image src="https://i.postimg.cc/PfMpjyF5/avatar-elite-solar.jpg" alt="Alejandra - Asesora Solar" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute bottom-4 right-0 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
              </div>
              <h2 className="font-bold text-2xl md:text-3xl text-slate-900 tracking-tight mb-1">Alejandra</h2>
              <p className="text-emerald-600 font-medium text-sm md:text-base">Asesora Solar Experta</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-32 space-y-6 max-w-3xl mx-auto w-full scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 transition-colors">
              {messages.map((msg) => {
                if (msg.role === 'model') {
                  return <ModelMessage key={msg.id} text={msg.text} onUpdate={scrollToBottom} />;
                }
                return (
                  <div key={msg.id} className="flex justify-end w-full">
                    <div className="flex gap-2 max-w-[85%] md:max-w-[75%] flex-row-reverse">
                      <div className="px-5 py-3.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-tr-none shadow-md">
                        <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start w-full">
                  <div className="flex gap-2 max-w-[85%] md:max-w-[75%]">
                    <div className="px-5 py-4 rounded-2xl bg-white border border-slate-100 rounded-tl-none shadow-sm flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent pointer-events-none">
              <div className="max-w-3xl mx-auto w-full pointer-events-auto">
                <form onSubmit={handleSend} className="relative flex items-center bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-full p-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje aquí..."
                    className="flex-1 bg-transparent px-6 py-3 outline-none text-slate-700 placeholder:text-slate-400 text-[15px]"
                    disabled={isLoading}
                  />
                  <div className="flex items-center gap-2 pr-1">
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </form>
                <div className="flex justify-center mt-4">
                  <button 
                    onClick={copySummary}
                    className="text-xs text-slate-400 hover:text-emerald-600 flex items-center gap-1.5 transition-colors bg-white/50 px-4 py-2 rounded-full border border-slate-200/50"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copiar resumen de la cotización
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
