'use client';

import SolarModal from '@/components/SolarModal';
import Header from '@/components/Header';
import FAQ from '@/components/FAQ';
import Gallery from '@/components/Gallery';
import HowWeWork from '@/components/HowWeWork';
import Cotizador from '@/components/Cotizador';
import Services from '@/components/Services';
import { Sun, Battery, Zap, Leaf, Shield, TrendingDown, CheckCircle, Star, ArrowRight, Bot, Wrench, ShieldCheck, Award, BadgeCheck, Globe, Smartphone, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function Home() {

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="relative overflow-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-6 shadow-sm">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent w-full animate-shine z-0"></div>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse relative z-10"></span>
                <span className="relative z-10">Tarifas CFE 2026 Actualizadas</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Congela tu tarifa de luz y ahorra hasta un <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">95%</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Únete a las miles de familias mexicanas que ya no se preocupan por el recibo de la CFE. Cotiza en segundos con nuestra inteligencia artificial.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <a href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-medium text-base transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 group">
                  Cotizar ahorro solar
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#como-funciona" className="w-full sm:w-auto px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 rounded-xl font-medium text-base transition-all flex items-center justify-center shadow-sm">
                  ¿Cómo funciona?
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Solo las mejores marcas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Sin anticipos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Trámite CFE incluido</span>
                </div>
        
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              className="relative lg:h-[540px] h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60"
              initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.05 }}
              animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
            >
              <Image 
                src="https://i.postimg.cc/13kmMFfR/hero-image-renergy.jpg" 
                alt="Renergy Hero Image" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
              
              {/* Floating Trust Badge */}
              <motion.div 
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 flex items-center gap-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1, type: 'spring', stiffness: 100 }}
              >
                <div className="flex -space-x-3">
                  {[
                    "https://i.postimg.cc/jSzm0nMS/avatar-1.jpg",
                    "https://i.postimg.cc/6pnJWm5k/avatar-2.jpg",
                    "https://i.postimg.cc/BbbfJZXV/avatar-3.jpg"
                  ].map((imgUrl, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                       <Image src={imgUrl} alt="Cliente" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-emerald-500 mb-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">+1,000 familias ahorrando</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Badges */}
      <motion.section 
        className="py-12 bg-slate-50 border-y border-slate-200 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative z-10 w-full">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-8">
            Componentes de calidad mundial certificados por
          </p>
          <div className="relative flex overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex w-max animate-marquee-ltr hover:[animation-play-state:paused] py-2">
              {/* First Half */}
              <div className="flex gap-16 pr-16 items-center">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-16 items-center">
                    <div className="flex items-center justify-center bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm hover:border-emerald-300 transition-colors cursor-default shrink-0 h-28 w-56">
                      <Image src="https://i.postimg.cc/SKxxSfBD/logo-tier-1.webp" alt="Tier 1" width={180} height={80} className="object-contain h-full w-full" />
                    </div>
                    <div className="flex items-center justify-center bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm hover:border-emerald-300 transition-colors cursor-default shrink-0 h-28 w-56">
                      <Image src="https://i.postimg.cc/Bnsvy0MZ/logo-fide-certified.webp" alt="FIDE" width={180} height={80} className="object-contain h-full w-full" />
                    </div>
                    <div className="flex items-center justify-center bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm hover:border-emerald-300 transition-colors cursor-default shrink-0 h-28 w-56">
                      <Image src="https://i.postimg.cc/L4168XbQ/logo-ance.webp" alt="ANCE" width={180} height={80} className="object-contain h-full w-full" />
                    </div>
                    <div className="flex items-center justify-center bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm hover:border-emerald-300 transition-colors cursor-default shrink-0 h-28 w-56">
                      <Image src="https://i.postimg.cc/3RP8Z5df/logo-ul-certified.webp" alt="UL Certified" width={180} height={80} className="object-contain h-full w-full" />
                    </div>
                  </div>
                ))}
              </div>
              {/* Second Half */}
              <div className="flex gap-16 pr-16 items-center">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-16 items-center">
                    <div className="flex items-center justify-center bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm hover:border-emerald-300 transition-colors cursor-default shrink-0 h-28 w-56">
                      <Image src="https://i.postimg.cc/SKxxSfBD/logo-tier-1.webp" alt="Tier 1" width={180} height={80} className="object-contain h-full w-full" />
                    </div>
                    <div className="flex items-center justify-center bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm hover:border-emerald-300 transition-colors cursor-default shrink-0 h-28 w-56">
                      <Image src="https://i.postimg.cc/Bnsvy0MZ/logo-fide-certified.webp" alt="FIDE" width={180} height={80} className="object-contain h-full w-full" />
                    </div>
                    <div className="flex items-center justify-center bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm hover:border-emerald-300 transition-colors cursor-default shrink-0 h-28 w-56">
                      <Image src="https://i.postimg.cc/L4168XbQ/logo-ance.webp" alt="ANCE" width={180} height={80} className="object-contain h-full w-full" />
                    </div>
                    <div className="flex items-center justify-center bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm hover:border-emerald-300 transition-colors cursor-default shrink-0 h-28 w-56">
                      <Image src="https://i.postimg.cc/3RP8Z5df/logo-ul-certified.webp" alt="UL Certified" width={180} height={80} className="object-contain h-full w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <Services />

      {/* Benefits Section - Bento Grid */}
      <section id="beneficios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              ¿Por qué cambiarte a energía solar hoy?
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Las tarifas eléctricas suben en promedio 7% cada año. Producir tu propia energía es la inversión más segura y rentable para tu hogar.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto] md:auto-rows-[320px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            
            {/* Card 1: Retorno Rápido (Spans 2 columns) */}
            <motion.div 
              className="md:col-span-2 relative rounded-2xl overflow-hidden group min-h-[320px] border border-slate-200 shadow-sm"
              variants={{
                hidden: { opacity: 0, rotateX: -40, y: 50, transformPerspective: 1000 },
                visible: { opacity: 1, rotateX: 0, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
            >
              <Image
                src="https://i.postimg.cc/YCbtsmvL/elite-solar-beneficios.jpg"
                alt="Paneles solares en techo"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-5 shadow-sm">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h3 className="text-[24px] font-bold mb-2 text-white tracking-tight">Retorno Rápido</h3>
                <p className="text-slate-200 text-[16px] max-w-md leading-relaxed">
                  Recupera tu inversión en un promedio de 3 a 4 años. Después de eso, disfrutarás de energía prácticamente gratis por más de 20 años.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Garantía (Square, Dark/Green) */}
            <motion.div 
              className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group min-h-[320px] shadow-sm"
              variants={{
                hidden: { opacity: 0, rotateX: -40, y: 50, transformPerspective: 1000 },
                visible: { opacity: 1, rotateX: 0, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl transition-all duration-500 group-hover:bg-emerald-500/30"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-slate-800 border border-slate-700 text-emerald-400 rounded-xl flex items-center justify-center mb-5">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-[24px] font-bold mb-2 text-white tracking-tight">Garantía de 25 Años</h3>
              </div>
              <p className="text-slate-400 text-[16px] leading-relaxed relative z-10">
                Instalamos paneles Tier 1 de máxima calidad que garantizan un rendimiento óptimo durante décadas, respaldados por garantías reales.
              </p>
            </motion.div>

            {/* Card 3: Plusvalía (Square, Green Gradient) */}
            <motion.div 
              className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm min-h-[320px]"
              variants={{
                hidden: { opacity: 0, rotateX: -40, y: 50, transformPerspective: 1000 },
                visible: { opacity: 1, rotateX: 0, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center mb-5 border border-white/30">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="text-[24px] font-bold mb-2 text-white tracking-tight">Plusvalía Inmediata</h3>
              </div>
              <p className="text-emerald-50 text-[16px] relative z-10 leading-relaxed font-medium">
                Una casa con paneles solares aumenta su valor en el mercado inmobiliario hasta un 4%. Es una mejora que se paga sola desde el primer día.
              </p>
            </motion.div>

            {/* Card 4: Congela Tarifa (Spans 2 columns) */}
            <motion.div 
              className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-emerald-300 transition-colors shadow-sm min-h-[320px]"
              variants={{
                hidden: { opacity: 0, rotateX: -40, y: 50, transformPerspective: 1000 },
                visible: { opacity: 1, rotateX: 0, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
            >
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Protección contra inflación
                </div>
                <h3 className="text-[24px] font-bold mb-3 text-slate-900 tracking-tight">Congela tu Tarifa Eléctrica</h3>
                <p className="text-slate-600 text-[16px] leading-relaxed">
                  Mientras las tarifas de la red pública aumentan año con año, con tu propio sistema solar aseguras el costo de tu energía por las próximas décadas, protegiendo tu economía.
                </p>
              </div>
              <div className="w-full md:w-2/5 h-48 md:h-full bg-slate-50 rounded-xl relative overflow-hidden border border-slate-100 flex items-end justify-center p-6">
                {/* Abstract Chart Mockup */}
                <div className="flex items-end gap-2 w-full h-full opacity-80 pt-8">
                  <div className="w-full bg-emerald-200 rounded-t-md h-[30%] group-hover:h-[40%] transition-all duration-500"></div>
                  <div className="w-full bg-emerald-300 rounded-t-md h-[50%] group-hover:h-[60%] transition-all duration-500 delay-75"></div>
                  <div className="w-full bg-emerald-400 rounded-t-md h-[70%] group-hover:h-[80%] transition-all duration-500 delay-100"></div>
                  <div className="w-full bg-emerald-500 rounded-t-md h-[100%] group-hover:h-[95%] transition-all duration-500 delay-150 relative">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">Hoy</div>
                  </div>
                  <div className="w-full bg-emerald-400 rounded-t-md h-[80%] group-hover:h-[70%] transition-all duration-500 delay-200"></div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <Cotizador />

      {/* How it Works - Stepper Design */}
      <section id="como-funciona" className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Un proceso simple y sin fricciones</h2>
            <p className="text-base text-slate-600">Nosotros nos encargamos de todo el papeleo y la instalación pesada. Tú solo disfruta del ahorro.</p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[2px] bg-slate-200 z-0"></div>

            <motion.div 
              className="relative z-10 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 50, skewY: 5 },
                visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Bot className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">1. Cotiza con IA</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Chatea con nuestra asesora virtual, dale el monto de tu recibo y obtén un cálculo exacto en segundos.</p>
            </motion.div>

            <motion.div 
              className="relative z-10 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 50, skewY: 5 },
                visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Wrench className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">2. Instalación Experta</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Nuestros ingenieros certificados instalan tu sistema en 1 o 2 días, sin ensuciar ni dañar tu propiedad.</p>
            </motion.div>

            <motion.div 
              className="relative z-10 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 50, skewY: 5 },
                visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Zap className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">3. Enciende el Ahorro</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Gestionamos el medidor bidireccional con CFE. A partir de ese momento, tu recibo llegará en el mínimo.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <HowWeWork />

      <Gallery />

      {/* Testimonials */}
      <motion.section 
        id="testimonios" 
        className="py-24 bg-white border-t border-slate-200"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Historias Reales de Ahorro</h2>
            <p className="text-base text-slate-600">No tomes solo nuestra palabra. Escucha a quienes ya dieron el paso.</p>
          </div>

          <div className="relative flex overflow-hidden w-full py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {/* First Half */}
              <div className="flex gap-6 pr-6">
                {[
                  { name: "Carlos M.", location: "Monterrey, NL", text: "Pagaba $4,500 de luz cada bimestre por los minisplits. Con Elite Solar ahora me llegan $54 pesos. La mejor inversión que he hecho para mi casa.", savings: "$4,446" },
                  { name: "Ana P.", location: "Mérida, YUC", text: "Tenía miedo del trámite con CFE pero ellos se encargaron de absolutamente todo. La instalación fue súper limpia y rápida. 100% recomendados.", savings: "$3,200" },
                  { name: "Roberto G.", location: "Guadalajara, JAL", text: "Coticé con 3 empresas diferentes y la atención de Elite Solar fue superior desde el día 1. El cálculo que me dio la IA fue exacto a lo que instalaron.", savings: "$5,800" }
                ].map((testimonial, i) => (
                  <div key={i} className="w-[350px] md:w-[400px] shrink-0 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative flex flex-col justify-between hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-300 group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 text-emerald-500 mb-4">
                        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed mb-6">&quot;{testimonial.text}&quot;</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto relative z-10">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                        <p className="text-xs text-slate-500">{testimonial.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Ahorro Bimestral</p>
                        <p className="font-bold text-emerald-600 text-sm group-hover:scale-110 origin-right transition-transform duration-300">{testimonial.savings}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Second Half */}
              <div className="flex gap-6 pr-6">
                {[
                  { name: "Carlos M.", location: "Monterrey, NL", text: "Pagaba $4,500 de luz cada bimestre por los minisplits. Con Elite Solar ahora me llegan $54 pesos. La mejor inversión que he hecho para mi casa.", savings: "$4,446" },
                  { name: "Ana P.", location: "Mérida, YUC", text: "Tenía miedo del trámite con CFE pero ellos se encargaron de absolutamente todo. La instalación fue súper limpia y rápida. 100% recomendados.", savings: "$3,200" },
                  { name: "Roberto G.", location: "Guadalajara, JAL", text: "Coticé con 3 empresas diferentes y la atención de Elite Solar fue superior desde el día 1. El cálculo que me dio la IA fue exacto a lo que instalaron.", savings: "$5,800" }
                ].map((testimonial, i) => (
                  <div key={i} className="w-[350px] md:w-[400px] shrink-0 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative flex flex-col justify-between hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-300 group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 text-emerald-500 mb-4">
                        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed mb-6">&quot;{testimonial.text}&quot;</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto relative z-10">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                        <p className="text-xs text-slate-500">{testimonial.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Ahorro Bimestral</p>
                        <p className="font-bold text-emerald-600 text-sm group-hover:scale-110 origin-right transition-transform duration-300">{testimonial.savings}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <FAQ />

      {/* Final CTA */}
      <motion.section 
        className="py-24 bg-slate-900 relative overflow-hidden"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-emerald-500/10 to-transparent blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">¿Listo para dejar de pagar luz cara?</h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">Habla con nuestra IA ahora mismo y descubre tu potencial de ahorro en menos de 60 segundos. Sin compromisos.</p>
          <a href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer" className="inline-flex px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-medium text-lg transition-all shadow-lg shadow-emerald-500/20 items-center justify-center gap-2 mx-auto group border border-emerald-500/50">
            <Bot className="w-5 h-5" />
            Cotizar ahora
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-white text-slate-600 py-12 border-t border-slate-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-56 h-16 md:w-72 md:h-20">
                <Image 
                  src="https://i.postimg.cc/bwFyc87p/renergy-logotipo.webp" 
                  alt="Renergy" 
                  fill 
                  className="object-contain object-left" 
                />
              </div>
            </div>
            <p className="text-sm max-w-sm leading-relaxed">Transformando la manera en que México consume energía. Soluciones solares inteligentes, accesibles y de máxima calidad.</p>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-4 text-sm">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#beneficios" className="hover:text-emerald-600 transition-colors">Beneficios</a></li>
              <li><a href="#como-funciona" className="hover:text-emerald-600 transition-colors">Proceso</a></li>
              <li><a href="#testimonios" className="hover:text-emerald-600 transition-colors">Casos de Éxito</a></li>
              <li><a href="#faq" className="hover:text-emerald-600 transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-4 text-sm">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li>hola@elitesolar.mx</li>
              <li>800 123 4567</li>
              <li>Monterrey, Nuevo León, México</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-100 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center text-slate-500">
          <p>© {new Date().getFullYear()} Elite Solar. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-900 transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </motion.footer>

      <SolarModal />
    </main>
  );
}
