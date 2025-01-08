"use client";
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { Loader2 } from "lucide-react";
import { products } from '@/data/products';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-[#B88E2F]" />
  </div>
);

// Dynamic imports with loading states
const Hero = dynamic(() => import("@/components/Home/Hero"), {
  loading: () => <LoadingSpinner />
});

const Subhero = dynamic(() => import("@/components/Home/Subhero"), {
  loading: () => <LoadingSpinner />
});

const ImageGallery = dynamic(() => import("@/components/Home/ImageGallery"), {
  loading: () => <LoadingSpinner />
});

const Slides = dynamic(() => import("@/components/Home/Slides"), {
  loading: () => <LoadingSpinner />
});

const FeaturedCollection = dynamic(() => import("@/components/Home/FeaturedCollection"), {
  loading: () => <LoadingSpinner />
});

const ShopBlowHero = dynamic(() => import("@/components/Shop/ShopBlowHero"), {
  loading: () => <LoadingSpinner />
});

const Products = dynamic(() => import("@/components/Shop/Products"), {
  loading: () => <LoadingSpinner />
});

const TestimonialCarousel = dynamic(() => import("@/components/Home/TestimonialCarousel"), {
  loading: () => <LoadingSpinner />
});

const CategoryShowcase = dynamic(() => import("@/components/Home/CategoryShowcase"), {
  loading: () => <LoadingSpinner />
});

const NewsletterSignup = dynamic(() => import("@/components/common/NewsletterSignup"), {
  loading: () => <LoadingSpinner />
});

export default function HomePage() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (newFilteredProducts: any[]) => {
    setFilteredProducts(newFilteredProducts);
  };

  return (
    <main className="w-full">
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        <div className="section-spacing" />
        <Subhero />
        <div className="section-spacing" />
        <FeaturedCollection />
        <div className="container mx-auto max-w-[1440px] px-4">
          <ShopBlowHero 
            onFilterChange={handleFilterChange} 
            totalProducts={products.length} 
          />
          <div className="section-spacing" />
          <Products products={filteredProducts} />
        </div>
        <div className="section-spacing" />
        <ImageGallery />
        <div className="section-spacing" />
        <CategoryShowcase />
        <div className="section-spacing" />
        <Slides />
        <div className="section-spacing" />
        <TestimonialCarousel />
        <div className="section-spacing" />
        <NewsletterSignup />
      </Suspense>
    </main>
  );
}