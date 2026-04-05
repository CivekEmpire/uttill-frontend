// Calcular metros cuadrados necesarios basado en área
export function calculateBoxesNeeded(
  areaM2: number,
  coveragePerBox: number
): {
  boxes: number;
  totalM2: number;
  waste: number;
} {
  const boxes = Math.ceil(areaM2 / coveragePerBox);
  const totalM2 = boxes * coveragePerBox;
  const waste = ((totalM2 - areaM2) / totalM2) * 100;

  return {
    boxes,
    totalM2,
    waste: parseFloat(waste.toFixed(2)),
  };
}

// Convertir pies cuadrados a metros cuadrados
export function sqFtToM2(sqFt: number): number {
  return parseFloat((sqFt * 0.092903).toFixed(2));
}

// Convertir metros cuadrados a pies cuadrados
export function m2ToSqFt(m2: number): number {
  return parseFloat((m2 / 0.092903).toFixed(2));
}

// Coverage por producto (según Doc #26)
export const PRODUCT_COVERAGE = {
  SPC: 2.58, // m² por caja
  LAMINADO: 2.40, // m² por caja
  PIEDRA_OPACA: 0.5, // m² por panel
  PIEDRA_TRANSLUCIDA: 0.5, // m² por panel
} as const;
