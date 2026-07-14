export interface SolarSettings {
  panelWattage: number;
  panelPrice: number;
  cfePrice: number;
}

export interface SolarCalculationResult {
  raw: {
    kWhBimestral: number;
    kWhDiario: number;
    numeroPaneles: number;
    inversionTotal: number;
    ahorroAnual: number;
    añosRetorno: number;
  };
  formatted: {
    numeroPaneles: string;
    inversionTotal: string;
    ahorroAnual: string;
    añosRetorno: string;
  };
}

/**
 * Calcula el dimensionamiento y retorno de inversión de un sistema de paneles solares.
 * 
 * @param gastoBimestralPesos - El gasto actual del prospecto en su recibo de luz (bimestral).
 * @param settings - Configuración global proveniente de la base de datos (Supabase).
 * @returns Objeto con los valores crudos (para la BD) y formateados (para la UI).
 */
export function calculateSolarSystem(
  gastoBimestralPesos: number,
  settings: SolarSettings
): SolarCalculationResult {
  const { panelWattage, panelPrice, cfePrice } = settings;

  // 1. Calcula kWhBimestral como gastoBimestralPesos / cfePrice.
  const kWhBimestral = gastoBimestralPesos / cfePrice;

  // 2. Calcula kWhDiario como kWhBimestral / 60.
  const kWhDiario = kWhBimestral / 60;

  // 3. Calcula numeroPaneles usando la fórmula: 
  // Math.ceil( kWhDiario / (5 * 0.8 * (panelWattage / 1000) ) )
  // Nota: 5 son las horas de sol pico y 0.8 el factor de eficiencia.
  const numeroPaneles = Math.ceil(kWhDiario / (5 * 0.8 * (panelWattage / 1000)));

  // 4. Calcula inversionTotal sumando el costo de los paneles más un 20% de gastos de instalación.
  const costoPaneles = numeroPaneles * panelPrice;
  const inversionTotal = costoPaneles * 1; // +20% de instalación

  // 5. Calcula añosRetorno dividiendo la inversionTotal entre el ahorro anual estimado.
  // El ahorro anual es el gasto bimestral multiplicado por los 6 bimestres del año.
  const ahorroAnual = gastoBimestralPesos * 6;
  const añosRetorno = inversionTotal / ahorroAnual;

  // 6. Devuelve un objeto con todos estos valores formateados para ser mostrados en el frontend
  return {
    raw: {
      kWhBimestral,
      kWhDiario,
      numeroPaneles,
      inversionTotal,
      ahorroAnual,
      añosRetorno,
    },
    formatted: {
      numeroPaneles: `${numeroPaneles} Paneles`,
      inversionTotal: new Intl.NumberFormat('es-MX', { 
        style: 'currency', 
        currency: 'MXN',
        maximumFractionDigits: 0 
      }).format(inversionTotal),
      ahorroAnual: new Intl.NumberFormat('es-MX', { 
        style: 'currency', 
        currency: 'MXN',
        maximumFractionDigits: 0 
      }).format(ahorroAnual),
      añosRetorno: `${añosRetorno.toFixed(1)} años`,
    }
  };
}
