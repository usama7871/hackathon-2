"use client";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useRef } from "react";
import { formatPrice } from "@/utils/formatPrice";

interface QuickViewProps {
  product: {
    id: string;
    name: string;
    price: number;
    salePrice?: number;
    salePercentage?: number;
    image: string;
    description: string;
  };
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(2); // Default zoom level
  const [lensVisible, setLensVisible] = useState(false); // Track if the lens is visible
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 }); // Lens position
  const [lensBackgroundPosition, setLensBackgroundPosition] = useState({ x: 0, y: 0 }); // Background position for the lens
  const imageContainerRef = useRef<HTMLDivElement>(null); // Reference to the image container

  const handleAddToCart = () => {
    const finalPrice = product.salePrice || product.price;
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image,
      quantity: quantity,
    });
    onClose();
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 10)); // Limit zoom to 3x
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1)); // Limit zoom to 1x
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left; // Mouse position relative to the image container
    const y = e.clientY - top;

    // Calculate lens position (centered around the cursor)
    setLensPosition({ x: x - 75, y: y - 75 }); // Adjust for lens size (150x150)

    // Calculate background position for the lens
    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;
    setLensBackgroundPosition({ x: bgX, y: bgY });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 rounded-lg shadow-2xl overflow-hidden w-full max-w-2xl relative border border-gray-600">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-600 bg-gradient-to-r from-indigo-700 to-blue-800 shadow-lg">
          <h2 className="text-xl font-semibold text-white tracking-wider">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/60 rounded-full transition-all text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image with Zoom Controls */}
          <div
            ref={imageContainerRef}
            className="relative w-full h-96 overflow-hidden rounded-lg mb-4 border border-gray-600 bg-gray-900"
            onMouseEnter={() => setLensVisible(true)}
            onMouseLeave={() => setLensVisible(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            {/* Zoom Lens */}
            {lensVisible && (
              <div
                className="absolute w-[150px] h-[150px] bg-gray-700/80 rounded-full border-2 border-gray-500 pointer-events-none overflow-hidden shadow-lg"
                style={{
                  left: `${lensPosition.x}px`,
                  top: `${lensPosition.y}px`,
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: `${zoomLevel * 100}%`,
                  backgroundPosition: `${lensBackgroundPosition.x}% ${lensBackgroundPosition.y}%`,
                }}
              />
            )}
            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex gap-3 bg-gray-800/80 p-2 rounded-lg shadow-md">
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-700/60 rounded-full transition-colors text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-700/60 rounded-full transition-colors text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6 leading-relaxed text-opacity-80">
            {product.description}
          </p>

          {/* Price and Quantity */}
          <div className="flex items-center justify-between mb-6">
            <div>
              {product.salePrice && product.salePrice < product.price ? (
                <>
                  <span className="text-green-400 font-bold text-xl">
                    {formatPrice.toRupiah(product.salePrice)}
                  </span>
                  <span className="text-gray-500 text-sm line-through ml-2">
                    {formatPrice.toRupiah(product.price)}
                  </span>
                </>
              ) : (
                <span className="font-bold text-xl text-white">
                  {formatPrice.toRupiah(product.price)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border border-gray-600 text-white rounded-lg hover:bg-gray-700/60 transition-colors"
              >
                -
              </button>
              <span className="w-10 text-center text-white font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 border border-gray-600 text-white rounded-lg hover:bg-gray-700/60 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-700 shadow-md hover:shadow-xl transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
