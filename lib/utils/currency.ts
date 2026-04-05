export function formatCRC(amount: string | number): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
}

export function formatPrice(amount: string, currencyCode: string = 'CRC'): string {
  const numAmount = parseFloat(amount);

  if (currencyCode === 'CRC') {
    return formatCRC(numAmount);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(numAmount);
}
