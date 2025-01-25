"use client";
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";
import { client } from "@/sanity/lib/sanity"; // Importing the Sanity client
import { Product } from "@/types/product"; // Importing the Product type

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleFilterChange = (newFilteredProducts: Product[]) => {
    setFilteredProducts(newFilteredProducts);
  };

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"] {
        _id,
        name,
        price,
        salePrice,
        description,
        "image": image.asset->url,
        "images": images[].asset->url,
        features {
          highlights,
          specifications {
            dimensions,
            weight,
            material,
            color,
            warranty,
            inStock,
            stockCount
          }
        }
      }`;

      try {
        const data = await client.fetch(query);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
            totalProducts={filteredProducts.length} 
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
