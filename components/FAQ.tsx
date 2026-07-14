'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

const faqs = [
  {
    question: "¿Cuánto tiempo tardo en recuperar mi inversión?",
    answer: "En promedio, nuestros clientes recuperan su inversión entre 1 y 4 años, dependiendo si es casa o negocio gracias a los ahorros de hasta 95% en su recibo de CFE. A partir de ahí, la energía es prácticamente gratis por los siguientes 25+ años."
  },
  {
    question: "¿Qué pasa si está nublado o llueve?",
    answer: "Los paneles solares siguen generando energía incluso en días nublados o lluviosos, aunque a una capacidad menor. Además, al estar interconectados con CFE, la red eléctrica compensa cualquier faltante, asegurando que nunca te quedes sin luz."
  },
  {
    question: "¿Tengo que hacer trámites con la CFE?",
    answer: "¡Nosotros nos encargamos de todo! El trámite de interconexión y el cambio a medidor bidireccional están 100% incluidos en tu proyecto. Tú no tienes que dar vueltas."
  },
  {
    question: "¿Cuánto mantenimiento requieren?",
    answer: "Muy poco. Solo necesitan una limpieza básica con agua 2 o 3 veces al año para quitar el polvo y asegurar su máxima eficiencia. No tienen partes móviles que se desgasten."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section 
      id="faq" 
      className="py-24 bg-slate-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Preguntas Frecuentes</h2>
          <p className="text-lg text-slate-600">Resolvemos tus dudas para que des el paso con total seguridad.</p>
        </div>
        <motion.div 
          className="space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-emerald-300 hover:shadow-sm"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between bg-white focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${openIndex === index ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
