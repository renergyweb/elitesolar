'use client';

import { motion } from 'motion/react';
import { Sun, Wrench, FileText, Activity, Home, Building, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Solar Residencial',
    description: 'Sistemas diseñados a la medida para tu hogar. Elimina los altos cobros de la tarifa DAC y aumenta el valor de tu propiedad de forma inmediata.',
    features: ['Paneles Tier 1 de alta eficiencia', 'Monitoreo WiFi 24/7 desde tu celular', 'Garantía de generación por 25 años'],
    gradient: 'from-emerald-600 to-teal-600',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100'
  },
  {
    icon: Building,
    title: 'Comercial e Industrial',
    description: 'Soluciones de alta capacidad para empresas. Reduce tus costos operativos drásticamente y mejora la rentabilidad y sustentabilidad de tu negocio.',
    features: ['Deducibilidad fiscal del 100%', 'Estudio de calidad de energía', 'Retorno de inversión en 1-4 años'],
    gradient: 'from-emerald-600 to-teal-600',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100'
  },
  {
    icon: Wrench,
    title: 'Mantenimiento Especializado',
    description: 'Asegura que tu sistema opere siempre al 100%. Ofrecemos pólizas de mantenimiento preventivo y correctivo para maximizar tu generación.',
    features: ['Limpieza profunda de paneles', 'Revisión térmica de inversores', 'Diagnóstico de cableado y protecciones'],
    gradient: 'from-emerald-600 to-teal-600',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100'
  },
  {
    icon: FileText,
    title: 'Gestión de Trámites CFE',
    description: 'Nos encargamos de toda la burocracia por ti. Realizamos todos los trámites necesarios para que tu sistema esté interconectado legalmente.',
    features: ['Contrato de interconexión', 'Cambio a medidor bidireccional', 'Certificaciones UVIE y UIE'],
    gradient: 'from-emerald-600 to-teal-600',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100'
  }
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-500/5 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Nuestros Servicios
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4"
          >
            Soluciones integrales en energía solar
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed"
          >
            Te acompañamos en cada etapa, desde el diseño inicial hasta el mantenimiento a largo plazo de tu inversión.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2"
            >
              {/* Background Wipe Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0 rounded-3xl`}></div>
              
              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-16 h-16 rounded-2xl ${service.bgColor} border ${service.borderColor} flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/30 transition-colors duration-500 shadow-sm group-hover:shadow-none`}>
                    <service.icon className={`w-8 h-8 ${service.iconColor} group-hover:text-white transition-colors duration-500`} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500">
                    <Zap className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-8 group-hover:text-emerald-50 transition-colors duration-500 flex-grow">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm font-medium text-slate-700 group-hover:text-white/90 transition-colors duration-500">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover:text-white/80 shrink-0 transition-colors duration-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Giant background icon */}
              <div className="absolute -bottom-6 -right-6 p-6 opacity-0 group-hover:opacity-10 transition-all duration-700 transform group-hover:scale-150 group-hover:-rotate-12 pointer-events-none z-0 text-white">
                <service.icon className="w-48 h-48" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
