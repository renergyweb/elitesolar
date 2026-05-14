import jsPDF from 'jspdf';
import { SolarCalculationResult } from './calculator';

export interface ExactParams {
  exactPanels: number;
  exactInvestment: number;
  exactSavings: number;
  panelBrand: string;
  inverterBrand: string;
  roofType: string;
  hasShadows: boolean;
}

export async function generateQuotePDF(prospect: any, calc: SolarCalculationResult, exactParams?: ExactParams): Promise<Blob> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Use exact params if provided
  const finalPanels = exactParams ? exactParams.exactPanels : calc.raw.numeroPaneles;
  const finalInvestment = exactParams ? exactParams.exactInvestment : calc.raw.inversionTotal;
  const finalSavings = exactParams ? exactParams.exactSavings : calc.raw.ahorroAnual;
  const finalROI = finalInvestment / finalSavings;
  
  const formattedPanels = `${finalPanels} Paneles`;
  const formattedInvestment = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(finalInvestment);
  const formattedSavings = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(finalSavings);
  const formattedROI = `${finalROI.toFixed(1)} años`;
  
  // Colors
  const primaryColor: [number, number, number] = [5, 150, 105]; // emerald-600
  const darkColor: [number, number, number] = [15, 23, 42]; // slate-900
  const grayColor: [number, number, number] = [100, 116, 139]; // slate-500
  const lightGrayColor: [number, number, number] = [241, 245, 249]; // slate-100
  
  // Header Background
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, 210, 40, 'F');
  
  // Header Text
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text("ELITE SOLAR", 20, 25);
  
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text("Cotización de Sistema Fotovoltaico", 190, 25, { align: "right" });
  
  // Prospect Info Section
  pdf.setTextColor(...darkColor);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Datos del Cliente", 20, 60);
  
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...grayColor);
  pdf.text(`Nombre: ${prospect.name || 'Cliente'}`, 20, 70);
  pdf.text(`Teléfono: ${prospect.phone || 'N/A'}`, 20, 78);
  pdf.text(`Ubicación: ${prospect.city || 'N/A'}`, 20, 86);
  
  const dateStr = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  pdf.text(`Fecha: ${dateStr}`, 190, 70, { align: "right" });
  
  // System Details Section
  pdf.setTextColor(...darkColor);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Propuesta del Sistema", 20, 110);
  
  // Box for System Details
  pdf.setFillColor(...lightGrayColor);
  const boxHeight = exactParams ? 120 : 60;
  pdf.rect(20, 115, 170, boxHeight, 'F');
  
  pdf.setFontSize(12);
  pdf.text("Tamaño del Sistema Sugerido:", 25, 130);
  pdf.setFont("helvetica", "normal");
  pdf.text(formattedPanels, 100, 130);
  
  pdf.setFont("helvetica", "bold");
  pdf.text("Inversión Total Estimada:", 25, 145);
  pdf.setFont("helvetica", "normal");
  pdf.text(formattedInvestment, 100, 145);
  
  pdf.setFont("helvetica", "bold");
  pdf.text("Ahorro Anual Estimado:", 25, 160);
  pdf.setFont("helvetica", "normal");
  pdf.text(formattedSavings, 100, 160);
  
  if (exactParams) {
    pdf.setFont("helvetica", "bold");
    pdf.text("Marca de Paneles:", 25, 175);
    pdf.setFont("helvetica", "normal");
    pdf.text(exactParams.panelBrand, 100, 175);
    
    pdf.setFont("helvetica", "bold");
    pdf.text("Marca de Inversor:", 25, 190);
    pdf.setFont("helvetica", "normal");
    pdf.text(exactParams.inverterBrand, 100, 190);

    pdf.setFont("helvetica", "bold");
    pdf.text("Tipo de Techo:", 25, 205);
    pdf.setFont("helvetica", "normal");
    pdf.text(exactParams.roofType === 'losa' ? 'Losa de Concreto' : 'Lámina', 100, 205);

    pdf.setFont("helvetica", "bold");
    pdf.text("Sombras en el Techo:", 25, 220);
    pdf.setFont("helvetica", "normal");
    pdf.text(exactParams.hasShadows ? 'Sí' : 'No', 100, 220);
  }
  
  // ROI Section
  const roiY = exactParams ? 260 : 200;
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Retorno de Inversión: ${formattedROI}`, 105, roiY, { align: "center" });
  
  // Footer
  pdf.setTextColor(...grayColor);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text("Elite Solar - Transformando la energía de México", 105, 280, { align: "center" });
  pdf.text("Esta es una cotización estimada y está sujeta a una visita técnica.", 105, 285, { align: "center" });
  
  return pdf.output('blob');
}
