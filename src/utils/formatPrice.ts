export const formatPrice = {
  toRupiah: (price: number | string): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numericPrice || 0);
  },
  parsePrice: (priceString: string): number => {
    return parseInt(priceString.replace(/[Rp.,\s]/g, ''), 10) || 0;
  },
  toNumber: (price: number | string): number => {
    if (typeof price === 'number') return price;
    return formatPrice.parsePrice(price);
  }
}; 