'use client';

import { useState } from 'react';
import { Ruler, FileText, HardHat, Activity } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    id: '01',
    title: 'Análisis e Ingeniería a la Medida',
    description: 'No hacemos cálculos al tanteo. Nuestros ingenieros evalúan la estructura de tu techo, la radiación solar de tu zona y tu historial de consumo para diseñar un sistema milimétrico que maximice tu ahorro.',
    icon: Ruler,
  },
  {
    id: '02',
    title: 'Gestión de Permisos (Cero Burocracia)',
    description: 'Olvídate de las filas. Nuestro equipo administrativo se encarga del 100% de los trámites ante CFE, incluyendo el contrato de interconexión y el cambio a medidor bidireccional.',
    icon: FileText,
  },
  {
    id: '03',
    title: 'Instalación Premium y Estética',
    description: 'Utilizamos herrajes de aluminio anodizado (resistentes a huracanes) y ocultamos el cableado lo más posible. Tu casa no solo ahorrará energía, también se verá increíble.',
    icon: HardHat,
  },
  {
    id: '04',
    title: 'Activación y Monitoreo 24/7',
    description: 'Encendemos el sistema contigo, configuramos la app en tu celular y nuestro centro de control monitorea tus paneles todos los días para asegurar que produzcan al 100%.',
    icon: Activity,
  }
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState<string>('01');

  return (
    <section className="py-24 bg-white border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Sticky Header & Intro */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
              Nuestra Metodología
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
              Cómo trabajamos para garantizar tu inversión
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Instalar paneles solares es un proyecto de ingeniería que vivirá en tu techo por más de 25 años. Por eso, hemos perfeccionado un proceso riguroso que prioriza la seguridad, la estética y el máximo rendimiento.
            </p>
            
            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-700 font-bold text-lg">100%</span>
              </div>
              <p className="text-sm font-medium text-slate-700">
                De nuestros proyectos son ejecutados por ingenieros y técnicos certificados, nunca por contratistas externos.
              </p>
            </div>
          </div>

          {/* Right Column: Vertical Timeline */}
          <div className="relative">
            {/* Continuous Vertical Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-slate-100"></div>

            <div className="space-y-12">
              {steps.map((step) => {
                const isActive = activeStep === step.id;
                
                return (
                  <motion.div 
                    key={step.id} 
                    className="relative pl-16 group"
                    onViewportEnter={() => setActiveStep(step.id)}
                    viewport={{ once: false, margin: "-20% 0px -20% 0px", amount: 0.3 }}
                  >
                    {/* Timeline Node */}
                    <div 
                      className={`absolute left-0 top-1 w-14 h-14 border-4 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                        isActive 
                          ? 'bg-white border-emerald-50 shadow-md' 
                          : 'bg-white border-slate-50 shadow-sm'
                      }`}
                    >
                      <div className={`transition-colors duration-500 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div 
                      className={`p-6 rounded-2xl border transition-all duration-500 ${
                        isActive 
                          ? 'bg-emerald-50/50 border-emerald-200 shadow-lg shadow-emerald-100/50' 
                          : 'bg-white border-slate-100 shadow-sm'
                      }`}
                    >
                      <div className="flex items-baseline gap-3 mb-3">
                        <span 
                          className={`text-2xl font-black transition-colors duration-500 ${
                            isActive ? 'text-emerald-200' : 'text-slate-200'
                          }`}
                        >
                          {step.id}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
