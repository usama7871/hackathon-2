"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ProductSpecs {
  dimensions: string;
  weight: string;
  material: string;
  color: string[];
  warranty: string;
  inStock: boolean;
  stockCount?: number;
}

interface ProductFeatures {
  highlights: string[];
  specifications: ProductSpecs;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  brand: string;
  sku: string;
  manufacturingDate: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  price: number;
  originalPrice?: number;
  salePrice?: number;
  salePercentage?: number;
  features: ProductFeatures;
  isNew: boolean;
  isBestSeller: boolean;
  availableSizes?: string[];
  availableColors?: string[];
  shippingInfo: {
    freeShipping: boolean;
    estimatedDays: number;
    shippingCost?: number;
  };
}

interface CompareContextType {
  items: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (product: Product) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('compare');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (item: Product) => {
    setCompareItems(current => {
      if (current.length >= 4) {
        alert('You can only compare up to 4 items');
        return current;
      }
      return [...current, item];
    });
  };

  const removeFromCompare = (product: Product) => {
    setCompareItems(current => current.filter(item => item.id !== product.id));
  };

  const isInCompare = (id: string) => {
    return compareItems.some(item => item.id === id);
  };

  const toggleCompare = (item: Product) => {
    if (isInCompare(item.id)) {
      removeFromCompare(item);
    } else {
      addToCompare(item);
    }
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  return (
    <CompareContext.Provider value={{
      items: compareItems,
      addToCompare,
      removeFromCompare,
      clearCompare,
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
} 