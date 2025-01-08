// src/components/ProductDetails.tsx
"use client";

import React, { useState } from "react";
import { Heart, ShoppingCart, Scale, Star, Share2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { formatPrice } from "@/utils/formatPrice";
import { ProductDetailsProps } from "@/types/product";

const ProductDetails: React.FC<ProductDetailsProps> = ({
  id,
  name,
  description,
  price,
  salePrice,
  salePercentage,
  imageUrl,
  images,
  features,
  colors,
  ratings,
  isNew,
  isBestSeller,
  shippingInfo,
  availableSizes,
  availableColors
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { items: compareItems, addToCompare, removeFromCompare } = useCompare();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(imageUrl);

  const isInCompare = compareItems.some(item => item.id === id);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price: salePrice || price,
      image: imageUrl,
      quantity: quantity,
      color: selectedColor,
      features: features,
      description: description
    });
  };

  const product = {
    id,
    name,
    description,
    image: imageUrl,
    images,
    price,
    salePrice,
    salePercentage,
    features,
    isNew,
    isBestSeller,
    availableSizes,
    availableColors,
    shippingInfo
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="md:w-1/2 space-y-4">
          <div className="relative group">
            <img
              src={selectedImage}
              alt={name}
              className="w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
            />
            {salePercentage && (
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white 
                  px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                  {salePercentage}% OFF
                </span>
              </div>
            )}
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Thumbnail Images */}
          {images && images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 
                    ${selectedImage === img ? 'border-blue-500' : 'border-transparent'}`}
                >
                  <img
                    src={img}
                    alt={`${name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Home</span>
              <span>/</span>
              <span>{features.category}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800">{name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < ratings
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">({features.reviewCount} reviews)</span>
              </div>
              <span className="text-green-600">
                {features.specifications.inStock ? 
                  `In Stock (${features.specifications.stockCount} available)` : 
                  'Out of Stock'}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{description}</p>

          <div className="border-t border-b py-4">
            <div className="flex items-center justify-between">
              <div>
                {salePrice ? (
                  <div className="space-y-1">
                    <span className="text-3xl font-bold text-red-600">
                      {formatPrice.toRupiah(salePrice)}
                    </span>
                    <br />
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice.toRupiah(price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice.toRupiah(price)}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2 rounded-full ${
                    isInWishlist(id)
                      ? "bg-red-50 text-red-500"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isInWishlist(id) ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  onClick={() => isInCompare ? removeFromCompare(product) : addToCompare(product)}
                  className={`p-2 rounded-full ${
                    isInCompare
                      ? "bg-blue-50 text-blue-500"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Scale className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Specifications</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Dimensions:</span>
                <span className="font-medium">{features.specifications.dimensions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{features.specifications.weight}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Material:</span>
                <span className="font-medium">{features.specifications.material}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Warranty:</span>
                <span className="font-medium">{features.specifications.warranty}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Select Color</h3>
            <div className="flex mt-2 space-x-3">
              {features.specifications.color.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color
                      ? "border-black scale-110"
                      : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Quantity</h3>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  className="px-4 py-2 text-lg font-medium hover:bg-gray-100 rounded-l-lg transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 1 && val <= (features.specifications.stockCount || 99)) {
                      setQuantity(val);
                    }
                  }}
                  className="w-16 text-center py-2 border-x focus:outline-none"
                  min="1"
                  max={features.specifications.stockCount || 99}
                />
                <button
                  onClick={() => setQuantity((q) => 
                    Math.min(q + 1, features.specifications.stockCount || 99)
                  )}
                  className="px-4 py-2 text-lg font-medium hover:bg-gray-100 rounded-r-lg transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-[#B88E2F] text-white px-8 py-3 rounded-lg hover:bg-[#A07B2A] transition-colors"
              disabled={!features.specifications.inStock}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;