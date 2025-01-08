"use client";
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { Loader2 } from "lucide-react";
import { products } from '@/data/products';
// import ShopIcons from '@/components/ShopIcons';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-[#B88E2F]" />
  </div>
);

// Dynamic imports with loading states
const ShopHero = dynamic(() => import("@/components/Shop/ShopHero"), {
  loading: () => <LoadingSpinner />
});


const ShopBlowHero = dynamic(() => import("@/components/Shop/ShopBlowHero"), {
  loading: () => <LoadingSpinner />
});

const ShopIcons = dynamic(() => import("@/components/Shop/ShopIcons"), {
  loading: () => <LoadingSpinner />
});

const Products = dynamic(() => import("@/components/Shop/Products"), {
  loading: () => <LoadingSpinner />
});


export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (newFilteredProducts: any[]) => {
    setFilteredProducts(newFilteredProducts);
  };

  return (
    <main className="w-full">
      <Suspense fallback={<LoadingSpinner />}>
        <div className="container mx-auto max-w-[1440px] px-4">
          <ShopHero />
          <div className="section-spacing" />
          <ShopBlowHero 
            onFilterChange={handleFilterChange} 
            totalProducts={products.length} 
          />          
          <div className="section-spacing" />
          <Products products={filteredProducts} />          
        </div>
        <ShopIcons/>        
      </Suspense>
    </main>
  );
}