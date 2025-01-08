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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Image with Zoom Controls */}
          <div
            ref={imageContainerRef}
            className="relative w-full h-96 overflow-hidden rounded-lg mb-4"
            onMouseEnter={() => setLensVisible(true)}
            onMouseLeave={() => setLensVisible(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Zoom Lens */}
            {lensVisible && (
              <div
                className="absolute w-[150px] h-[150px] bg-white rounded-full border-2 border-gray-300 pointer-events-none overflow-hidden"
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
            <div className="absolute bottom-2 right-2 flex gap-2 bg-white/80 p-1 rounded-lg shadow">
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Price and Quantity */}
          <div className="flex items-center justify-between mb-4">
            <div>
              {product.salePrice && product.salePrice < product.price ? (
                <>
                  <span className="text-red-600 font-bold text-xl">
                    {formatPrice.toRupiah(product.salePrice)}
                  </span>
                  <span className="text-gray-400 text-sm line-through ml-2">
                    {formatPrice.toRupiah(product.price)}
                  </span>
                </>
              ) : (
                <span className="font-bold text-xl">
                  {formatPrice.toRupiah(product.price)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#B88E2F] text-white py-2 rounded-lg hover:bg-[#9A7B2C] transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}