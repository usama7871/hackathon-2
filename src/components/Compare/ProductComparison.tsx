"use client";

import { useState } from "react";
import { X, Plus, Share2, ShoppingCart, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductComparisonProps {
  isFullPage?: boolean;
}

export default function ProductComparison({ isFullPage = false }: ProductComparisonProps) {
  const { items: compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const router = useRouter();

  const features = [
    "Price",
    "Sale Price",
    "Category",
    "Brand",
    "Material",
    "Dimensions",
    "Weight",
    "Rating",
    "Stock",
    "Warranty",
    "Colors",
    "Highlights"
  ];

  const getFeatureValue = (product: any, feature: string) => {
    switch (feature) {
      case "Price":
        return formatPrice.toRupiah(product.price);
      case "Sale Price":
        return product.salePrice ? formatPrice.toRupiah(product.salePrice) : "No sale";
      case "Category":
        return product.features?.category || "N/A";
      case "Brand":
        return product.features?.brand || "N/A";
      case "Material":
        return product.features?.specifications?.material || "N/A";
      case "Dimensions":
        return product.features?.specifications?.dimensions || "N/A";
      case "Weight":
        return product.features?.specifications?.weight || "N/A";
      case "Rating":
        return product.features?.rating ? `${product.features.rating} ★ (${product.features.reviewCount} reviews)` : "N/A";
      case "Stock":
        return product.features?.specifications?.inStock 
          ? `In Stock (${product.features.specifications.stockCount || 0} units)` 
          : "Out of stock";
      case "Warranty":
        return product.features?.specifications?.warranty || "N/A";
      case "Colors":
        return product.features?.specifications?.color?.join(", ") || "N/A";
      case "Highlights":
        return product.features?.highlights?.join(", ") || "N/A";
      default:
        return "N/A";
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl ${isFullPage ? 'w-full' : 'w-full max-w-[1000px]'}`}>
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Compare Products</h2>
          <p className="text-gray-600">Compare features and specifications of up to 4 products</p>
        </div>
        <div className="flex items-center gap-4">
          {compareItems.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {compareItems.length === 0 ? (
        <div className="p-8 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image
              src="/empty-compare.png"
              alt="Empty comparison"
              width={48}
              height={48}
              className="opacity-50"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">No products to compare</h3>
          <p className="text-gray-500 mb-6">Browse our collection and add products to compare their features</p>
          <Link
            href="/shop"
            className="inline-flex items-center px-6 py-3 bg-[#B88E2F] text-white rounded-lg hover:bg-[#9A7B2C] transition-colors gap-2"
          >
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="p-6 overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 rounded-tl-lg w-48 sticky left-0 z-10">Features</th>
                {compareItems.map((product) => (
                  <th key={product.id} className="p-3 bg-gray-50">
                    <div className="relative group">
                      <button
                        onClick={() => removeFromCompare(product)}
                        className="absolute -top-2 -right-2 p-1.5 bg-white text-red-600 rounded-full 
                          hover:bg-red-50 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <Link href={`/shop/${product.id}`} className="block group">
                        <div className="relative w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <h3 className="font-medium text-center mb-2 group-hover:text-[#B88E2F] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.salePrice || product.price,
                              image: product.image,
                              quantity: 1
                            });
                          }}
                          className="px-4 py-2 bg-[#B88E2F] text-white rounded-lg hover:bg-[#9A7B2C] 
                            transition-colors flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => {
                            const url = `${window.location.origin}/shop/${product.id}`;
                            navigator.clipboard.writeText(url);
                            alert('Product link copied to clipboard!');
                          }}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 
                            transition-colors"
                          title="Share Product"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
                {compareItems.length < 4 && (
                  <th className="p-3 bg-gray-50 rounded-tr-lg">
                    <Link
                      href="/shop"
                      className="flex flex-col items-center justify-center w-full h-[280px] border-2 
                        border-dashed border-gray-300 rounded-lg hover:border-[#B88E2F] hover:bg-[#B88E2F]/5 
                        transition-colors group"
                    >
                      <Plus className="w-8 h-8 text-gray-400 group-hover:text-[#B88E2F] transition-colors" />
                      <span className="mt-2 text-gray-600 group-hover:text-[#B88E2F] transition-colors">
                        Add Product
                      </span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={feature} className={index % 2 === 0 ? 'bg-gray-50/50' : ''}>
                  <td className="p-4 font-medium text-gray-700 sticky left-0 z-10 bg-white">{feature}</td>
                  {compareItems.map((product) => (
                    <td key={`${product.id}-${feature}`} className="p-4">
                      {feature === "Highlights" ? (
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {product.features?.highlights?.map((highlight, idx) => (
                            <li key={idx}>{highlight}</li>
                          ))}
                        </ul>
                      ) : feature === "Colors" ? (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {product.features?.specifications?.color?.map((color) => (
                            <div
                              key={color}
                              className="w-6 h-6 rounded-full border border-gray-200 shadow-sm"
                              style={{ backgroundColor: color.toLowerCase() }}
                              title={color}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-600">
                          {getFeatureValue(product, feature)}
                        </div>
                      )}
                    </td>
                  ))}
                  {compareItems.length < 4 && <td className="p-4" />}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}