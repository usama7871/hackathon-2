//src/app/shop/[productId]/page.tsx
"use client";

import ProductDetails from "@/components/Shop/ProductDetails";
import Slides from "@/components/Home/Slides";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { products } from "@/data/products";
import { Product, ProductDetailsProps } from "@/types/product";

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchProduct = async () => {
      try {
        const foundProduct = products.find(p => p.id === params.productId);
        if (foundProduct) {
          const enhancedProduct: ProductDetailsProps = {
            ...foundProduct,
            images: foundProduct.images || [foundProduct.image],
            imageUrl: foundProduct.image,
            colors: foundProduct.features?.specifications.color || [],
            ratings: foundProduct.features?.rating || 0,
            features: {
              highlights: foundProduct.features?.highlights || [],
              specifications: {
                dimensions: foundProduct.features?.specifications.dimensions || '',
                weight: foundProduct.features?.specifications.weight || '',
                material: foundProduct.features?.specifications.material || '',
                color: foundProduct.features?.specifications.color || [],
                warranty: foundProduct.features?.specifications.warranty || '',
                inStock: foundProduct.features?.specifications.inStock || true,
              },
              rating: foundProduct.features?.rating || 0,
              reviewCount: foundProduct.features?.reviewCount || 0,
              category: foundProduct.features?.category || '',
              tags: foundProduct.features?.tags || [],
              brand: foundProduct.features?.brand || '',
              sku: foundProduct.features?.sku || `SKU-${foundProduct.id}`,
              manufacturingDate: foundProduct.features?.manufacturingDate || new Date().toISOString().split('T')[0],
            },
            isNew: foundProduct.isNew || false,
            isBestSeller: foundProduct.isBestSeller || false,
            shippingInfo: foundProduct.shippingInfo || {
              freeShipping: foundProduct.price > 1000000,
              estimatedDays: 3,
              shippingCost: foundProduct.price > 1000000 ? 0 : 50000,
            },
          };
          setProduct(enhancedProduct);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.productId]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductDetails {...product} />
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">You May Also Like</h2>
          <Slides />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;