"use client";
import { Heart, Share2, Scale, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWishlist } from "../../context/WishlistContext"; // Corrected import path
import { useCompare } from "../../context/CompareContext"; // Corrected import path
import QuickView from "./QuickView";
import { formatPrice } from "../../utils/formatPrice"; // Corrected import path
import Image from "next/image";
import { Product } from "../../types/product"; // Corrected import path

// Define a new interface for ProductCard
interface ProductCardProps extends Product {
  viewMode?: 'grid' | 'list';
}

const actionButtonClasses = `
  inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
  transition-all duration-300 transform hover:scale-105
  hover:shadow-lg active:scale-95 backdrop-blur-sm
`;

export default function ProductCard({
  id,
  name,
  description,
  image,
  price,
  salePrice,
  salePercentage,
  viewMode = 'grid'
}: ProductCardProps) {
  const router = useRouter();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { items, addToCompare, removeFromCompare } = useCompare();
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const product: Product = {
    id,
    name,
    description,
    image,
    price,
    salePrice,
    salePercentage,
    images: [],
    features: {
      highlights: [],
      specifications: {
        dimensions: '',
        weight: '',
        material: '',
        color: [],
        warranty: '',
        inStock: false
      },
      rating: 0,
      reviewCount: 0,
      category: '',
      tags: [],
      brand: '',
      sku: '',
      manufacturingDate: ''
    },
    isNew: false,
    isBestSeller: false,
    shippingInfo: { freeShipping: false, estimatedDays: 0, shippingCost: 0 }
  };

  const handleCardClick = () => {
    router.push(`/shop/${id}`);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: name,
          text: description,
          url: window.location.href + '/' + id
        });
      } else {
        await navigator.clipboard.writeText(window.location.href + '/' + id);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleCompare = (product: Product) => {
    if (items.some(item => item.id === id)) {
      removeFromCompare(product);
    } else {
      addToCompare(product);
    }
  };

  return (
    <>
      <div
        className={`
          relative group bg-white rounded-2xl overflow-hidden
          transition-all duration-500 ease-out transform hover:-translate-y-1
          hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100
          ${viewMode === 'grid' ? '' : 'flex gap-6'}
          backdrop-blur-sm cursor-pointer
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'w-full' : 'w-1/3'}`}>
          <div className="relative w-full h-64 transform transition-transform duration-700 group-hover:scale-105">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-t-2xl transition-all duration-700 group-hover:filter group-hover:brightness-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Sale Badge */}
          {salePercentage && (
            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white 
                px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                {salePercentage}% OFF
              </span>
            </div>
          )}

          {/* Quick View Button */}
          {isHovered && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickView(true);
              }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 transform
                bg-white/90 text-gray-800 px-4 py-2 rounded-full
                flex items-center gap-2 transition-all duration-300
                hover:bg-black hover:text-white hover:scale-105
                shadow-lg backdrop-blur-sm"
            >
              <Eye size={14} />
              <span className="text-sm font-medium">Quick View</span>
            </button>
          )}
        </div>

        <div className={`p-4 ${viewMode === 'grid' ? '' : 'flex-1'}`}>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h5 className="text-lg font-bold text-gray-800 group-hover:text-[#B88E2F] transition-colors duration-300">
                {name}
              </h5>
              <p className="text-sm text-gray-500 line-clamp-2 group-hover:text-gray-600 transition-colors duration-300">
                {description}
              </p>
            </div>
            <div className="text-right">
              {salePrice ? (
                <>
                  <span className="text-lg font-bold text-red-600">
                    {formatPrice.toRupiah(salePrice)}
                  </span>
                  <br />
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice.toRupiah(price)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-[#B88E2F]">
                  {formatPrice.toRupiah(price)}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isHovered && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickView(true);
                }}
                className={`${actionButtonClasses}
                  bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white`}
              >
                <Eye size={12} strokeWidth={2.5} />
                <span className="hidden sm:inline">Quick</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCompare(product);
                }}
                className={`${actionButtonClasses}
                  ${items.some(item => item.id === id) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
              >
                <Scale size={12} strokeWidth={2.5} />
                <span className="hidden sm:inline">Compare</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className={`${actionButtonClasses}
                  ${isInWishlist(id) 
                    ? 'bg-red-600 text-white scale-105' 
                    : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`}
              >
                <Heart 
                  size={12} 
                  strokeWidth={2.5}
                  className={`transition-transform duration-300 ${isInWishlist(id) ? 'fill-current scale-110' : ''}`} 
                />
                <span className="hidden sm:inline">Save</span>
              </button>

              <button
                onClick={handleShare}
                className={`${actionButtonClasses}
                  bg-green-50 text-green-600 hover:bg-green-600 hover:text-white`}
              >
                <Share2 size={12} strokeWidth={2.5} />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          )}a
        </div>
      </div>

      {showQuickView && (
        <QuickView 
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
}