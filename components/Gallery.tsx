'use client';

import Image from 'next/image';
import { MapPin, Zap, Sun, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const projects = [
  {
    id: 1,
    title: "Carport Solar",
    location: "Monterrey, NL",
    panels: 14,
    savings: "98%",
    image: "https://i.postimg.cc/BbVzdDr1/galeria-paneles-solares-1.jpg",
    className: "md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[624px]" // 624px accounts for 2 rows of 300px + 24px gap
  },
  {
    id: 2,
    title: "Fraccionamiento",
    location: "Mérida, YUC",
    panels: 18,
    savings: "95%",
    image: "https://i.postimg.cc/qMNS2bK9/galeria-paneles-solares-2.jpg",
    className: "md:col-span-2 md:row-span-1 min-h-[300px]"
  },
  {
    id: 3,
    title: "Villa Moderna",
    location: "Guadalajara, JAL",
    panels: 10,
    savings: "100%",
    image: "https://i.postimg.cc/mry5T0xY/galeria-paneles-solares-3.jpg",
    className: "md:col-span-1 md:row-span-1 min-h-[300px]"
  },
  {
    id: 4,
    title: "Residencia Valle",
    location: "CDMX",
    panels: 8,
    savings: "92%",
    image: "https://i.postimg.cc/sXnHh7gy/galeria-paneles-solares-4.jpg",
    className: "md:col-span-1 md:row-span-1 min-h-[300px]"
  }
];

export default function Gallery() {
  return (
    <motion.section 
      className="py-24 bg-white border-t border-slate-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Instalaciones que hablan por sí solas
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Explora algunos de nuestros proyectos recientes. Diseño impecable, ingeniería de precisión y ahorros reales desde el primer día. No solo instalamos paneles, transformamos hogares.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group">
            Ver más proyectos 
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Asymmetric Bento Grid Gallery */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 md:auto-rows-[300px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-slate-100 ${project.className}`}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient overlay for text readability - Always slightly visible, darkens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Content Container */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                {/* Location - Slides down slightly and fades in */}
                <div className="flex items-center gap-2 text-emerald-400 mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium tracking-wide">{project.location}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight transform group-hover:-translate-y-1 transition-transform duration-500">
                  {project.title}
                </h3>

                {/* Data Row - Slides up and fades in */}
                <div className="flex flex-wrap items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-sm font-medium">
                    <Sun className="w-4 h-4 text-amber-400" />
                    {project.panels} Paneles
                  </div>
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600/90 to-teal-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-400/30 text-white text-sm font-medium shadow-sm">
                    <Zap className="w-4 h-4 text-emerald-100" />
                    Ahorro {project.savings}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Mobile only button */}
        <button className="mt-8 w-full md:hidden flex items-center justify-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors bg-emerald-50 py-3 rounded-xl border border-emerald-100">
          Ver más proyectos 
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.section>
  );
}
