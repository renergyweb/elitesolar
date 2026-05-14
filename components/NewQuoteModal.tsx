'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Zap, 
  Home, 
  Factory, 
  Sun, 
  Cloud, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  DollarSign, 
  Battery, 
  TrendingDown,
  Activity,
  Loader2,
  FileText,
  MessageCircle,
  Edit2,
  Save
} from 'lucide-react';
import { calculateSolarSystem } from '@/lib/calculator';
import { generateQuotePDF } from '@/lib/pdfGenerator';
import { supabase } from '@/lib/supabase';

interface NewQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospect: any;
  onSuccess?: () => void;
}

// Configuraciones base (luego vendrán de la BD)
const settings = {
  panelWattage: 550,
  panelPrice: 11500,
  cfePrice: 2.5,
};

export default function NewQuoteModal({ isOpen, onClose, prospect, onSuccess }: NewQuoteModalProps) {
  const [step, setStep] = useState(1);
  const [gasto, setGasto] = useState<number>(3500);
  const [roofType, setRoofType] = useState<'losa' | 'lamina'>('losa');
  const [hasShadows, setHasShadows] = useState(false);
  
  const [exactPanels, setExactPanels] = useState<number>(0);
  const [exactInvestment, setExactInvestment] = useState<number>(0);
  const [panelBrand, setPanelBrand] = useState<string>('Canadian Solar 550W');
  const [inverterBrand, setInverterBrand] = useState<string>('Growatt');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [tempPanels, setTempPanels] = useState<number>(0);
  const [tempInvestment, setTempInvestment] = useState<number>(0);
  const [tempPanelBrand, setTempPanelBrand] = useState<string>('');
  const [tempInverterBrand, setTempInverterBrand] = useState<string>('');

  useEffect(() => {
    if (isOpen && prospect) {
      setGasto(prospect.bimonthly_bill || 3500);
      setStep(1);
      setPdfUrl(null);
      setWhatsappLink(null);
      setIsEditing(false);
    }
  }, [isOpen, prospect]);

  const handleEditClick = () => {
    setTempPanels(exactPanels);
    setTempInvestment(exactInvestment);
    setTempPanelBrand(panelBrand);
    setTempInverterBrand(inverterBrand);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setExactPanels(tempPanels);
    setExactInvestment(tempInvestment);
    setPanelBrand(tempPanelBrand);
    setInverterBrand(tempInverterBrand);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const calc = useMemo(() => calculateSolarSystem(gasto, settings), [gasto]);

  const exactSavings = useMemo(() => {
    if (!exactPanels || exactPanels <= 0) return 0;
    // 5 horas de sol * 0.8 eficiencia * kW del panel
    const dailyGen = exactPanels * 5 * 0.8 * (settings.panelWattage / 1000);
    // 60 días por bimestre * 6 bimestres = 360 días
    const annualGen = dailyGen * 360;
    const savings = annualGen * settings.cfePrice;
    // El ahorro no puede ser mayor que el gasto anual actual
    return Math.min(calc.raw.ahorroAnual, savings);
  }, [exactPanels, calc.raw.ahorroAnual]);

  const formattedExactSavings = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(exactSavings);

  const exactROI = exactSavings > 0 ? (exactInvestment / exactSavings).toFixed(1) : '0.0';

  // Sync exact values with calculated values initially
  useEffect(() => {
    setExactPanels(calc.raw.numeroPaneles);
    setExactInvestment(calc.raw.inversionTotal);
  }, [calc]);

  if (!isOpen) return null;

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleGenerate = async () => {
    if (!prospect) return;
    
    setIsGenerating(true);
    try {
      // 1. Generar PDF
      const exactParams = {
        exactPanels,
        exactInvestment,
        exactSavings,
        panelBrand,
        inverterBrand,
        roofType,
        hasShadows
      };
      const pdfBlob = await generateQuotePDF(prospect, calc, exactParams);
      
      // 2. Subir a Supabase Storage
      await supabase.storage.createBucket('quotations', { public: true }).catch(() => {});
      
      const fileName = `${prospect.id}_${Date.now()}.pdf`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('quotations')
        .upload(fileName, pdfBlob, { contentType: 'application/pdf' });
        
      if (uploadError) {
        alert('No se pudo subir el PDF. Verifica que el bucket "quotations" exista en Supabase.');
        throw uploadError;
      }
      
      // 3. Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('quotations')
        .getPublicUrl(fileName);
        
      // 4. Guardar en la tabla quotes
      const finalSavings = exactSavings;
      const finalROI = exactSavings > 0 ? exactInvestment / exactSavings : 0;

      const { error: dbError } = await supabase.from('quotes').insert({
        prospect_id: prospect.id,
        num_panels: exactPanels,
        total_investment: exactInvestment,
        estimated_savings: finalSavings,
        pay_back_years: finalROI,
        pdf_url: publicUrl
      });
      
      if (dbError) throw dbError;
      
      // 5. Generar link de WhatsApp
      const phone = prospect.phone ? prospect.phone.replace(/\D/g, '') : '';
      const message = `Hola ${prospect.name || ''}, soy de Elite Solar. Aquí tienes la cotización de tu sistema de paneles solares: ${publicUrl}`;
      const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      
      setPdfUrl(publicUrl);
      setWhatsappLink(waLink);
      setStep(4); // Paso de éxito
      
      if (onSuccess) onSuccess();
      
    } catch (error: any) {
      alert(`Hubo un error al generar la cotización: ${error.message || 'Por favor, intenta de nuevo.'}\n\nVerifica que las tablas y buckets existan en Supabase.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Nueva Cotización</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full -z-10"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 rounded-full -z-10 transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300 border-2 
                  ${step >= i 
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                    : 'bg-white border-slate-200 text-slate-400'}`}
              >
                {step > i ? <Check className="w-5 h-5" /> : i}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-slate-500">
            <span>Energía</span>
            <span>Instalación</span>
            <span>Resumen</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 min-h-[320px] overflow-hidden relative">
          <AnimatePresence mode="wait">
            {/* STEP 1: Energía */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">¿Cuánto paga de luz al bimestre?</h3>
                  <p className="text-sm text-slate-500">Ajusta el monto para calcular el sistema ideal.</p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute left-4 text-2xl text-slate-400 font-medium">$</span>
                    <input
                      type="number"
                      value={gasto}
                      onChange={(e) => setGasto(Number(e.target.value))}
                      className="text-4xl font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-10 pr-6 w-64 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <input
                    type="range"
                    min="500"
                    max="20000"
                    step="100"
                    value={gasto}
                    onChange={(e) => setGasto(Number(e.target.value))}
                    className="w-full max-w-md h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between max-w-md mx-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-emerald-900">Sistema Sugerido</p>
                      <p className="text-xs text-emerald-700">Basado en {settings.panelWattage}W</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-700">{calc.formatted.numeroPaneles}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Instalación */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">Detalles de Instalación</h3>
                  <p className="text-sm text-slate-500">Selecciona el tipo de techo y condiciones del lugar.</p>
                </div>

                <div className="space-y-6 max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setRoofType('losa')}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        roofType === 'losa' 
                          ? 'border-emerald-500 bg-emerald-50 shadow-sm' 
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Home className={`w-6 h-6 mb-3 ${roofType === 'losa' ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <h4 className={`font-semibold ${roofType === 'losa' ? 'text-emerald-900' : 'text-slate-700'}`}>Losa de Concreto</h4>
                      <p className={`text-xs mt-1 ${roofType === 'losa' ? 'text-emerald-700' : 'text-slate-500'}`}>Instalación estándar plana</p>
                      {roofType === 'losa' && <Check className="absolute top-4 right-4 w-5 h-5 text-emerald-500" />}
                    </button>

                    <button
                      onClick={() => setRoofType('lamina')}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        roofType === 'lamina' 
                          ? 'border-emerald-500 bg-emerald-50 shadow-sm' 
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Factory className={`w-6 h-6 mb-3 ${roofType === 'lamina' ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <h4 className={`font-semibold ${roofType === 'lamina' ? 'text-emerald-900' : 'text-slate-700'}`}>Techo de Lámina</h4>
                      <p className={`text-xs mt-1 ${roofType === 'lamina' ? 'text-emerald-700' : 'text-slate-500'}`}>Requiere estructura coplanar</p>
                      {roofType === 'lamina' && <Check className="absolute top-4 right-4 w-5 h-5 text-emerald-500" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hasShadows ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                        <Cloud className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">¿Hay sombras en el techo?</h4>
                        <p className="text-xs text-slate-500">Árboles, tinacos o edificios cercanos</p>
                      </div>
                    </div>
                    
                    {/* Toggle Switch */}
                    <button 
                      onClick={() => setHasShadows(!hasShadows)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${hasShadows ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${hasShadows ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Resumen y Ajustes */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-slate-900">Ajustes Finales</h3>
                    <p className="text-sm text-slate-500">Personaliza la cotización exacta para el cliente.</p>
                  </div>
                  {!isEditing ? (
                    <button 
                      onClick={handleEditClick} 
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" /> Editar
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={handleCancelClick} 
                        className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={handleSaveClick} 
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        <Save className="w-4 h-4" /> Guardar
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Número de Paneles</label>
                    <input 
                      type="number" 
                      value={isEditing ? tempPanels : exactPanels} 
                      onChange={(e) => setTempPanels(Number(e.target.value))}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg outline-none transition-colors ${isEditing ? 'border-emerald-500 focus:ring-2 focus:ring-emerald-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-500'}`}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Inversión Total ($)</label>
                    <input 
                      type="number" 
                      value={isEditing ? tempInvestment : exactInvestment} 
                      onChange={(e) => setTempInvestment(Number(e.target.value))}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg outline-none transition-colors ${isEditing ? 'border-emerald-500 focus:ring-2 focus:ring-emerald-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-500'}`}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Marca de Paneles</label>
                    <input 
                      type="text" 
                      value={isEditing ? tempPanelBrand : panelBrand} 
                      onChange={(e) => setTempPanelBrand(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg outline-none transition-colors ${isEditing ? 'border-emerald-500 focus:ring-2 focus:ring-emerald-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-500'}`}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Marca de Inversor</label>
                    <input 
                      type="text" 
                      value={isEditing ? tempInverterBrand : inverterBrand} 
                      onChange={(e) => setTempInverterBrand(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg outline-none transition-colors ${isEditing ? 'border-emerald-500 focus:ring-2 focus:ring-emerald-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-500'}`}
                    />
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-500">Ahorro Anual Estimado:</span>
                    <span className="font-semibold text-emerald-600">{formattedExactSavings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Retorno de Inversión (ROI):</span>
                    <span className="font-semibold text-blue-600">{exactROI} años</span>
                  </div>
                </div>
              </motion.div>
            )}
            {/* STEP 4: Éxito */}
            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-8"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">¡Cotización Generada!</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  El documento PDF ha sido creado y guardado exitosamente.
                </p>
                
                <div className="flex flex-col gap-3 max-w-xs mx-auto mt-8">
                  {pdfUrl && (
                    <a 
                      href={pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      Ver PDF
                    </a>
                  )}
                  {whatsappLink && (
                    <a 
                      href={whatsappLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-medium rounded-xl hover:bg-[#20bd5a] transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Compartir en WhatsApp
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-2xl">
          {step < 4 ? (
            <>
              <button
                onClick={handlePrev}
                disabled={step === 1 || isGenerating}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  step === 1 || isGenerating ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Atrás
              </button>

              {step < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || isEditing}
                  className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generando...
                    </>
                  ) : isEditing ? (
                    <>Guarda los cambios primero</>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Generar Cotización
                    </>
                  )}
                </button>
              )}
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 transition-colors"
            >
              Cerrar
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
