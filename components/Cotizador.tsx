'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Calculator, Send, Zap, Sun, MapPin, Activity, Building, Home, Factory, UploadCloud, FileText } from 'lucide-react';
import { motion } from 'motion/react';

const zonas = {
  Norte: { hsp: 5.5, tarifa: 2.2 },
  Centro: { hsp: 5.0, tarifa: 2.5 },
  Sur: { hsp: 4.5, tarifa: 2.8 },
};

const panelesConfig = {
  'Jinko 635W (Casa/Negocio 220v)': { watts: 635, costo: 11500 },
  'Jinko 555W (Casa/Negocio 110v)': { watts: 555, costo: 10500 },
  'Jinko 730W (Industrial)': { watts: 730, costo: 13500 },
};

export default function Cotizador() {
  const [gasto, setGasto] = useState(3000);
  const [zona, setZona] = useState('Centro');
  const [tipoPanel, setTipoPanel] = useState('Jinko 635W (Casa/Negocio 220v)');
  const [tipoProyecto, setTipoProyecto] = useState('Residencial');
  const [nombre, setNombre] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [correo, setCorreo] = useState('');
  const [recibo, setRecibo] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const resultsRef = useRef<HTMLDivElement>(null);

  const calc = useMemo(() => {
    const z = zonas[zona as keyof typeof zonas];
    const p = panelesConfig[tipoPanel as keyof typeof panelesConfig];

    const kWhBimestral = gasto / z.tarifa;
    const kWhDiario = kWhBimestral / 60;
    const panelesReq = Math.ceil(kWhDiario / (z.hsp * (p.watts / 1000) * 0.8));
    const inversion = panelesReq * p.costo;
    const ahorroAnual = gasto * 6 * 0.95;
    const roi = (inversion / ahorroAnual).toFixed(1);
    const ahorro25 = (ahorroAnual * 25).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

    return {
      paneles: panelesReq,
      inversion,
      roi,
      ahorro25,
      ahorroAnual
    };
  }, [gasto, zona, tipoPanel]);

  const handleCotizar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSuccess(false);

    if (!nombre || !correo || !whatsapp) {
      setErrorMsg('Por favor, completa todos los campos de contacto.');
      return;
    }
    setIsSending(true);
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('correo', correo);
      formData.append('whatsapp', whatsapp);
      formData.append('tipoProyecto', tipoProyecto);
      formData.append('gasto', gasto.toString());
      formData.append('zona', zona);
      formData.append('tipoPanel', tipoPanel);
      formData.append('paneles', calc.paneles.toString());
      formData.append('inversion', calc.inversion.toString());
      formData.append('roi', calc.roi.toString());
      if (recibo) {
        formData.append('recibo', recibo);
      }

      const res = await fetch('/api/send-quote', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error enviando cotización');

      setIsSuccess(true);
      setNombre('');
      setCorreo('');
      setWhatsapp('');
      setRecibo(null);
      
      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      setErrorMsg('Error al enviar la cotización. Por favor, intenta de nuevo.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.section 
      id="cotizador" 
      className="py-24 bg-white border-t border-slate-200"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Calculator className="w-3.5 h-3.5" />
            Cotizador Inteligente
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Calcula tu inversión y ahorro
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Descubre exactamente cuántos paneles necesitas y en cuánto tiempo recuperarás tu inversión. Ajusta los valores para ver tu cotización en tiempo real.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Calculator Inputs & Results */}
          <div className="lg:col-span-7 space-y-8">
            {/* Inputs Card */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                Parámetros del Sistema
              </h3>
              
              <div className="space-y-8">
                {/* Slider Gasto */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="block text-sm font-semibold text-slate-700">
                      Gasto Bimestral (CFE)
                    </label>
                    <span className="text-2xl font-bold text-emerald-600">
                      ${gasto.toLocaleString()} <span className="text-sm font-medium text-slate-500">MXN</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={gasto}
                    onChange={(e) => setGasto(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>$500</span>
                    <span>$50,000+</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Zona Select */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      Zona de México
                    </label>
                    <select
                      value={zona}
                      onChange={(e) => setZona(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
                    >
                      <option value="Norte">Norte (Mayor radiación)</option>
                      <option value="Centro">Centro (Radiación media)</option>
                      <option value="Sur">Sur (Radiación estándar)</option>
                    </select>
                  </div>

                  {/* Tipo de Panel Select */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-slate-400" />
                      Tipo de Panel
                    </label>
                    <select
                      value={tipoPanel}
                      onChange={(e) => setTipoPanel(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
                    >
                      <option value="Jinko 635W (Casa/Negocio 220v)">Jinko 635W (Casa/Negocio 220v)</option>
                      <option value="Jinko 555W (Casa/Negocio 110v)">Jinko 555W (Casa/Negocio 110v)</option>
                      <option value="Jinko 730W (Industrial)">Jinko 730W (Industrial)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Card (used for PDF) */}
            <div ref={resultsRef} className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
              
              <h3 className="text-xl font-bold text-white mb-8 relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                Proyección de tu Sistema Solar
              </h3>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 relative z-10">
                <div className="bg-slate-800/50 p-4 sm:p-5 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                  <p className="text-slate-400 text-xs sm:text-sm font-medium mb-1">Paneles Recomendados</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{calc.paneles} <span className="text-sm md:text-lg font-normal text-slate-500">pzs</span></p>
                </div>
                <div className="bg-slate-800/50 p-4 sm:p-5 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                  <p className="text-slate-400 text-xs sm:text-sm font-medium mb-1">Inversión Estimada</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400">${calc.inversion.toLocaleString()} <span className="text-sm md:text-lg font-normal text-slate-500">MXN</span></p>
                </div>
                <div className="bg-slate-800/50 p-4 sm:p-5 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                  <p className="text-slate-400 text-xs sm:text-sm font-medium mb-1">Retorno de Inversión (ROI)</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{calc.roi} <span className="text-sm md:text-lg font-normal text-slate-500">años</span></p>
                </div>
                <div className="bg-slate-800/50 p-4 sm:p-5 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                  <p className="text-slate-400 text-xs sm:text-sm font-medium mb-1">Ahorro a 25 años</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400">{calc.ahorro25}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700/50 relative z-10">
                <p className="text-xs text-slate-400 text-center">
                  *Los valores mostrados son estimaciones basadas en promedios nacionales. La cotización final puede variar tras una visita técnica.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-lg sticky top-32">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Recibe tu presupuesto</h3>
              <p className="text-sm text-slate-600 mb-6">Completa tus datos para enviarte la cotización detallada a tu correo y WhatsApp.</p>
              
              <form onSubmit={handleCotizar} className="space-y-5">
                {/* Tipo de Proyecto */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Tipo de Proyecto</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setTipoProyecto('Residencial')}
                      className={`py-2 px-3 rounded-xl border text-sm font-medium flex flex-col items-center gap-1 transition-all ${tipoProyecto === 'Residencial' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <Home className="w-4 h-4" />
                      Hogar
                    </button>
                    <button
                      type="button"
                      onClick={() => setTipoProyecto('Comercial')}
                      className={`py-2 px-3 rounded-xl border text-sm font-medium flex flex-col items-center gap-1 transition-all ${tipoProyecto === 'Comercial' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <Building className="w-4 h-4" />
                      Negocio
                    </button>
                    <button
                      type="button"
                      onClick={() => setTipoProyecto('Industrial')}
                      className={`py-2 px-3 rounded-xl border text-sm font-medium flex flex-col items-center gap-1 transition-all ${tipoProyecto === 'Industrial' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <Factory className="w-4 h-4" />
                      Industria
                    </button>
                  </div>
                </div>

                {isMounted ? (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre Completo</label>
                      <div>
                        <input
                          type="text"
                          required
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          placeholder="Ej. Juan Pérez"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                          data-lpignore="true"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">WhatsApp</label>
                      <div>
                        <input
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="Ej. 55 1234 5678"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                          data-lpignore="true"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Correo Electrónico</label>
                      <div>
                        <input
                          type="email"
                          required
                          value={correo}
                          onChange={(e) => setCorreo(e.target.value)}
                          placeholder="tu@correo.com"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                          data-lpignore="true"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-5">
                    <div className="h-20 bg-slate-100 animate-pulse rounded-xl w-full"></div>
                    <div className="h-20 bg-slate-100 animate-pulse rounded-xl w-full"></div>
                    <div className="h-20 bg-slate-100 animate-pulse rounded-xl w-full"></div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Recibo de Luz (Opcional)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) => setRecibo(e.target.files?.[0] || null)}
                      className="hidden"
                      id="recibo-upload"
                    />
                    <label
                      htmlFor="recibo-upload"
                      className="flex items-center justify-center w-full px-4 py-3 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-slate-600 cursor-pointer hover:bg-slate-100 transition-all"
                    >
                      {recibo ? (
                        <span className="flex items-center gap-2 text-emerald-600 font-medium truncate">
                          <FileText className="w-5 h-5 flex-shrink-0" />
                          {recibo.name}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <UploadCloud className="w-5 h-5 text-slate-400" />
                          Sube tu recibo (PDF o Imagen)
                        </span>
                      )}
                    </label>
                  </div>
                </div>

                <div className="pt-2 space-y-4">
                  {errorMsg && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                      {errorMsg}
                    </div>
                  )}
                  
                  {isSuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium flex items-center gap-2">
                      <Zap className="w-5 h-5 text-emerald-600" />
                      ¡Cotización solicitada exitosamente! Nuestro equipo se pondrá en contacto contigo.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending || isSuccess}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-base transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <span className="animate-pulse">Procesando...</span>
                    ) : isSuccess ? (
                      <>
                        <Zap className="w-5 h-5" />
                        ¡Enviado!
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Cotizar Sistema Solar
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
