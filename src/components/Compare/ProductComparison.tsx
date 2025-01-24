"use client";

import { X, Plus, Share2, ShoppingCart, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";

interface ProductComparisonProps {
  isFullPage?: boolean;
}

export default function ProductComparison({ isFullPage = false }: ProductComparisonProps) {
  const { items: compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

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
    "Highlights",
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
        return product.features?.rating
          ? `${product.features.rating} ★ (${product.features.reviewCount} reviews)`
          : "N/A";
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
    <div
      className={`rounded-2xl shadow-xl overflow-hidden ${
        isFullPage ? "w-full" : "w-full max-w-[1000px]"
      } bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-glow">
        <div>
          <h2 className="text-3xl font-bold text-neon">Compare Products</h2>
          <p className="text-gray-400">Compare features and specifications of up to 4 products</p>
        </div>
        <div className="flex items-center gap-4">
          {compareItems.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-red-500 hover:text-red-600 font-medium transition-all"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {compareItems.length === 0 ? (
        <div className="p-8 text-center">
          <div className="w-24 h-24 bg-glow rounded-full flex items-center justify-center mx-auto mb-4">
            <Image
              src="/empty-compare.png"
              alt="Empty comparison"
              width={48}
              height={48}
              className="opacity-50"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-neon">No products to compare</h3>
          <p className="text-gray-400 mb-6">
            Browse our collection and add products to compare their features
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-6 py-3 bg-neon hover:bg-neon-dark rounded-lg gap-2 transition-all"
          >
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="p-6 overflow-x-auto">
          <table className="w-full min-w-[800px] table-fixed">
            <thead>
              <tr>
                <th className="p-3 text-left bg-glow rounded-tl-lg sticky left-0 z-10">Features</th>
                {compareItems.map((product) => (
                  <th key={product.id} className="p-3 bg-glow">
                    <div className="relative group">
                      <button
                        onClick={() => removeFromCompare(product)}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <Link href={`/shop/${product.id}`} className="block">
                        <div className="relative w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden shadow-neon">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <h3 className="font-medium text-center mb-2 text-neon transition-all">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.salePrice || product.price,
                              image: product.image,
                              quantity: 1,
                            })
                          }
                          className="px-4 py-2 bg-neon hover:bg-neon-dark rounded-lg transition-all flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => {
                            const url = `${window.location.origin}/shop/${product.id}`;
                            navigator.clipboard.writeText(url);
                            alert("Product link copied to clipboard!");
                          }}
                          className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature} className="odd:bg-[#1E293B]">
                  <td className="p-4 text-neon">{feature}</td>
                  {compareItems.map((product) => (
                    <td key={`${product.id}-${feature}`} className="p-4">
                      {getFeatureValue(product, feature)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
