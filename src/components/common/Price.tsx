"use client";
import { useState, useEffect } from 'react';
import { formatPrice } from '@/utils/formatPrice';

interface PriceProps {
  amount: number | string;
  className?: string;
}

export default function Price({ amount, className = '' }: PriceProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <span className={className}>
      {formatPrice.toRupiah(amount)}
    </span>
  );
} 